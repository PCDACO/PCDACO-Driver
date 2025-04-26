import { z } from 'zod';

export const bookSchema = z
  .object({
    // carId: z.string().min(1, 'Vui lòng chọn xe').optional(),
    startDay: z.coerce.date().refine(
      (date: Date) => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return date >= now;
      },
      { message: 'Ngày bắt đầu phải từ hôm nay trở đi' }
    ),
    endDay: z.coerce.date(),
    startTime: z.date({ required_error: 'Yêu cầu chọn giờ bắt đầu' }).refine(
      (date) => {
        const hour = date.getHours();
        return hour >= 6 && hour <= 22;
      },
      { message: 'Thời gian bắt đầu phải trong khoảng 06:00 - 22:00' }
    ),
    endTime: z.date({ required_error: 'Yêu cầu chọn giờ kết thúc' }).refine(
      (date) => {
        const hour = date.getHours();
        return hour >= 6 && hour <= 22;
      },
      { message: 'Thời gian kết thúc phải trong khoảng 06:00 - 22:00' }
    ),
  })
  .superRefine((data, ctx) => {
    if (data.endDay <= data.startDay) {
      ctx.addIssue({
        path: ['endDay'],
        message: 'Ngày kết thúc phải sau ngày bắt đầu',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type BookPayloadSchema = z.infer<typeof bookSchema>;
