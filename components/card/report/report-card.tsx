import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import ReportBadgeStatus from '~/components/screen/report-list/report-badge-status';
import ReportBadgeType from '~/components/screen/report-list/report-badge-type';
import Subtitle from '~/components/ui/subtitle';
import { BookingReportStatusNumber } from '~/constants/enums';
import { ReportListResponse } from '~/constants/models/report.model';
import { cn } from '~/lib/cn';
import { COLORS } from '~/theme/colors';

interface ReportCardProps {
  report: ReportListResponse;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  const router = useRouter();

  let borderColor = '';

  switch (report.status) {
    case BookingReportStatusNumber.Pending:
      borderColor = 'border-l-amber-500 dark:border-l-amber-900';
      break;
    case BookingReportStatusNumber.Resolved:
      borderColor = 'border-l-green-500 dark:border-l-green-900';
      break;
    case BookingReportStatusNumber.Rejected:
      borderColor = 'border-l-red-500 dark:border-l-red-900';
      break;
    default:
      borderColor = 'border-l-gray-500 dark:border-l-gray-900';
  }

  return (
    <CardBasic
      className={cn('gap-2 border-l-4', borderColor)}
      onPress={() => {
        router.push({
          pathname: '/(screen)/(reports)/detail/[id]',
          params: { id: report.id },
        });
      }}>
      <View className="flex-row items-start justify-between">
        <View className="items-start gap-1">
          <Subtitle title={report.title} />
          <ReportBadgeType type={report.reportType} />
        </View>
        <ReportBadgeStatus status={report.status} />
      </View>
      <View className="h-0.5 bg-gray-200 dark:bg-gray-700" />

      <View className="flex-row items-center gap-2">
        <Feather name="user" size={16} color={COLORS.gray} />
        <Text className="text-sm text-gray-600 dark:text-gray-300">{report.reporterName}</Text>
      </View>

      <Text className="text-sm text-black dark:text-white" numberOfLines={2}>
        {report.description}
      </Text>
    </CardBasic>
  );
};

export default ReportCard;
