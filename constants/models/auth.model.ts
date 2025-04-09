import { Role } from '../enums';

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  address: string;
  dateOfBirth: Date;
  phone: string;
  roleName: Role;
};

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type PayloadAuth = RegisterRequest | LoginRequest;

export type SendOtpRequest = {
  email: string;
  isResetPassword?: boolean;
};

export type VerifyOtpRequest = {
  email: string;
  otp: string;
  isResetPassword?: boolean;
};

export type ResetPasswordRequest = {
  newPassword: string;
};
