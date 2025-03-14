import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useLicenseMutation } from './use-license';

import { LicenseImagesPayload, LicensePayload } from '~/constants/models/license.model';
import { LicensePayloadSchema, licenseSchema } from '~/constants/schemas/license.schema';
import { useApiStore } from '~/store/check-endpoint';

interface LicenseFormProps {
  id?: string;
}

export const useLicenseForm = ({ id }: LicenseFormProps) => {
  const [currentId, setCurrentId] = React.useState<string | undefined>();
  const { createLicenseMutation, updateLicenseMutation, patchImagesMutation } =
    useLicenseMutation();
  const { hasEndpoint } = useApiStore();

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
          { id, payload: infoPayload },
          {
            onSuccess: () => {
              setCurrentId(undefined);
              ToastAndroid.show('Tạo thành công', ToastAndroid.SHORT);
            },
            onError: (error: any) => {
              ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
            },
          }
        );
      } else if (hasEndpoint(['edit-image'])) {
        patchImagesMutation.mutate(
          { id, payload: imagePayload },
          {
            onSuccess: () => {
              setCurrentId(undefined);
              ToastAndroid.show('Tạo thành công', ToastAndroid.SHORT);
            },
            onError: (error: any) => {
              ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
            },
          }
        );
      } else if (hasEndpoint(['edit-info'])) {
        updateLicenseMutation.mutate(
          { id, payload: infoPayload },
          {
            onSuccess: () => {
              setCurrentId(undefined);
              ToastAndroid.show('Tạo thành công', ToastAndroid.SHORT);
            },
            onError: (error: any) => {
              ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
            },
          }
        );
      }
    } else {
      if (currentId) {
        patchImagesMutation.mutate(
          { id: currentId, payload: imagePayload },
          {
            onSuccess: () => {
              setCurrentId(undefined);
              ToastAndroid.show('Tạo thành công', ToastAndroid.SHORT);
            },
            onError: (error: any) => {
              ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
            },
          }
        );
      } else {
        createLicenseMutation.mutate(infoPayload, {
          onSuccess: (data) => {
            setCurrentId(data.value.id);

            patchImagesMutation.mutate(
              { id: data.value.id, payload: imagePayload },
              {
                onSuccess: () => {
                  setCurrentId(undefined);
                  ToastAndroid.show('Tạo thành công', ToastAndroid.SHORT);
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
      }
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
