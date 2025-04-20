import { z } from 'zod';

const regexAccountNumber = /^[0-9]{10,16}$/;
const regexUpperCaseNoAccent = /^[A-Z\s]+$/;

export const BankSchema = z.object({
  bankInfoId: z.string().nonempty({ message: 'Vui lòng chọn ngân hàng' }),
  accountNumber: z
    .string()
    .nonempty({ message: 'Vui lòng nhập số tài khoản' })
    .regex(regexAccountNumber, { message: 'Số tài khoản không hợp lệ' }),
  accountName: z
    .string()
    .nonempty({ message: 'Vui lòng nhập tên tài khoản' })
    .max(40, { message: 'Tên tài khoản không được quá 40 ký tự' })
    .regex(regexUpperCaseNoAccent, { message: 'Tên tài khoản chỉ được chứa chữ in hoa không dấu' }),
  isPrimary: z.boolean(),
});

export type BankSchemaPayload = z.infer<typeof BankSchema>;
