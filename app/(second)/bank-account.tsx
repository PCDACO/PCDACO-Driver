import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { FunctionComponent, useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, FlatList, Pressable, Alert, ToastAndroid } from 'react-native';
import { SvgUri } from 'react-native-svg';

import WithDrawalForm from '~/components/form-ui/with-drawal-form';
import { Button } from '~/components/nativewindui/Button';
import Backdrop from '~/components/plugins/back-drop';
import CardBasic from '~/components/plugins/card-basic';
import Loading from '~/components/plugins/loading';
import BankEmpty from '~/components/screen/bank-list/bank-empty';
import BankFooter from '~/components/screen/bank-list/bank-footer';
import Subtitle from '~/components/ui/subtitle';
import { BankAccountResponseList } from '~/constants/models/bank.model';
import { useBackAccountListQuery, useBankMutation } from '~/hooks/bank/use-bank';
import { useWithdrawForm } from '~/hooks/transaction/use-withdraw-form';
import { cn } from '~/lib/cn';
import { COLORS } from '~/theme/colors';

interface BankItemProps extends BankAccountResponseList {
  onPress: () => void;
}

export const BankItem: React.FC<BankItemProps> = ({ bankIconUrl, bankShortName, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'flex-row items-center gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700'
      )}>
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
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<BankAccountResponseList | null>(null);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '35%', '70%'], []);
  const { deleteBankAccountMutation } = useBankMutation();
  const [isWithdraw, setIsWithdraw] = useState(false);
  const { form, onSubmit, isLoading: isLoadingForm, isSuccess, isError } = useWithdrawForm();

  const { data, isLoading } = useBackAccountListQuery({
    params: {
      index: 1,
      size: 20,
    },
  });

  console.log('watch', form.watch('amount'));
  console.log('watch', form.watch('bankAccountId'));

  const bankData = data?.value.items;

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
    setIsSheetOpen(index > 0);
  }, []);

  const handleSheetChange = useCallback((index: number) => {
    setIsSheetOpen(index > 0);
    setIsWithdraw(index === 2);
    form.reset();
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    setIsSheetOpen(false);
    setSelectedBank(null);
    setIsWithdraw(false);
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
    handleSnapPress(2);
    setIsWithdraw(true);
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

  const handleWithdrawSubmit = async () => {
    if (selectedBank?.id) {
      form.setValue('bankAccountId', selectedBank.id);
    }

    const isValid = await form.trigger(['amount', 'bankAccountId']);

    if (isValid) {
      onSubmit();
    } else {
      ToastAndroid.show('Vui lòng điền đúng thông tin', ToastAndroid.SHORT);
    }
  };

  return (
    <View className="h-full p-4">
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
              renderItem={({ item }) => (
                <BankItem {...item} onPress={() => handleBankPress(item)} />
              )}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View className="h-1 " />}
              ListEmptyComponent={<BankEmpty />}
              ListFooterComponent={() => <BankFooter />}
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
          {isWithdraw ? (
            <View className="gap-4 p-4">
              <WithDrawalForm form={form} />
              <Button onPress={handleWithdrawSubmit} disabled={isLoadingForm}>
                {isLoadingForm ? (
                  <View className="flex-row items-center gap-2">
                    <Loading size="small" />
                    <Text className="text-white">Đang xử lý...</Text>
                  </View>
                ) : isSuccess ? (
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="checkmark-circle" size={20} color={COLORS.white} />
                    <Text className="text-white">Rút tiền thành công</Text>
                  </View>
                ) : isError ? (
                  <View className="flex-row items-center gap-2">
                    <Text className="text-white">Xin hãy thử lại</Text>
                  </View>
                ) : (
                  <Text className="text-white">Rút tiền</Text>
                )}
              </Button>
            </View>
          ) : (
            <View className="gap-2 p-4">
              <Pressable
                onPress={handleEdit}
                className="flex-row items-center gap-2 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <Ionicons name="create-outline" size={20} color={COLORS.black} />
                <Text>Chỉnh sửa</Text>
              </Pressable>
              <Pressable
                onPress={handleWithdraw}
                className="flex-row items-center gap-2 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <Ionicons name="cash-outline" size={20} color={COLORS.black} />
                <Text>Rút tiền</Text>
              </Pressable>
              <Pressable
                onPress={handleDelete}
                className="flex-row items-center gap-2 rounded-lg border border-red-200 p-4">
                <Ionicons name="trash-outline" size={20} color={COLORS.light.destructive} />
                <Text className="text-red-500">Xóa</Text>
              </Pressable>
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default BankAccount;
