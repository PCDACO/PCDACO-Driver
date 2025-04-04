import Checkbox from 'expo-checkbox';
import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { FlatList, Pressable, Text, View } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { Input } from '~/components/layout/input-with-icon/input';
import CardBasic from '~/components/plugins/card-basic';
import Loading from '~/components/plugins/loading';
import { useBankQuery } from '~/hooks/bank/use-bank';
import { useBankForm } from '~/hooks/bank/use-bank-form';
import { useDebounce } from '~/hooks/plugins/use-debounce';
import { formatCardNumber } from '~/lib/format';
import { COLORS } from '~/theme/colors';

interface BankFormProps {
  form: ReturnType<typeof useBankForm>['form'];
  selectName: (name: string) => void;
  id?: string;
}

const BankForm: FunctionComponent<BankFormProps> = ({ form, selectName, id }) => {
  const [searchBank, setSearchBank] = React.useState<string>('');
  const searchDebounce = useDebounce(searchBank, 500);
  const [showSuggestions, setShowSuggestions] = React.useState<boolean>(false);
  const { data, isLoading } = useBankQuery({ search: searchDebounce || undefined });

  React.useEffect(() => {
    const bankInfoId = form.getValues('bankInfoId');

    if (data?.value && bankInfoId) {
      const selectedBank = data.value.find((item) => item.id === bankInfoId);

      if (selectedBank && !searchBank) {
        setSearchBank(selectedBank.shortName);
        setShowSuggestions(false);
      }
    }
  }, [data?.value, form.getValues('bankInfoId')]);

  return (
    <CardBasic className="gap-4">
      <FieldLayout label="Ngân hàng" className="relative">
        <Input
          placeholder="Chọn ngân hàng"
          value={searchBank}
          onChangeText={(text) => {
            if (text.length > 0) {
              setSearchBank(text);
              setShowSuggestions(!!text);
            } else {
              setSearchBank('');
              setShowSuggestions(false);
            }
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 300)}
        />
        {showSuggestions && (
          <View
            className="absolute left-0 mt-1 w-full rounded-lg border border-gray-200 bg-white  shadow-lg"
            style={{ top: '100%', zIndex: 10 }}>
            {isLoading ? (
              <View className="h-20 items-center justify-center">
                <Loading />
              </View>
            ) : (
              <FlatList
                data={data?.value}
                scrollEnabled={false}
                keyboardShouldPersistTaps="handled"
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Pressable
                    className="border-b border-gray-200 "
                    onPress={() => {
                      form.setValue('bankInfoId', item.id);
                      setSearchBank(item.shortName);
                      setShowSuggestions(false);
                      selectName(item.code);
                    }}>
                    <View className="px-4 py-2">
                      <Text>{item.shortName}</Text>
                    </View>
                  </Pressable>
                )}
              />
            )}
          </View>
        )}

        {form.formState.errors.bankInfoId && (
          <Text className="text-red-500">{form.formState.errors.bankInfoId.message}</Text>
        )}
      </FieldLayout>
      <FieldLayout label="Số tài khoản">
        <Controller
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Nhập số thẻ"
              keyboardType="numeric"
              maxLength={19}
              value={
                field.value
                  ? formatCardNumber(field.value)
                  : form.watch('accountNumber')
                    ? formatCardNumber(form.watch('accountNumber'))
                    : ''
              }
              onChangeText={(text) => {
                field.onChange(text.replace(/\s/g, ''));
              }}
            />
          )}
        />
        {form.formState.errors.accountNumber && (
          <Text className="text-red-500">{form.formState.errors.accountNumber.message}</Text>
        )}
      </FieldLayout>
      <FieldLayout label="Tên tài khoản">
        <Controller
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Nhập tên chủ thẻ"
              maxLength={40}
              value={
                field.value
                  ? field.value
                  : form.watch('accountName')
                    ? form.watch('accountName')
                    : ''
              }
              onChangeText={field.onChange}
            />
          )}
        />
        {form.formState.errors.accountName && (
          <Text className="text-red-500">{form.formState.errors.accountName.message}</Text>
        )}
      </FieldLayout>

      <Controller
        control={form.control}
        name="isPrimary"
        render={({ field }) => (
          <View className="flex-row items-center gap-2">
            <Checkbox
              style={{
                borderRadius: 100,
              }}
              value={field.value}
              onValueChange={field.onChange}
              color={COLORS.light.primary}
            />
            <Text>Đặt làm thẻ mặc định</Text>
          </View>
        )}
      />
    </CardBasic>
  );
};

export default BankForm;
