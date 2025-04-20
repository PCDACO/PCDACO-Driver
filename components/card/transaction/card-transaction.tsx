import { FunctionComponent, useState, useCallback } from 'react';
import { Text, View, Image, LayoutAnimation, Platform, UIManager } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import TransactionBadge from '~/components/screen/transaction-list/transaction-badge';
import { TransactionResponse } from '~/constants/models/transaction.model';
import { cn } from '~/lib/cn';
import { translate } from '~/lib/translate';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface CardTransactionProps {
  data: TransactionResponse;
}

const CardTransaction: FunctionComponent<CardTransactionProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <CardBasic
      onPress={toggleExpand}
      className={cn('border-r-4', data.isIncome ? 'border-r-green-600' : 'border-r-red-600')}>
      <View>
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="text-base font-semibold">
              {translate.transaction.type[data.type as keyof typeof translate.transaction.type]}
            </Text>
            {data.description && (
              <Text className="mt-1 text-xs text-gray-400">{data.description}</Text>
            )}
            {data.createdAt && (
              <Text className="mt-1 text-xs text-gray-400">
                {new Date(data.createdAt).toLocaleDateString()}
              </Text>
            )}
          </View>
          <View className="items-end">
            <Text
              className={`text-base font-semibold ${data.isIncome ? 'text-green-600' : 'text-red-600'}`}>
              {data.isIncome ? '+' : '-'} {data.amount.toLocaleString()}
            </Text>
            <TransactionBadge status={data.status} />
          </View>
        </View>

        {expanded && data.prooUrl && (
          <Image
            source={{ uri: data.prooUrl }}
            resizeMode="cover"
            height={200}
            className="w-full rounded-lg border border-gray-200"
          />
        )}
      </View>
    </CardBasic>
  );
};

export default CardTransaction;
