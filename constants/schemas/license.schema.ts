import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const licenseSchema = z.object({
  licenseNumber: z
    .string()
    .regex(/^\d{12}$/, 'Số giấy phép phải là 12 chữ số')
    .nonempty('Số giấy phép không được để trống')
    .max(12, 'Số giấy phép không được quá 12 chữ số'),

  expirationDate: z.date().refine(
    (date) => {
      const today = new Date();
      const oneMonthLater = new Date(today.setMonth(today.getMonth() + 1));

      return date > oneMonthLater;
    },
    {
      message: 'Ngày hết hạn phải lớn hơn 1 tháng so với hiện tại',
    }
  ),
  licenseImageFront: z
    .any()
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.type))
    .optional(),

  licenseImageBack: z
    .any()
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      'Chỉ nhận ảnh định dạng jpg, jpeg, png, webp'
    )
    .optional(),
});

export type LicensePayloadSchema = z.infer<typeof licenseSchema>;
