import { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { Input } from '~/components/layout/input-with-icon/input';
import { useWithdrawForm } from '~/hooks/transaction/use-withdraw-form';

interface WithDrawalFormProps {
  form: ReturnType<typeof useWithdrawForm>['form'];
}

const WithDrawalForm: FunctionComponent<WithDrawalFormProps> = ({ form }) => {
  return (
    <View>
      <FieldLayout label="Số tiền">
        <Controller
          control={form.control}
          name="amount"
          render={({ field }) => (
            <Input
              {...field}
              value={field.value.toString()}
              onChangeText={(text) => {
                if (text.length > 0) {
                  field.onChange(Number(text));
                }
              }}
              placeholder="Nhập số tiền"
              keyboardType="numeric"
            />
          )}
        />
      </FieldLayout>
    </View>
  );
};

export default WithDrawalForm;
