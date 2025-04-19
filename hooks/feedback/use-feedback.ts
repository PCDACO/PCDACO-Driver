import { useMutation, useQuery } from '@tanstack/react-query';

import { FeedbackPayload } from '~/constants/models/feedback.model';
import { QueryKey } from '~/lib/query-key';
import { feedbackService } from '~/services/feedback.service';

export const useFeedback = (params?: Partial<RootRequest>) => {
  return useQuery({
    queryKey: [QueryKey.Feedback.List],
    queryFn: () => feedbackService.get.current(params),
    enabled: !!params,
  });
};

export const useFeedbackCreate = () => {
  const createFeedback = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FeedbackPayload }) =>
      feedbackService.post.feedback(id, data),
    mutationKey: [QueryKey.Feedback.Create],
  });

  return {
    createFeedback,
  };
};
