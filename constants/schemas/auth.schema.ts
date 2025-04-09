import { z } from 'zod';

import { Role } from '../enums';

export const RegexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const RegexPhone = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;

export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ').nonempty('Vui lòng nhập email'),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự').nonempty('Vui lòng nhập mật khẩu'),
});

export const registerSchema = z.object({
  name: z.string().min(3, 'Tên phải có ít nhất 3 ký tự').nonempty('Vui lòng nhập tên'),
  email: z.string().email('Email không hợp lệ').nonempty('Vui lòng nhập email'),
  password: z
    .string()
    .regex(RegexPassword, {
      message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt',
    })
    .nonempty('Vui lòng nhập mật khẩu'),
  otp: z.string().min(6, 'OTP phải có ít nhất 6 ký tự').nonempty('Vui lòng nhập OTP'),
  address: z.string().min(5, 'Địa chỉ phải có ít nhất 5 ký tự').nonempty('Vui lòng nhập địa chỉ'),
  dateOfBirth: z.coerce.date().refine(
    (date) => {
      const today = new Date();
      const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return date < eighteenYearsAgo;
    },
    {
      message: 'Hãy đảm bảo bạn đã đủ 18 tuổi',
    }
  ),
  phone: z
    .string()
    .regex(RegexPhone, 'Số điện thoại không hợp lệ')
    .nonempty('Vui lòng nhập số điện thoại'),
  roleName: z.enum([Role.Driver, Role.Owner]),
});

export const forgetPasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ').nonempty('Vui lòng nhập email'),
  otp: z.string().min(6, 'OTP phải có ít nhất 6 ký tự').nonempty('Vui lòng nhập OTP'),
  newPassword: z
    .string()
    .regex(RegexPassword, {
      message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt',
    })
    .nonempty('Vui lòng nhập mật khẩu'),
});

export type LoginPayload = z.infer<typeof loginSchema>;
export type RegisterPayload = z.infer<typeof registerSchema>;
export type ForgetPasswordPayload = z.infer<typeof forgetPasswordSchema>;

export type AuthPayloads = LoginPayload & Partial<RegisterPayload>;
