import { useMutation, useQuery } from '@tanstack/react-query';

import { LicenseImagesPayload, LicensePayload } from '~/constants/models/license.model';
import { QueryKey } from '~/lib/query-key';
import { LiccenseService } from '~/services/license.service';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useLicensesListQuery = () => {
  const query = useQuery({
    queryKey: [QueryKey.License.List],
    queryFn: async () => {
      await delay(2000); // Add 2 second delay
      return await LiccenseService.get.license();
    },
    staleTime: 0,
    retry: 1,
  });

  return query;
};
export const useLicenseDetailQuery = () => {};
export const useLicenseMutation = () => {
  const createLicenseMutation = useMutation({
    mutationKey: [QueryKey.License.Create],
    mutationFn: async (payload: LicensePayload) => await LiccenseService.post.license(payload),
  });

  const updateLicenseMutation = useMutation({
    mutationKey: [QueryKey.License.Update],
    mutationFn: async ({ payload }: { payload: LicensePayload }) =>
      await LiccenseService.put.license(payload),
  });

  const patchImagesMutation = useMutation({
    mutationKey: [QueryKey.License.PatchImage],
    mutationFn: async ({ payload }: { payload: LicenseImagesPayload }) =>
      await LiccenseService.patch.images(payload),
  });

  return { createLicenseMutation, updateLicenseMutation, patchImagesMutation };
};
