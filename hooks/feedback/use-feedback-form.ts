import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useFeedbackCreate } from './use-feedback';

import { feedbackSchema, FeedbackSchema } from '~/constants/schemas/feedback.schema';

export const useFeedbackForm = (id: string) => {
  const { createFeedback } = useFeedbackCreate();
  const form = useForm<FeedbackSchema>({ resolver: zodResolver(feedbackSchema) });

  const onSubmit = form.handleSubmit((data) => {
    createFeedback.mutate({ id, data });
  });

  return {
    form,
    onSubmit,
    isLoading: createFeedback.isPending,
  };
};
