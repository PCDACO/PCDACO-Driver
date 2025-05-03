import React, { FunctionComponent } from 'react';

import PaymentDetailScreen from '~/components/screen/payment-detail/payment-detail-screen';
import ErrorScreen from '~/components/screen/payment-detail/status/error-screen';
import LoadingScreen from '~/components/screen/payment-detail/status/loading-screen';
import SuccessScreen from '~/components/screen/payment-detail/status/success-screen';
// import { useIsScreenActive } from '~/hooks/plugins/use-is-screen-active';
import { useCheckTransaction } from '~/hooks/transaction/use-transaction';
import { PaymentResponseStore } from '~/store/use-response';

const PaymentScreen: FunctionComponent = () => {
  const [error, setError] = React.useState(false);

  const { response } = PaymentResponseStore();
  const { mutate: checkTransaction, isPending, isSuccess } = useCheckTransaction();

  // useInterval(() => {
  //   checkTransaction(response?.orderCode as number, {
  //     onError: () => {
  //       setError(true);
  //     },
  //   });
  // }, 10000);

  if (isPending) {
    return <LoadingScreen />;
  }

  if (isSuccess) {
    return <SuccessScreen data={{ orderCode: response?.orderCode || 0 }} />;
  }

  if (error) {
    return (
      <ErrorScreen
        onRetry={() => {
          setError(false);
        }}
      />
    );
  }

  return (
    <PaymentDetailScreen
      paymentData={
        response || {
          basePrice: 0,
          excessDays: 0,
          excessFee: 0,
          orderCode: 0,
          platformFee: 0,
          paymentUrl: '',
          qrCode: '',
          totalAmount: 0,
          totalDistance: 0,
        }
      }
      onSubmit={() => {
        checkTransaction(response?.orderCode as number, {
          onError: () => {
            setError(true);
          },
        });
      }}
    />
  );
};

export default PaymentScreen;
