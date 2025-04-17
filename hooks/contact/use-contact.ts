import { useQuery } from '@tanstack/react-query';

import { ContactParams } from '~/constants/models/contact.mode';
import { QueryKey } from '~/lib/query-key';
import { ContactService } from '~/services/contact.service';

export const usePreviewContactQuery = (params: ContactParams) => {
  const previewContactQuery = useQuery({
    queryKey: [QueryKey.Contact.get.preview, params],
    queryFn: async () => await ContactService.get.preview_contact(params),
    enabled: !!params,
    retry: 1,
  });
  return previewContactQuery;
};

export const useApprovalPreviewContactQuery = (id: string) => {
  const approvealPreviewContactQuery = useQuery({
    queryKey: [QueryKey.Contact.get.approval_preview, id],
    queryFn: async () => await ContactService.get.approve_review_contact(id),
    enabled: !!id,
    retry: 1,
  });

  return approvealPreviewContactQuery;
};
