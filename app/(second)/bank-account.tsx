import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { FunctionComponent, useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import { SvgUri } from 'react-native-svg';

import Backdrop from '~/components/plugins/back-drop';
import CardBasic from '~/components/plugins/card-basic';
import Loading from '~/components/plugins/loading';
import BankEmpty from '~/components/screen/bank-list/bank-empty';
import BankFooter from '~/components/screen/bank-list/bank-footer';
import Subtitle from '~/components/ui/subtitle';
import { BankAccountResponseList } from '~/constants/models/bank.model';
import { useBackAccountListQuery, useBankMutation } from '~/hooks/bank/use-bank';
import { cn } from '~/lib/cn';
import { COLORS } from '~/theme/colors';

interface BankItemProps extends BankAccountResponseList {
  onPress: () => void;
}

export const BankItem: React.FC<BankItemProps> = ({
  bankIconUrl,
  bankShortName,
  onPress,
  isPrimary,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'flex-row items-center gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700'
      )}>
      <View className="flex-row items-center gap-2">
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
      </View>
      {isPrimary && (
        <View className="rounded-lg bg-green-100 px-2 py-1">
          <Text className="text-sm font-bold text-green-600">Chính</Text>
        </View>
      )}
    </Pressable>
  );
};

const BankAccount: FunctionComponent = () => {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<BankAccountResponseList | null>(null);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '15%', '70%'], []);
  const { deleteBankAccountMutation } = useBankMutation();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const { data, isLoading, refetch } = useBackAccountListQuery({
    params: {
      index: 1,
      size: 20,
    },
  });

  const bankData = data?.value.items;

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
    setIsSheetOpen(index > 0);
  }, []);

  const handleSheetChange = useCallback((index: number) => {
    setIsSheetOpen(index > 0);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    setIsSheetOpen(false);
    setSelectedBank(null);
  }, []);

  const handleBankPress = useCallback((bank: BankAccountResponseList) => {
    setSelectedBank(bank);
    handleSnapPress(1);
  }, []);

  const handleEdit = () => {
    if (!selectedBank?.id) return;
    handleClosePress();
    router.push({
      pathname: '/(screen)/bank/edit',
      params: { id: selectedBank.id },
    });
  };

  const handleWithdraw = () => {
    router.push({
      pathname: '/(screen)/(withdraw)',
      params: { id: selectedBank?.id },
    });
    handleClosePress();
  };

  const handleDelete = () => {
    if (!selectedBank?.id) return;
    Alert.alert('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa tài khoản ngân hàng này?', [
      {
        text: 'Hủy',
        style: 'cancel',
        onPress: () => {
          handleClosePress();
        },
      },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          deleteBankAccountMutation.mutate(selectedBank.id as string);
          handleClosePress();
        },
      },
    ]);
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <View className="h-full p-4">
      <View>
        <Subtitle title="Tài khoản/Thẻ của bạn" />
      </View>

      <CardBasic>
        {isLoading ? (
          <View className="h-40 items-center justify-center">
            <Loading />
          </View>
        ) : (
          <View>
            <FlatList
              data={bankData}
              renderItem={({ item }) => (
                <BankItem {...item} onPress={() => handleBankPress(item)} />
              )}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View className="h-1 " />}
              ListEmptyComponent={<BankEmpty />}
              ListFooterComponent={() => <BankFooter />}
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          </View>
        )}
      </CardBasic>

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        backdropComponent={
          isSheetOpen ? (props) => <Backdrop {...props} onPress={handleClosePress} /> : null
        }
        onChange={handleSheetChange}>
        <BottomSheetView className="bg-white dark:bg-slate-300">
          <View className="flex-row gap-2 p-4">
            <Pressable
              onPress={handleEdit}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-primary p-2 dark:border-primary">
              <Ionicons name="create-outline" size={20} color={COLORS.light.primary} />
              <Text className="text-primary">Chỉnh sửa</Text>
            </Pressable>
            <Pressable
              onPress={handleWithdraw}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-green-400 p-2 dark:border-green-400">
              <Ionicons name="cash-outline" size={20} color={COLORS.light.success} />
              <Text className="text-green-400">Rút tiền</Text>
            </Pressable>
            <Pressable
              onPress={handleDelete}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-red-200 p-2">
              <Ionicons name="trash-outline" size={20} color={COLORS.light.destructive} />
              <Text className="text-red-500">Xóa</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default BankAccount;
