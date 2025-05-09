import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BankCard from '~/components/card/bank/bank-card';
import BankForm from '~/components/form-ui/bank-form';
import Loading from '~/components/plugins/loading';
import BankHeader from '~/components/screen/bank-edit/bank-header';
import { useBankAccountDetailQuery } from '~/hooks/bank/use-bank';
import { useBankForm } from '~/hooks/bank/use-bank-form';
import { formatCardNumber } from '~/lib/format';
import { COLORS } from '~/theme/colors';

const Edit: FunctionComponent = () => {
  const { id } = useLocalSearchParams();

  const { data: bank, isLoading: isBankLoading } = useBankAccountDetailQuery({
    id: id as string,
  });

  const bankDetail = bank?.value;

  const { form, onSubmit, isLoading } = useBankForm({ id: id as string });
  const [bankName, setBankName] = React.useState<string>('');

  const handleBankName = (name: string) => {
    setBankName(name);
  };

  React.useEffect(() => {
    if (bankDetail) {
      form.setValue('bankInfoId', bankDetail.bankInfoId);
      form.setValue('accountName', bankDetail.accountName);
      form.setValue('accountNumber', bankDetail.accountNumber);
      form.setValue('isPrimary', bankDetail.isPrimary);
    }
  }, [bankDetail, form]);

  if (isBankLoading) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <Loading />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="px-4">
        <BankHeader />
      </View>
      {/* Ẩn bàn phím khi chạm ra ngoài */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}>
          <ScrollView
            className="px-4"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled">
            <View className="justify-between gap-8">
              <BankCard
                cardNumber={
                  formatCardNumber(form.watch('accountNumber')) ||
                  formatCardNumber('0000000000000000')
                }
                cardHolder={form.watch('accountName') || 'N/A'}
                bankName={bankName || 'N/A'}
                isPrimary={form.watch('isPrimary')}
              />
              {/* Form bank */}
              <BankForm form={form} selectName={handleBankName} id={id as string} />
            </View>
          </ScrollView>
          {/* Nút lưu cố định */}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <View className="p-4">
        <Pressable
          disabled={isLoading}
          className="w-full flex-row items-center justify-center gap-2 rounded-lg p-4"
          onPress={onSubmit}
          style={{ backgroundColor: COLORS.black }}>
          {isLoading ? (
            <>
              <Loading size="small" />
              <Text className="font-bold text-background">Đang lưu...</Text>
            </>
          ) : (
            <>
              <Feather name="save" color={COLORS.white} size={20} />
              <Text className="font-bold text-background">
                {id ? 'Cập nhật' : 'Thêm mới'} phương thức thanh toán{' '}
              </Text>
            </>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Edit;
