import { z } from 'zod';

// const MIN_BOOKING_DURATION_HOURS = 1;
// const MAX_BOOKING_DURATION_DAYS = 30;

export const bookSchema = z.object({
  carId: z.string().min(1, 'Vui lòng chọn xe'),
  startTime: z.coerce.date().refine(
    (date: Date) => {
      const now = new Date();
      return date > now;
    },
    { message: 'Yêu cầu chọn thời gian bắt đầu' }
  ),
  endTime: z.coerce.date().refine(
    (date: Date) => {
      const now = new Date();
      return date > now;
    },
    {
      message: 'Thời gian kết thúc phải trong tương lai',
    }
  ),
});

export type BookPayloadSchema = z.infer<typeof bookSchema>;
