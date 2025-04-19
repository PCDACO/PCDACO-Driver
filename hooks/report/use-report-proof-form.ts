import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useReportMutation } from './use-report';

import { ReportProofSchema, ReportProofSchemaType } from '~/constants/schemas/report.schema';
import { QueryKey } from '~/lib/query-key';
import { translate } from '~/lib/translate';

interface UseReportProofFormProps {
  id: string;
}

export const useReportProofForm = ({ id }: UseReportProofFormProps) => {
  const queryClient = useQueryClient();
  const { compensationProofMutation } = useReportMutation();
  const form = useForm<ReportProofSchemaType>({
    resolver: zodResolver(ReportProofSchema),
    defaultValues: {
      images: null,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    if (!data.images) {
      ToastAndroid.show('Vui lòng chọn ảnh', ToastAndroid.SHORT);
      return;
    }
    compensationProofMutation.mutate(
      {
        reportId: id,
        payload: {
          images: data.images,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKey.Report.Detail, id] });
          ToastAndroid.show(translate.report.toast.compensation_proof, ToastAndroid.SHORT);
          router.reload();
          form.reset();
        },
        onError: (error: any) => {
          ToastAndroid.show(
            error.response.data.message || translate.report.toast.error_compensation_proof,
            ToastAndroid.SHORT
          );
        },
      }
    );
  });

  return {
    form,
    onSubmit,
    isLoading: compensationProofMutation.isPending,
    isError: compensationProofMutation.isError,
    isSuccess: compensationProofMutation.isSuccess,
  };
};
