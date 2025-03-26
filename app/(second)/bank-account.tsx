import { useRouter } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { SvgUri } from 'react-native-svg';

import CardBasic from '~/components/plugins/card-basic';
import Loading from '~/components/plugins/loading';
import BankEmpty from '~/components/screen/bank-list/bank-empty';
import BankFooter from '~/components/screen/bank-list/bank-footer';
import Subtitle from '~/components/ui/subtitle';
import { BankAccountResponseList } from '~/constants/models/bank.model';
import { useBackAccountListQuery } from '~/hooks/bank/use-bank';
import { COLORS } from '~/theme/colors';

export const BankItem: React.FC<BankAccountResponseList> = ({ id, bankIconUrl, bankShortName }) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/bank/edit',
          params: {
            id,
          },
        })
      }
      className="flex-row items-center gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
      {bankIconUrl && (
        <SvgUri
          uri={bankIconUrl}
          height="32"
          width="32"
          style={{
            borderRadius: 8,
            borderColor: COLORS.gray,
            borderWidth: 1,
          }}
        />
      )}
      <Text className="text-base font-bold text-foreground">{bankShortName}</Text>
    </Pressable>
  );
};

const BankAccount: FunctionComponent = () => {
  const { data, isLoading } = useBackAccountListQuery({
    params: {
      index: 1,
      size: 10,
    },
  });

  const bankData = data?.value.items;

  return (
    <View className="p-4">
      <View>
        <Subtitle title="Tài khoản/Thẻ của bạn" />
      </View>

      <CardBasic>
        {isLoading ? (
          <View className="h-40 flex-1 items-center justify-center">
            <Loading />
          </View>
        ) : (
          <View>
            <FlatList
              data={bankData}
              renderItem={({ item }) => <BankItem {...item} />}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View className="h-1 " />}
              ListEmptyComponent={<BankEmpty />}
              ListFooterComponent={() => <BankFooter />}
            />
          </View>
        )}
      </CardBasic>
    </View>
  );
};

export default BankAccount;
