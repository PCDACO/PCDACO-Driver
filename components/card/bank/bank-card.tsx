import { Feather, FontAwesome } from '@expo/vector-icons';
import { FunctionComponent } from 'react';
import { View } from 'react-native';

import BankGradientCard from './bank-gradient-card';

import Description from '~/components/ui/description';
import { COLORS } from '~/theme/colors';

interface BankCardProps {
  cardNumber: string;
  cardHolder: string;
  bankName: string;
  isPrimary?: boolean;
}

const BankCard: FunctionComponent<BankCardProps> = ({
  cardNumber,
  cardHolder,
  bankName,
  isPrimary = false,
}) => {
  return (
    <BankGradientCard className="gap-6">
      <View className="flex-row items-center justify-between">
        <Description
          className="font-bold text-gray-300 dark:text-gray-600"
          title={isPrimary ? 'Thẻ chính' : 'Thẻ phụ'}
        />
        <Feather name="credit-card" size={24} color="white" />
      </View>

      <View>
        <Description className="font-bold text-gray-300 dark:text-gray-600" title="Số tài khoản" />
        <Description className="font-bold text-background dark:text-gray-600" title={cardNumber} />
      </View>

      <View className="flex-row items-center justify-between">
        <View>
          <Description
            className="font-bold text-gray-300 dark:text-gray-600"
            title="Tên tài khoản"
          />
          <Description className="font-bold text-background " title={cardHolder} />
        </View>
        <View className="items-end gap-2">
          <FontAwesome name="bank" size={20} color={COLORS.gray} />
          <Description className="font-bold text-background " title={bankName} />
        </View>
      </View>
    </BankGradientCard>
  );
};

export default BankCard;
