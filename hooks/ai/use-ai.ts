import { useMutation } from '@tanstack/react-query';

import { QueryKey } from '~/lib/query-key';
import { AiService } from '~/services/ai.service';

export const useAiMutation = () => {
  const aiMutation = useMutation({
    mutationKey: [QueryKey.AI.LicensePlate],
    mutationFn: (image: File) => AiService.post.licensePlate(image),
  });

  return aiMutation;
};
