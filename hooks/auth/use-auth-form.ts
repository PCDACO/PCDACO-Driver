import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
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
import { useAuthStore } from '~/store/auth-store';
import { useApiStore } from '~/store/check-api';

type UseAuthFormProps = {
  type: 'login' | 'register';
};

export const useAuthForm = ({ type }: UseAuthFormProps) => {
  const { loginMutation, registerMutation } = useAuth();
  const { removeEndpoint } = useApiStore();
  const { setTokens } = useAuthStore();
  const {
    form: licenseForm,
    onSubmit: onSubmitLicense,
    isLoading: isLoadingLicense,
  } = useLicenseForm();

  const [step, setStep] = React.useState(1);

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
            roleName: Role.Owner,
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

  const prevStep = () => setStep((prev) => prev - 1);
  const nextStep = () => setStep((prev) => prev + 1);

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
        loginMutation.mutate(data as LoginPayload);
        break;
      case 'register':
        registerMutation.mutate(data as RegisterPayload, {
          onSuccess: async (data) => {
            removeEndpoint('register');
            await setTokens(data.value.accessToken, data.value.refreshToken);

            // state true
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
    isLoading: loginMutation.isPending || (registerMutation.isPending && isLoadingLicense),
    step,
    nextStep,
    prevStep,
    checkConditionOfEachStep,
  };
};
