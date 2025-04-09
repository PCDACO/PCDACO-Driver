import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ToastAndroid } from 'react-native';

import {
  ReportParams,
  ReportPayload,
  ReportApprovePayload,
  ReportCompensationPayload,
  ReportCompensationProofPayload,
  ReportImagePayload,
} from '~/constants/models/report.model';
import { QueryKey } from '~/lib/query-key';
import { translate } from '~/lib/translate';
import { ReportService } from '~/services/report.service';

interface ReportProps {
  params?: Partial<ReportParams>;
}

export const useReportQuery = ({ params }: ReportProps) => {
  const listQuery = useQuery({
    queryKey: [QueryKey.Report.List, params ? params : {}],
    queryFn: () => ReportService.get.list(params),
    staleTime: 1000,
  });

  return listQuery;
};

export const useReportDetailQuery = ({ id }: { id: string }) => {
  const detailQuery = useQuery({
    queryKey: [QueryKey.Report.Detail, id],
    queryFn: () => ReportService.get.detail(id),
    enabled: !!id,
  });

  return detailQuery;
};

export const useReportMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationKey: [QueryKey.Report.Create],
    mutationFn: async (payload: ReportPayload) => await ReportService.post.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Report.List] });
      ToastAndroid.show(translate.report.toast.create, ToastAndroid.SHORT);
    },
    onError: (error: any) => {
      ToastAndroid.show(
        error.response.data.message || translate.report.toast.error_create,
        ToastAndroid.SHORT
      );
    },
  });

  const approveMutation = useMutation({
    mutationKey: [QueryKey.Report.Approve],
    mutationFn: async ({ id, payload }: { id: string; payload: ReportApprovePayload }) =>
      await ReportService.put.approve(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Report.List] });
      ToastAndroid.show(translate.report.toast.approve, ToastAndroid.SHORT);
    },
    onError: (error: any) => {
      ToastAndroid.show(
        error.response.data.message || translate.report.toast.error_approve,
        ToastAndroid.SHORT
      );
    },
  });

  const compensationMutation = useMutation({
    mutationKey: [QueryKey.Report.Compensation],
    mutationFn: async ({ id, payload }: { id: string; payload: ReportCompensationPayload }) =>
      await ReportService.put.compensation(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Report.Detail] });
      ToastAndroid.show(translate.report.toast.compensation, ToastAndroid.SHORT);
    },
    onError: (error: any) => {
      ToastAndroid.show(
        error.response.data.message || translate.report.toast.error_compensation,
        ToastAndroid.SHORT
      );
    },
  });

  const compensationProofMutation = useMutation({
    mutationKey: [QueryKey.Report.CompensationProof],
    mutationFn: async ({
      reportId,
      payload,
    }: {
      reportId: string;
      payload: ReportCompensationProofPayload;
    }) => await ReportService.patch.compensationProof(reportId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Report.Detail] });
      ToastAndroid.show(translate.report.toast.compensation_proof, ToastAndroid.SHORT);
    },
    onError: (error: any) => {
      ToastAndroid.show(
        error.response.data.message || translate.report.toast.error_compensation_proof,
        ToastAndroid.SHORT
      );
    },
  });

  const imageMutation = useMutation({
    mutationKey: [QueryKey.Report.Image],
    mutationFn: async ({ id, payload }: { id: string; payload: ReportImagePayload }) =>
      await ReportService.patch.image(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Report.Detail] });
      ToastAndroid.show(translate.report.toast.image, ToastAndroid.SHORT);
    },
    onError: (error: any) => {
      ToastAndroid.show(
        error.response.data.message || translate.report.toast.error_image,
        ToastAndroid.SHORT
      );
    },
  });

  return {
    createMutation,
    approveMutation,
    compensationMutation,
    compensationProofMutation,
    imageMutation,
  };
};
