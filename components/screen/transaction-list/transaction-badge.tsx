import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import { TransactionStatus } from '~/constants/enums';
import { cn } from '~/lib/cn';
import { translate } from '~/lib/translate';

interface TransactionBadgeProps {
  status: string;
  className?: string;
  textSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl';
  fontWeight?: 'font-normal' | 'font-medium' | 'font-semibold' | 'font-bold';
}

const TransactionBadge: FunctionComponent<TransactionBadgeProps> = ({
  status,
  className,
  textSize = 'text-xs',
  fontWeight = 'font-medium',
}) => {
  let badgeText = '';
  let bgClass = '';
  let textClass = '';

  switch (status) {
    case TransactionStatus.Pending:
      badgeText = translate.transaction.status.Pending;
      bgClass = 'bg-blue-100 dark:bg-blue-900';
      textClass = 'text-blue-600 dark:text-blue-300';
      break;
    case TransactionStatus.Completed:
      badgeText = translate.transaction.status.Completed;
      bgClass = 'bg-green-100 dark:bg-green-900';
      textClass = 'text-green-600 dark:text-green-300';
      break;
    case TransactionStatus.Failed:
      badgeText = translate.transaction.status.Failed;
      bgClass = 'bg-red-100 dark:bg-red-900';
      textClass = 'text-red-600 dark:text-red-300';
      break;
    case TransactionStatus.Cancelled:
      badgeText = translate.transaction.status.Cancelled;
      bgClass = 'bg-gray-100 dark:bg-gray-900';
      textClass = 'text-gray-600 dark:text-gray-300';
      break;
    default:
      badgeText = translate.transaction.status.Pending;
      bgClass = 'bg-blue-100 dark:bg-blue-900';
      textClass = 'text-blue-600 dark:text-blue-300';
  }

  return (
    <View className={cn(className, 'rounded-full px-2 py-0.5', bgClass)}>
      <Text className={cn(textSize, fontWeight, textClass)}>{badgeText}</Text>
    </View>
  );
};

export default TransactionBadge;
