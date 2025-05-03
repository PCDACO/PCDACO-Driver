import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import LicensesImageForm from '~/components/auth-component/register/licenses-image-form';
import LicensesUserForm from '~/components/auth-component/register/licenses-user-form';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import Header from '~/components/plugins/header';
import LicenseFormSkeleton from '~/components/screen/license-edit/license-sekeleton';
import { useLicensesListQuery } from '~/hooks/license/use-license';
import { useLicenseForm } from '~/hooks/license/use-license-form';

const LicenseEdit = () => {
  const { data, isLoading: isLoadingList } = useLicensesListQuery();

  const { form, onSubmit, isLoading } = useLicenseForm({
    id: data?.value?.userId,
  });

  if (isLoadingList) {
    return (
      <SafeAreaView className="h-screen flex-1">
        <Header title="Đang tải bằng lái..." />
        <LicenseFormSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View className="relative h-screen bg-slate-50 dark:bg-slate-800">
        <Header title={data?.value?.userId ? 'Chỉnh sửa bằng lái xe' : 'Thêm bằng lái xe'} />
        <ScrollView className="h-screen ">
          {/* form */}
          <View className="w-full gap-6 p-4">
            <LicensesUserForm
              form={form}
              licenseNumber={data?.value?.licenseNumber}
              expirationDate={data?.value?.expirationDate}
              id={data?.value?.userId}
            />
            <LicensesImageForm
              form={form}
              licenseImageFront={data?.value?.imageFrontUrl}
              licenseImageBack={data?.value?.imageBackUrl}
              id={data?.value?.userId}
            />
          </View>
        </ScrollView>
        <View className="absolute bottom-2 left-8 right-8">
          <Button onPress={onSubmit} disabled={isLoading}>
            <Text>{isLoading ? 'Đang xử lý...' : 'Xác nhận'}</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LicenseEdit;
