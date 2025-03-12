import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useLicenseForm } from '../license/use-license-form';

import { Role } from '~/constants/enums';
import {
  AuthPayloads,
  LoginPayload,
  RegisterPayload,
  loginSchema,
  registerSchema,
} from '~/constants/schemas/auth.schema';
import { useAuth } from '~/hooks/auth/use-auth';
import { UserService } from '~/services/user.service';
import { useAuthStore } from '~/store/auth-store';
import { useApiStore } from '~/store/check-api';
import { useStepStore } from '~/store/use-step';

type UseAuthFormProps = {
  type: 'login' | 'register';
};

export const useAuthForm = ({ type }: UseAuthFormProps) => {
  const { loginMutation, registerMutation } = useAuth();

  const { removeEndpoint } = useApiStore();
  const { setTokens, removeTokens } = useAuthStore();
  const {
    form: licenseForm,
    onSubmit: onSubmitLicense,
    isLoading: isLoadingLicense,
  } = useLicenseForm();

  const { nextStep } = useStepStore();

  const form = useForm<AuthPayloads>({
    resolver: zodResolver(type === 'login' ? loginSchema : registerSchema),
    defaultValues:
      type === 'login'
        ? { phone: '', password: '' }
        : {
            name: '',
            email: '',
            password: '',
            address: '',
            dateOfBirth: new Date(),
            phone: '',
            roleName: Role.Driver,
          },
  });

  const validField = async (isValidPromise: Promise<boolean>) => {
    const isValid = await isValidPromise;
    if (isValid) {
      return true;
    } else {
      ToastAndroid.show('Vui lòng điền đúng thông tin', ToastAndroid.SHORT);
      return false;
    }
  };

  const checkConditionOfEachStep = async (step: number) => {
    switch (step) {
      case 1: {
        const isValidate = await validField(form.trigger(['phone', 'password']));
        if (isValidate) {
          nextStep();
        }
        return isValidate;
      }
      case 2: {
        const isValidate = await validField(
          form.trigger(['name', 'email', 'address', 'dateOfBirth'])
        );
        if (isValidate) {
          nextStep();
        }
        return isValidate;
      }
      case 3: {
        const isValidate = await validField(
          licenseForm.trigger(['licenseNumber', 'expirationDate'])
        );
        if (isValidate) {
          nextStep();
        }
        return isValidate;
      }
      case 4: {
        const isValidate = await validField(
          licenseForm.trigger(['licenseImageFront', 'licenseImageBack'])
        );
        return isValidate;
      }
      default:
        return false;
    }
  };

  const onSubmit = form.handleSubmit(async (data) => {
    switch (type) {
      case 'login':
        loginMutation.mutate(data as LoginPayload, {
          onSuccess: async (data) => {
            setTokens(data.value.accessToken, data.value.refreshToken);

            const token = jwtDecode(data.value.accessToken);

            if (token.sub && token.sub !== undefined) {
              await UserService.get
                .detail(token.sub)
                .then((response) => {
                  if (response?.value.role === Role.Driver) {
                    ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);

                    router.push('/(main)');
                    form.reset();
                  } else {
                    ToastAndroid.show('Đây không là tài khoản tài xế', ToastAndroid.SHORT);
                    removeTokens();
                  }
                })
                .catch(() => {
                  ToastAndroid.show('Đây không là tài xế', ToastAndroid.SHORT);
                  removeTokens();
                });
            }
          },
          onError: (error: any) => {
            ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
          },
        });
        break;
      case 'register':
        registerMutation.mutate(data as RegisterPayload, {
          onSuccess: async (data) => {
            // check if register success, remove register endpoint in store
            removeEndpoint('register');

            await setTokens(data.value.accessToken, data.value.refreshToken);
            await onSubmitLicense();

            ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT);
          },
          onError: (error: any) => {
            ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
          },
        });
        break;
      default:
        break;
    }
  });

  return {
    form,
    licenseForm,
    onSubmit,
    onSubmitLicense,
    isLoading: loginMutation.isPending || registerMutation.isPending || isLoadingLicense,
    // currentUserQuery.isLoading,
    checkConditionOfEachStep,
  };
};
