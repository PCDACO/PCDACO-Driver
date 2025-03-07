import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useLicenseMutation } from './use-license';

import { LicenseImagesPayload, LicensePayload } from '~/constants/models/license.model';
import { LicensePayloadSchema, licenseSchema } from '~/constants/schemas/license.schema';

export const useLicenseForm = () => {
  const { createLicenseMutation, patchImagesMutation } = useLicenseMutation();

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

    console.log('Bắt đầu tạo license với payload:', infoPayload);

    createLicenseMutation.mutate(infoPayload, {
      onSuccess: (license) => {
        console.log('License được tạo:', license);

        if (!license?.value?.id) {
          console.error('Lỗi: Không tìm thấy license ID!');
          return;
        }

        console.log('Bắt đầu upload hình ảnh với ID:', license.value.id);

        patchImagesMutation.mutate(
          { id: license.value.id, payload: imagesPayload },
          {
            onSettled: () => console.log('Upload ảnh đã kết thúc!'),
            onSuccess: () => console.log('Upload ảnh thành công!'),
            onError: (error) => console.log('Upload ảnh thất bại:', error),
          }
        );
      },
      onError: (error) => console.error('Tạo license thất bại:', error),
    });
  });

  return {
    form,
    onSubmit,
    isLoading: createLicenseMutation.isPending && patchImagesMutation.isPending,
  };
};
