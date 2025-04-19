import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useReportMutation } from './use-report';

import { ReportPayload } from '~/constants/models/report.model';
import { ReportSchema, ReportSchemaType } from '~/constants/schemas/report.schema';
import { translate } from '~/lib/translate';

interface ReportFormProps {
  id: string;
}

export const useReportForm = ({ id }: ReportFormProps) => {
  const { createMutation, imageMutation } = useReportMutation();
  const form = useForm<ReportSchemaType>({
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      title: '',
      description: '',
      reportType: 0,
      files: [],
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    const payload: ReportPayload = {
      bookingId: id,
      title: data.title,
      description: data.description,
      reportType: data.reportType,
    };

    const files = data.files;

    createMutation.mutate(payload, {
      onSuccess: (response) => {
        if (files && files.length > 0) {
          imageMutation.mutate(
            {
              id: response.value.id,
              payload: {
                files,
              },
            },
            {
              onSuccess: () => {
                ToastAndroid.show(translate.report.toast.create, ToastAndroid.SHORT);
                form.reset();

                setTimeout(() => {
                  router.push({
                    pathname: '/(screen)/(reports)/detail/[id]',
                    params: {
                      id: response.value.id,
                    },
                  });
                }, 2000);
              },
              onError: (error: any) => {
                ToastAndroid.show(
                  error.response.data.message || translate.report.toast.error_image,
                  ToastAndroid.SHORT
                );
              },
            }
          );
        } else {
          ToastAndroid.show(translate.report.toast.create, ToastAndroid.SHORT);
          form.reset();

          setTimeout(() => {
            router.push({
              pathname: '/(screen)/(reports)/detail/[id]',
              params: {
                id: response.value.id,
              },
            });
          }, 2000);
        }
      },
      onError: (error: any) => {
        ToastAndroid.show(
          error.response.data.message || translate.report.toast.error_create,
          ToastAndroid.SHORT
        );
      },
    });
  });

  return {
    form,
    onSubmit,
    isLoading: createMutation.isPending || imageMutation.isPending,
    isError: createMutation.isError || imageMutation.isError,
    isSuccess: createMutation.isSuccess || imageMutation.isSuccess,
  };
};
