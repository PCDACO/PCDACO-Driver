import { useFocusEffect } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, RefreshControl, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import Header from '~/components/plugins/header';
import LoadingAnimation from '~/components/plugins/loading-animation';
import ChooseMethod from '~/components/screen/license-edit/choose-method';
import LicenseBack from '~/components/screen/license-edit/license-back';
import LicenseFront from '~/components/screen/license-edit/license-front';
import LicenseImageByMethod from '~/components/screen/license-edit/license-image-by-method';
import { useLicensesListQuery } from '~/hooks/license/use-license';
import { useLicenseForm } from '~/hooks/license/use-license-form';
import { useStepStore } from '~/store/use-step';

const LicenseEdit = () => {
  const [isRefetching, setIsRefreshing] = React.useState<boolean>(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const { data, isLoading: isLoadingList, refetch } = useLicensesListQuery();
  const { step, prevStep, resetStep } = useStepStore();

  const licenseData = data && data.value;
  const hasLicense = !!data;

  const {
    form,
    onSubmit,
    isLoading: isLoadingForm,
  } = useLicenseForm({
    id: data?.value?.userId,
  });

  useEffect(() => {
    if (!isLoadingList) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoadingList, fadeAnim]);

  useFocusEffect(
    React.useCallback(() => {
      resetStep();
      form.reset();
    }, [resetStep, form])
  );

  const formValues = form.watch();
  const isFormComplete = React.useMemo(() => {
    const isComplete = !!(
      formValues.expirationDate &&
      formValues.licenseNumber &&
      formValues.licenseImageBack &&
      formValues.licenseImageFront
    );
    return isComplete;
  }, [formValues]);

  if (isLoadingList) {
    return (
      <SafeAreaView className="h-full flex-1 bg-slate-50 dark:bg-slate-800">
        <Header title="Đang tải bằng lái..." />
        <View className="flex-1 items-center justify-center">
          <LoadingAnimation />
        </View>
        {/* <LicenseFormSkeleton /> */}
      </SafeAreaView>
    );
  }

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  const title = (step: number) => {
    switch (step) {
      case 3:
        return 'Mặt trước';
      case 4:
        return 'Mặt sau';
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <Animated.View className="flex-1 bg-slate-50 dark:bg-slate-800" style={{ opacity: fadeAnim }}>
        <Header title={title(step) ?? ''} />
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />}>
          {/* form */}
          <View className="w-full flex-1 gap-6 p-2">
            {step === 1 && <ChooseMethod />}
            {step === 2 && (
              <LicenseImageByMethod
                form={form}
                prevLicenseBack={licenseData?.imageBackUrl}
                prevLicenseFront={licenseData?.imageFrontUrl}
                isApproveLicense={licenseData?.isApproved}
                hasLicense={hasLicense}
              />
            )}
            {step === 3 && <LicenseFront form={form} />}
            {step === 4 && <LicenseBack form={form} />}
          </View>
        </ScrollView>
        {step === 2 && (
          <View className="absolute bottom-0 left-0 right-0 z-10 flex-row items-center justify-center gap-2 bg-background px-4 py-2">
            <View className="flex-1">
              <Button
                className="py-4"
                size="lg"
                onPress={prevStep}
                variant="outline"
                disabled={isLoadingForm}>
                <Text className="font-semibold text-foreground">Thay đổi phương thức</Text>
              </Button>
            </View>
            <View className="flex-1">
              <Button
                className="py-4"
                size="lg"
                onPress={onSubmit}
                disabled={isLoadingForm || !isFormComplete}>
                <Text className="font-semibold text-white">
                  {isLoadingForm ? 'Đang xử lí ...' : 'Xác nhận hoàn thành'}
                </Text>
              </Button>
            </View>
          </View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

export default LicenseEdit;
