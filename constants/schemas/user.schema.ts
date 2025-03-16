import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(3, 'Tên phải có ít nhất 3 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  address: z.string().min(5, 'Địa chỉ phải có ít nhất 5 ký tự'),
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
    .regex(
      /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/,
      'Số điện thoại không hợp lệ'
    ),
});

export const passwordSchema = z
  .object({
    oldPassword: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    newPassword: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    confirmPassword: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });

export type UserPayloadSchema = z.infer<typeof userSchema>;
export type PasswordPayloadSchema = z.infer<typeof passwordSchema>;
