import { Feather } from '@expo/vector-icons';
import { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import ReportBadgeStatus from '../report-list/report-badge-status';

import CardBasic from '~/components/plugins/card-basic';
import Description from '~/components/ui/description';
import Subtitle from '~/components/ui/subtitle';
import { BookingReportTypeNumber } from '~/constants/enums';
import { ReportDetailResponse } from '~/constants/models/report.model';
import { translate } from '~/lib/translate';
import { COLORS } from '~/theme/colors';

interface ReportBasicInfoProps {
  title: ReportDetailResponse['title'];
  reportType: ReportDetailResponse['reportType'];
  description: ReportDetailResponse['description'];
  reportName: ReportDetailResponse['reporterName'];
  status: ReportDetailResponse['status'];
}

const ReportBasicInfo: FunctionComponent<ReportBasicInfoProps> = ({
  title,
  reportType,
  description,
  reportName,
  status,
}) => {
  const typeText = Object.entries(BookingReportTypeNumber).find(
    ([_, value]) => value === reportType
  )?.[0];

  const translatedType = typeText
    ? translate.report.type[typeText as keyof typeof translate.report.type]
    : '';

  return (
    <CardBasic className="gap-4">
      <View className="flex-row items-start justify-between">
        <View>
          <Subtitle title={title} />
          <Description title={translatedType || ''} />
        </View>
        <ReportBadgeStatus status={status} textSize="text-base" fontWeight="font-bold" />
      </View>
      <Description title={description} />
      <View className="flex-row items-center gap-2">
        <Feather name="user" size={16} color={COLORS.gray} />
        <Text className="text-sm font-bold text-gray-400 dark:text-gray-300">
          {' '}
          Được báo cáo bởi: {reportName}
        </Text>
      </View>
    </CardBasic>
  );
};

export default ReportBasicInfo;
