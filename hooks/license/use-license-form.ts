import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useLicenseMutation } from './use-license';

import { LicenseImagesPayload, LicensePayload } from '~/constants/models/license.model';
import { LicensePayloadSchema, licenseSchema } from '~/constants/schemas/license.schema';
import { useApiStore } from '~/store/check-api';
import { useIdStore } from '~/store/use-id-store';

export const useLicenseForm = () => {
  const { createLicenseMutation, patchImagesMutation } = useLicenseMutation();
  const { removeEndpoint, resetEndpoints, hasEndpoint } = useApiStore();
  const { setId, id, resetId } = useIdStore();

  const form = useForm<LicensePayloadSchema>({
    resolver: zodResolver(licenseSchema),
    defaultValues: {
      licenseNumber: '',
      expirationDate: new Date(),
      licenseImageFront: undefined,
      licenseImageBack: undefined,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    const infoPayload: LicensePayload = {
      expirationDate: data.expirationDate,
      licenseNumber: data.licenseNumber,
    };

    const imagesPayload: LicenseImagesPayload = {
      licenseImageFront: data.licenseImageFront,
      licenseImageBack: data.licenseImageBack,
    };

    if (hasEndpoint('license') && !id && hasEndpoint('image')) {
      createLicenseMutation.mutate(infoPayload, {
        onSuccess: (license) => {
          removeEndpoint('license');

          if (!license?.value?.id) {
            console.error('Lỗi: Không tìm thấy license ID!');
            return;
          }

          setId(license.value.id);

          patchImagesMutation.mutate(
            { id: license.value.id, payload: imagesPayload },
            {
              onSettled: () => {
                resetEndpoints();
                resetId();
              },
              onSuccess: () => {
                resetId();
                resetEndpoints();
              },
              onError: (error: any) => {
                ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
              },
            }
          );
        },
        onError: (error: any) => {
          ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
        },
      });
    } else {
      if (!id) {
        console.error('Lỗi: Không tìm thấy license ID!');
        return;
      }

      patchImagesMutation.mutate(
        {
          id,
          payload: imagesPayload,
        },
        {
          onSettled: () => {
            resetId();
            resetEndpoints();
          },
          onError: (error: any) => {
            ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
          },
        }
      );
    }
  });

  return {
    form,
    onSubmit,
    isLoading: createLicenseMutation.isPending && patchImagesMutation.isPending,
  };
};
