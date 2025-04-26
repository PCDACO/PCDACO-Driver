import { Feather, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { FunctionComponent } from 'react';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Text, View, TouchableOpacity, ScrollView, Pressable } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { Input } from '~/components/layout/input-with-icon/input';
import CardBasic from '~/components/plugins/card-basic';
import Loading from '~/components/plugins/loading';
import { useBankAccountDetailQuery } from '~/hooks/bank/use-bank';
import type { useWithdrawForm } from '~/hooks/transaction/use-withdraw-form';
import { useUserQuery } from '~/hooks/user/use-user';
import { formatPriceToVND } from '~/lib/format';
import { formatAccountNumber, formatNumber } from '~/lib/utils';

interface WithdrawalFormProps {
  form: ReturnType<typeof useWithdrawForm>['form'];
  onSubmit?: () => void;
  isLoading?: boolean;
  id?: string;
}

const WithdrawalForm: FunctionComponent<WithdrawalFormProps> = ({
  form,
  onSubmit = () => {},
  isLoading = false,
  id,
}) => {
  const { currentUserQuery } = useUserQuery();
  const { data, isLoading: isLoadingUser } = currentUserQuery;
  const { data: bankAccountQuery, isLoading: isLoadingBankAccount } = useBankAccountDetailQuery({
    id: id as string,
  });

  // Set bank account id if id is provided
  React.useEffect(() => {
    if (id) {
      form.setValue('bankAccountId', id);
    }
  }, [id]);

  const user = data?.value;
  const bankAccount = bankAccountQuery?.value;

  const quickAmounts = [
    { label: '100.000đ', value: 100000 },
    { label: '500.000đ', value: 500000 },
    { label: '1.000.000đ', value: 1000000 },
    { label: '5.000.000đ', value: 5000000 },
  ];

  if (isLoadingUser || isLoadingBankAccount) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <Loading size="small" />
      </View>
    );
  }

  const handleQuickAmountSelect = (amount: number) => {
    form.setValue('amount', amount);
  };

  const currentAmount = form.watch('amount') || 0;
  const isAmountValid = currentAmount > 0 && currentAmount <= (user?.balance || 0);

  return (
    <ScrollView className="h-full ">
      <View className="relative gap-6 px-4 py-8">
        <Pressable onPress={() => router.back()} className="absolute left-4 top-6">
          <FontAwesome name="arrow-left" size={20} color="black" />
        </Pressable>

        {/* Header */}
        <View className="mb-2 items-center">
          <Text className="text-2xl font-bold text-gray-800">Rút tiền</Text>
          <Text className="mt-1 text-center text-sm text-gray-500">
            Rút tiền từ tài khoản của bạn vào tài khoản ngân hàng
          </Text>
        </View>

        {/* Balance Card */}
        <View className="rounded-xl border-l-4 border-l-green-400 bg-white p-4 shadow-sm">
          <Text className="mb-2 text-sm font-medium text-gray-500">Số dư khả dụng</Text>
          <View className="flex-row items-center gap-2">
            <FontAwesome name="money" size={20} color="#4B5563" />
            <Text className="text-xl font-bold text-gray-800">
              {formatPriceToVND(user?.balance || 0)}
            </Text>
          </View>
        </View>

        {/* Amount Input */}
        <FieldLayout label="Số tiền rút">
          <Controller
            control={form.control}
            name="amount"
            render={({ field: { value, onChange } }) => (
              <Input
                value={
                  value
                    ? formatNumber(value)
                    : form.watch('amount')
                      ? formatNumber(form.watch('amount'))
                      : ''
                }
                onChangeText={(text) => {
                  const numericValue = text.replace(/\D/g, '');
                  onChange(Number(numericValue));
                }}
                placeholder="Nhập số tiền"
                keyboardType="numeric"
                leftIcon={<FontAwesome name="dollar" size={18} color="#6B7280" />}
              />
            )}
          />
        </FieldLayout>

        {/* Quick Amount Buttons */}
        <View className="mt-2">
          <Text className="mb-2 text-sm font-medium text-gray-500">Chọn nhanh</Text>
          <View className="flex-row flex-wrap gap-2">
            {quickAmounts.map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => handleQuickAmountSelect(item.value)}
                className={`rounded-full border px-4 py-2 ${
                  currentAmount === item.value
                    ? 'border-green-500 bg-green-100'
                    : 'border-gray-200 bg-gray-50'
                }`}>
                <Text
                  className={`text-sm font-medium ${
                    currentAmount === item.value ? 'text-green-700' : 'text-gray-700'
                  }`}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bank Account Selection */}
        <View className="gap-2">
          <Text className="text-sm font-medium text-gray-500">Tài khoản ngân hàng</Text>
          <TouchableOpacity className="flex-row items-center justify-between rounded-lg border border-b-2 border-l-4 border-gray-300 border-l-green-400 p-4 ">
            <View className="flex-row items-center gap-3">
              <FontAwesome name="credit-card" size={20} color="#4B5563" />
              <View>
                <Text className="font-medium text-gray-800">{bankAccount?.bankName}</Text>
                <Text className="text-xs text-gray-500">
                  {formatAccountNumber(bankAccount?.accountNumber || 0)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Summary */}
        {currentAmount > 0 && (
          <CardBasic className="rounded-lg bg-gray-50 p-4">
            <View className="gap-3">
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Số tiền rút:</Text>
                <Text className="font-medium text-gray-800">{formatPriceToVND(currentAmount)}</Text>
              </View>
              <View className="my-2 h-px bg-gray-200" />
              <View className="flex-row justify-between">
                <Text className="font-medium text-gray-700">Tổng cộng:</Text>
                <Text className="font-bold text-gray-800">{formatPriceToVND(currentAmount)}</Text>
              </View>
            </View>
          </CardBasic>
        )}

        {/* Help Text */}
        <View className="flex-row items-center gap-2 rounded-lg bg-blue-50 p-3">
          <Feather name="help-circle" size={16} color="#3B82F6" />
          <Text className="text-sm text-blue-700">
            Rút tiền sẽ được xử lý trong vòng 24 giờ làm việc
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={onSubmit}
          disabled={!isAmountValid}
          className={`items-center rounded-lg py-4 ${isAmountValid ? 'bg-green-400' : 'bg-gray-300'}`}>
          <Text className={`font-bold ${isAmountValid ? 'text-white' : 'text-gray-500'}`}>
            {isLoading ? <Loading size="small" /> : 'Rút tiền'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default WithdrawalForm;
