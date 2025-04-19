import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import { BookingReportTypeNumber } from '~/constants/enums';
import { cn } from '~/lib/cn';
import { translate } from '~/lib/translate';

interface ReportBadgeTypeProps {
  type: number;
  className?: string;
  textSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl';
  fontWeight?: 'font-normal' | 'font-medium' | 'font-semibold' | 'font-bold';
}

const ReportBadgeType: FunctionComponent<ReportBadgeTypeProps> = ({
  type,
  className,
  textSize = 'text-xs',
  fontWeight = 'font-medium',
}) => {
  let typeBadgeText = '';
  let typeBgClass = '';
  let typeTextClass = '';

  switch (type) {
    case BookingReportTypeNumber.Conflict:
      typeBadgeText = translate.report.type.Conflict;
      typeBgClass = 'bg-amber-100 dark:bg-amber-900';
      typeTextClass = 'text-amber-600 dark:text-amber-300';
      break;
    case BookingReportTypeNumber.Accident:
      typeBadgeText = translate.report.type.Accident;
      typeBgClass = 'bg-red-100 dark:bg-red-900';
      typeTextClass = 'text-red-600 dark:text-red-300';
      break;
    case BookingReportTypeNumber.FineNotice:
      typeBadgeText = translate.report.type.FineNotice;
      typeBgClass = 'bg-yellow-100 dark:bg-yellow-900';
      typeTextClass = 'text-yellow-600 dark:text-yellow-300';
      break;
    case BookingReportTypeNumber.Damage:
      typeBadgeText = translate.report.type.Damage;
      typeBgClass = 'bg-purple-100 dark:bg-purple-900';
      typeTextClass = 'text-purple-600 dark:text-purple-300';
      break;
    case BookingReportTypeNumber.Maintenance:
      typeBadgeText = translate.report.type.Maintenance;
      typeBgClass = 'bg-blue-100 dark:bg-blue-900';
      typeTextClass = 'text-blue-600 dark:text-blue-300';
      break;
    case BookingReportTypeNumber.Other:
      typeBadgeText = translate.report.type.Other;
      typeBgClass = 'bg-gray-100 dark:bg-gray-900';
      typeTextClass = 'text-gray-600 dark:text-gray-300';
      break;
    default:
      typeBadgeText = translate.report.type.Other;
      typeBgClass = 'bg-gray-100 dark:bg-gray-900';
      typeTextClass = 'text-gray-600 dark:text-gray-300';
  }

  return (
    <View className={cn('rounded-full px-2 py-0.5', className, typeBgClass)}>
      <Text className={cn('text-center', textSize, fontWeight, typeTextClass)}>
        {typeBadgeText}
      </Text>
    </View>
  );
};

export default ReportBadgeType;
