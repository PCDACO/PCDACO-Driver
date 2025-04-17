import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useLicenseMutation } from './use-license';

import { LicenseImagesPayload, LicensePayload } from '~/constants/models/license.model';
import { LicensePayloadSchema, licenseSchema } from '~/constants/schemas/license.schema';
import { QueryKey } from '~/lib/query-key';
import { useApiStore } from '~/store/check-endpoint';

interface LicenseFormProps {
  id?: string;
}

export const useLicenseForm = ({ id }: LicenseFormProps) => {
  const queryClient = useQueryClient();
  const { createLicenseMutation, updateLicenseMutation, patchImagesMutation } =
    useLicenseMutation();
  const { hasEndpoint, resetEndpoints, removeEndpoint } = useApiStore();

  const form = useForm<LicensePayloadSchema>({
    resolver: zodResolver(licenseSchema),
    defaultValues: {
      licenseNumber: '',
      expirationDate: undefined,
      licenseImageFront: undefined,
      licenseImageBack: undefined,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    const infoPayload: LicensePayload = {
      expirationDate: data.expirationDate,
      licenseNumber: data.licenseNumber,
    };

    const imagePayload: LicenseImagesPayload = {
      licenseImageFront: data.licenseImageFront,
      licenseImageBack: data.licenseImageBack,
    };

    if (id) {
      if (hasEndpoint(['edit-info', 'edit-image'])) {
        updateLicenseMutation.mutate(
          { payload: infoPayload },
          {
            onSuccess: () => {
              ToastAndroid.show('Cập nhật thành công giấy phép lái xe', ToastAndroid.SHORT);
              patchImagesMutation.mutate(
                { payload: imagePayload },
                {
                  onSuccess: () => {
                    resetEndpoints();
                    ToastAndroid.show(
                      'Cập nhật thành công hình ảnh giấy phép lái xe',
                      ToastAndroid.SHORT
                    );
                    queryClient.invalidateQueries({
                      queryKey: [QueryKey.License.Detail],
                    });
                    setTimeout(() => {
                      router.back();
                    }, 3000);
                  },
                  onError: (error: any) => {
                    removeEndpoint('edit-image');
                    ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
                  },
                }
              );
            },
            onError: (error: any) => {
              ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
            },
          }
        );
      } else if (hasEndpoint(['edit-info'])) {
        updateLicenseMutation.mutate(
          { payload: infoPayload },
          {
            onSuccess: () => {
              resetEndpoints();
              ToastAndroid.show('Cập nhật thành công giấy phép lái xe', ToastAndroid.SHORT);
              queryClient.invalidateQueries({
                queryKey: [QueryKey.License.Detail],
              });

              setTimeout(() => {
                router.back();
              }, 3000);
            },
            onError: (error: any) => {
              ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
            },
          }
        );
      } else if (hasEndpoint(['edit-image'])) {
        patchImagesMutation.mutate(
          { payload: imagePayload },
          {
            onSuccess: () => {
              resetEndpoints();
              ToastAndroid.show(
                'Cập nhật thành công hình ảnh giấy phép lái xe',
                ToastAndroid.SHORT
              );

              queryClient.invalidateQueries({
                queryKey: [QueryKey.License.Detail],
              });

              setTimeout(() => {
                router.back();
              }, 3000);
            },
            onError: (error: any) => {
              ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
            },
          }
        );
      }
    } else {
      createLicenseMutation.mutate(infoPayload, {
        onSuccess: () => {
          ToastAndroid.show('Tạo thành công giấy phép lái xe', ToastAndroid.SHORT);
          patchImagesMutation.mutate(
            { payload: imagePayload },
            {
              onSuccess: () => {
                resetEndpoints();
                ToastAndroid.show('Tạo thành công hình ảnh giấy phép lái xe', ToastAndroid.SHORT);
                queryClient.invalidateQueries({
                  queryKey: [QueryKey.License.Detail],
                });

                setTimeout(() => {
                  router.back();
                }, 3000);
              },
              onError: (error: any) => {
                removeEndpoint('create-image');
                ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
              },
            }
          );
        },
        onError: (error: any) => {
          ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
        },
      });
    }
  });

  return {
    form,
    onSubmit,
    isLoading:
      createLicenseMutation.isPending ||
      updateLicenseMutation.isPending ||
      patchImagesMutation.isPending,
  };
};
