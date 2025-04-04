import { z } from 'zod';

export const withdrawalSchema = z.object({
  amount: z.number().min(1, { message: 'Yêu cầu nhập số tiền' }),
  bankAccountId: z.string().uuid({ message: 'Yêu cầu chọn tài khoản ngân hàng' }),
});

export type WithdrawalSchema = z.infer<typeof withdrawalSchema>;
