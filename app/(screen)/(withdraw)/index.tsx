import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent } from 'react';

import WithDrawalForm from '~/components/form-ui/with-drawal-form';
import { useWithdrawForm } from '~/hooks/transaction/use-withdraw-form';

const WithdrawScreen: FunctionComponent = () => {
  const { form, onSubmit, isLoading } = useWithdrawForm();
  const { id } = useLocalSearchParams();

  return <WithDrawalForm form={form} onSubmit={onSubmit} isLoading={isLoading} id={id as string} />;
};

export default WithdrawScreen;
