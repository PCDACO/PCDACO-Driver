import { z } from 'zod';

export const bookSchema = z
  .object({
    carId: z.string().min(1, 'Vui lòng chọn xe'),
    startDay: z.coerce.date().refine(
      (date: Date) => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return date >= now;
      },
      { message: 'Ngày bắt đầu phải từ hôm nay trở đi' }
    ),
    endDay: z.coerce.date(),
    startTime: z.coerce
      .date()
      .refine(
        (date: Date) => {
          const now = new Date();
          return date > now;
        },
        { message: 'Yêu cầu chọn giờ bắt đầu' }
      )
      .refine(
        (date: Date) => {
          const hour = date.getHours();
          return hour >= 7 && hour <= 22;
        },
        { message: 'Thời gian bắt đầu phải trong khoảng 07:00 - 22:00' }
      ),
    endTime: z.coerce
      .date()
      .refine(
        (date: Date) => {
          const now = new Date();
          return date > now;
        },
        { message: 'Yêu cầu chọn giờ kết thúc' }
      )
      .refine(
        (date: Date) => {
          const hour = date.getHours();
          return hour >= 7 && hour <= 22;
        },
        { message: 'Thời gian kết thúc phải trong khoảng 07:00 - 22:00' }
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

    // if (data.endTime <= data.startTime) {
    //   ctx.addIssue({
    //     path: ['endTime'],
    //     message: 'Thời gian kết thúc phải sau thời gian bắt đầu',
    //     code: z.ZodIssueCode.custom,
    //   });
    // }
  });

export type BookPayloadSchema = z.infer<typeof bookSchema>;
