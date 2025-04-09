import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useAuth } from './use-auth';

import { ForgetPasswordPayload, forgetPasswordSchema } from '~/constants/schemas/auth.schema';
import { useAuthStore } from '~/store/auth-store';
import { useStepStore } from '~/store/use-step';

export const useForgetPasswordForm = () => {
  const { forgetPasswordMutation, verifyOtpMutation, sendOtpMutation } = useAuth();
  const { setTokens, removeTokens } = useAuthStore();
  const { nextStep } = useStepStore();

  const form = useForm<ForgetPasswordPayload>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: '',
      otp: '',
      newPassword: '',
    },
  });

  const validField = async (isValidPromise: Promise<boolean>) => {
    const isValid = await isValidPromise;
    if (isValid) {
      return true;
    }
    return false;
  };

  const checkConditionOfEachStep = async (step: number) => {
    switch (step) {
      case 1: {
        const isValid = await validField(form.trigger(['email']));
        if (isValid) {
          sendOtpMutation.mutate(
            { email: form.getValues('email'), isResetPassword: true },
            {
              onSuccess: () => {
                ToastAndroid.show('Gửi OTP thành công', ToastAndroid.SHORT);
                setTimeout(() => {
                  nextStep();
                }, 1000);
              },
              onError: (error: any) => {
                ToastAndroid.show(error.response?.data.message || '', ToastAndroid.SHORT);
              },
            }
          );
        } else {
          ToastAndroid.show(form.formState.errors.email?.message || '', ToastAndroid.SHORT);
        }
        return isValid;
      }
      case 2: {
        const isValid = await validField(form.trigger(['otp']));
        if (isValid) {
          verifyOtpMutation.mutate(
            { email: form.getValues('email'), otp: form.getValues('otp'), isResetPassword: true },
            {
              onSuccess: (data) => {
                setTokens(data.value.accessToken, data.value.refreshToken);
                ToastAndroid.show('Xác thực OTP thành công', ToastAndroid.SHORT);
                setTimeout(() => {
                  nextStep();
                }, 1000);
              },
              onError: (error: any) => {
                ToastAndroid.show(error.response?.data.message || '', ToastAndroid.SHORT);
              },
            }
          );
        } else {
          ToastAndroid.show(form.formState.errors.otp?.message || '', ToastAndroid.SHORT);
        }
        return isValid;
      }
      case 3: {
        const isValid = await validField(form.trigger(['newPassword']));
        if (isValid) {
          onSubmit();
        } else {
          ToastAndroid.show(form.formState.errors.newPassword?.message || '', ToastAndroid.SHORT);
        }
        return isValid;
      }
    }
  };

  const onSubmit = form.handleSubmit((data) => {
    forgetPasswordMutation.mutate(
      { newPassword: data.newPassword },
      {
        onSuccess: () => {
          ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.SHORT);
          removeTokens();
          setTimeout(() => {
            nextStep();
          }, 1000);
        },
        onError: (error: any) => {
          ToastAndroid.show(error.response?.data.message || '', ToastAndroid.SHORT);
        },
      }
    );
  });

  return {
    form,
    onSubmit,
    checkConditionOfEachStep,
    isLoading: forgetPasswordMutation.isPending,
    isLoadingSendOtp: sendOtpMutation.isPending,
    isLoadingVerifyOtp: verifyOtpMutation.isPending,
    isSuccess: forgetPasswordMutation.isSuccess,
    isError: forgetPasswordMutation.isError,
  };
};
