import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import ReportBadgeStatus from '~/components/screen/report-list/report-badge-status';
import ReportBadgeType from '~/components/screen/report-list/report-badge-type';
import { ReportListResponse } from '~/constants/models/report.model';
import { translate } from '~/lib/translate';
import { COLORS } from '~/theme/colors';

interface RecentReportsSectionProps {
  reports: ReportListResponse[];
}

export const RecentReportsSection: React.FC<RecentReportsSectionProps> = ({ reports }) => {
  const router = useRouter();

  return (
    <View className="mb-6 px-4">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-900">{translate.home.recentReports}</Text>
        <TouchableOpacity onPress={() => router.push('/reports')}>
          <Text className="text-blue-600">{translate.common.seeAll}</Text>
        </TouchableOpacity>
      </View>
      {reports.length > 0 ? (
        <View className="gap-2">
          {reports.map((report) => (
            <CardBasic
              key={report.id}
              className="rounded-lg bg-white p-4 shadow-sm"
              onPress={() =>
                router.push({
                  pathname: '/(screen)/(reports)/detail/[id]',
                  params: { id: report.id },
                })
              }>
              <View className="flex-row items-start justify-between">
                <View>
                  <Text className="font-semibold text-gray-900">{report.title}</Text>
                  <Text className="text-gray-600" numberOfLines={2}>
                    {report.description}
                  </Text>
                </View>
                <View className="flex-row gap-2">
                  <ReportBadgeType type={report.reportType} />
                  <ReportBadgeStatus status={report.status} />
                </View>
              </View>
              {/* <View className="mt-2 flex-row items-center">
                <Text className="text-gray-600">
                  {translate.report.bookingId}: {report.bookingId}
                </Text>
              </View> */}
            </CardBasic>
          ))}
        </View>
      ) : (
        <CardBasic className="items-center justify-center gap-2 rounded-lg bg-white p-6">
          <Feather name="alert-circle" size={24} color={COLORS.light.grey5} />
          <Text className="text-center font-semibold text-gray-400">
            {translate.home.noRecentReports}
          </Text>
        </CardBasic>
      )}
    </View>
  );
};
