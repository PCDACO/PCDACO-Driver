import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

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
import { useStepStore } from '~/store/use-step';

type UseAuthFormProps = {
  type: 'login' | 'register';
};

export const useAuthForm = ({ type }: UseAuthFormProps) => {
  const { loginMutation, registerMutation, sendOtpMutation, verifyOtpMutation } = useAuth();

  const { setTokens, removeTokens, setIsAuthenticated } = useAuthStore();

  const { nextStep } = useStepStore();

  const form = useForm<AuthPayloads>({
    resolver: zodResolver(type === 'login' ? loginSchema : registerSchema),
    defaultValues:
      type === 'login'
        ? { email: '', password: '' }
        : {
            name: '',
            email: '',
            password: '',
            address: '',
            dateOfBirth: new Date(),
            phone: '',
            otp: '',
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
        const isValidate = await validField(form.trigger(['email', 'password']));
        if (isValidate) {
          sendOtpMutation.mutate(
            { email: form.getValues('email'), isResetPassword: false },
            {
              onSuccess: () => {
                ToastAndroid.show('Xin hãy kiểm tra email để nhận mã OTP', ToastAndroid.SHORT);
                setTimeout(() => {
                  nextStep();
                }, 1000);
              },
              onError: (error: any) => {
                ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
              },
            }
          );
        }
        return isValidate;
      }

      case 2: {
        const isValidate = await validField(form.trigger(['otp']));
        if (isValidate) {
          verifyOtpMutation.mutate(
            {
              email: form.getValues('email'),
              otp: form.getValues('otp') || '',
              isResetPassword: false,
            },
            {
              onSuccess: () => {
                ToastAndroid.show('OTP đã được xác thực', ToastAndroid.SHORT);
                setTimeout(() => {
                  nextStep();
                }, 1000);
              },
              onError: (error: any) => {
                ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
              },
            }
          );
        } else {
          ToastAndroid.show(form.formState.errors.otp?.message || '', ToastAndroid.SHORT);
        }
        return isValidate;
      }

      case 3: {
        const isValidate = await validField(
          form.trigger(['name', 'address', 'dateOfBirth', 'phone'])
        );
        if (isValidate) {
          onSubmit();
        }
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

                    setIsAuthenticated(true);
                    router.push('/(main)/home');
                    form.reset();
                  } else {
                    ToastAndroid.show('Đây không là tài khoản chủ xe', ToastAndroid.SHORT);
                    setIsAuthenticated(false);
                    removeTokens();
                  }
                })
                .catch(() => {
                  ToastAndroid.show('Đây không là tài xế', ToastAndroid.SHORT);
                  removeTokens();
                  setIsAuthenticated(false);
                });
            }
          },
          onError: (error: any) => {
            ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
          },
        });
        break;
      case 'register':
        registerMutation.mutate(data as RegisterPayload, {
          onSuccess: async (data) => {
            nextStep();
            await setTokens(data.value.accessToken, data.value.refreshToken);
            setIsAuthenticated(true);
            ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT);
          },
          onError: (error: any) => {
            setIsAuthenticated(false);
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
    onSubmit,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    checkConditionOfEachStep,
    isLoadingSendOtp: sendOtpMutation.isPending,
    isLoadingVerifyOtp: verifyOtpMutation.isPending,
  };
};
