import { useMutation, useQuery } from '@tanstack/react-query';

import { LicenseImagesPayload, LicensePayload } from '~/constants/models/license.model';
import { QueryKey } from '~/lib/query-key';
import { LiccenseService } from '~/services/license.service';

export const useLicensesListQuery = () => {
  const query = useQuery({
    queryKey: [QueryKey.License.List],
    queryFn: async () => await LiccenseService.get.license(),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60 * 2,
    retry: 1,
  });

  return query;
};
export const useLicenseDetailQuery = () => {};
export const useLicenseMutation = () => {
  const createLicenseMutation = useMutation({
    mutationKey: [QueryKey.License.Create],
    mutationFn: async (payload: LicensePayload) => await LiccenseService.post.license(payload),

    onSuccess: (license) => {
      console.log('License được tạo:', license);
    },

    onError: (error) => {
      console.error('Tạo license thất bại:', error);
    },
  });

  const updateLicenseMutation = useMutation({
    mutationKey: [QueryKey.License.Update],
    mutationFn: async ({ id, payload }: { id: string; payload: LicensePayload }) =>
      await LiccenseService.put.license(id, payload),
  });

  const patchImagesMutation = useMutation({
    mutationKey: [QueryKey.License.PatchImage],
    mutationFn: async ({ id, payload }: { id: string; payload: LicenseImagesPayload }) =>
      await LiccenseService.patch.images(id, payload),
  });

  return { createLicenseMutation, updateLicenseMutation, patchImagesMutation };
};
