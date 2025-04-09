import { useMutation } from '@tanstack/react-query';

import {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  SendOtpRequest,
  VerifyOtpRequest,
} from '~/constants/models/auth.model';
import { QueryKey } from '~/lib/query-key';
import { AuthService } from '~/services/auth.service';

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationKey: [QueryKey.Auth.Login],
    mutationFn: async (payload: LoginRequest) => await AuthService.login(payload),
  });

  const registerMutation = useMutation({
    mutationKey: [QueryKey.Auth.Register],
    mutationFn: async (payload: RegisterRequest) => await AuthService.register(payload),
  });

  const refreshTokenMutation = useMutation({
    mutationKey: [QueryKey.Auth.Refresh],
    mutationFn: async (refrechToken: string) => await AuthService.refreshToken(refrechToken),
  });

  const validateTokenMutation = useMutation({
    mutationKey: [QueryKey.Auth.Validate],
    mutationFn: async () => await AuthService.validationToken(),
  });

  const sendOtpMutation = useMutation({
    mutationKey: [QueryKey.Auth.SendOtp],
    mutationFn: async (payload: SendOtpRequest) => await AuthService.sendOtp(payload),
  });

  const verifyOtpMutation = useMutation({
    mutationKey: [QueryKey.Auth.VerifyOtp],
    mutationFn: async (payload: VerifyOtpRequest) => await AuthService.verifyOtp(payload),
  });

  const resetPasswordMutation = useMutation({
    mutationKey: [QueryKey.Auth.ResetPassword],
    mutationFn: async (payload: ResetPasswordRequest) => await AuthService.resetPassword(payload),
  });

  const forgetPasswordMutation = useMutation({
    mutationKey: [QueryKey.Auth.ForgetPassword],
    mutationFn: async (payload: ResetPasswordRequest) => await AuthService.resetPassword(payload),
  });

  return {
    loginMutation,
    registerMutation,
    refreshTokenMutation,
    validateTokenMutation,
    sendOtpMutation,
    verifyOtpMutation,
    resetPasswordMutation,
    forgetPasswordMutation,
  };
};
