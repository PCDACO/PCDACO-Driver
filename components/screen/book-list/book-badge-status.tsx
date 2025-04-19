import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import { BookingStatusEnum } from '~/constants/enums';
import { cn } from '~/lib/cn';
import { translate } from '~/lib/translate';

interface BookBadgeStatusProps {
  status: string;
  className?: string;
  textSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl';
  fontWeight?: 'font-normal' | 'font-medium' | 'font-semibold' | 'font-bold';
}

const BookBadgeStatus: FunctionComponent<BookBadgeStatusProps> = ({
  status,
  className,
  textSize = 'text-xs',
  fontWeight = 'font-medium',
}) => {
  let badgeText = '';
  let bgClass = '';
  let textClass = '';

  switch (status) {
    case BookingStatusEnum.Approved:
      badgeText = translate.booking.status[status];
      bgClass = 'bg-green-500';
      textClass = 'text-white';
      break;
    case BookingStatusEnum.Pending:
      badgeText = translate.booking.status[status];
      bgClass = 'bg-yellow-500';
      textClass = 'text-white';
      break;
    case BookingStatusEnum.Rejected:
      badgeText = translate.booking.status[status];
      bgClass = 'bg-red-500';
      textClass = 'text-white';
      break;
    case BookingStatusEnum.ReadyForPickup:
      badgeText = translate.booking.status[status];
      bgClass = 'bg-blue-500';
      textClass = 'text-white';
      break;
    case BookingStatusEnum.Ongoing:
      badgeText = translate.booking.status[status];
      bgClass = 'bg-purple-500';
      textClass = 'text-white';
      break;
    case BookingStatusEnum.Completed:
      badgeText = translate.booking.status[status];
      bgClass = 'bg-green-500';
      textClass = 'text-white';
      break;
    case BookingStatusEnum.Cancelled:
      badgeText = translate.booking.status[status];
      bgClass = 'bg-red-500';
      textClass = 'text-white';
      break;
    case BookingStatusEnum.Expired:
      badgeText = translate.booking.status[status];
      bgClass = 'bg-gray-500';
      textClass = 'text-white';
      break;
    case BookingStatusEnum.Done:
      badgeText = translate.booking.status[status];
      bgClass = 'bg-green-500';
      textClass = 'text-white';
      break;
    default:
      badgeText = status;
      bgClass = 'bg-gray-500';
      textClass = 'text-white';
  }
  return (
    <View className={cn(className, 'rounded-full px-2 py-0.5', bgClass, className)}>
      <Text className={cn(textSize, fontWeight, textClass)}>{badgeText}</Text>
    </View>
  );
};

export default BookBadgeStatus;
