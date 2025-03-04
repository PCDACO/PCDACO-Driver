import { z } from 'zod';

import { Role } from '../enums';

export const loginSchema = z.object({
  phone: z
    .string()
    .regex(
      /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/,
      'Số điện thoại không hợp lệ'
    ),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  address: z.string().min(5, 'Địa chỉ phải có ít nhất 5 ký tự'),
  dateOfBirth: z.coerce.date().refine((date) => date < new Date(), {
    message: 'Ngày sinh phải nhỏ hơn ngày hiện tại',
  }),
  phone: z
    .string()
    .regex(
      /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/,
      'Số điện thoại không hợp lệ'
    ),
  roleName: z.enum([Role.Driver, Role.Owner]),
});

export type LoginPayload = z.infer<typeof loginSchema>;
export type RegisterPayload = z.infer<typeof registerSchema>;

export type AuthPayloads = LoginPayload & Partial<RegisterPayload>;
