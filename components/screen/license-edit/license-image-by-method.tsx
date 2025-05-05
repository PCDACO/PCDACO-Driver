import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { useLicenseForm } from '~/hooks/license/use-license-form';
import { cn } from '~/lib/cn';
import Show from '~/lib/show';
import { useStepStore } from '~/store/use-step';
import { COLORS } from '~/theme/colors';

const image = require('~/assets/images/license-ava.png');

interface LicenseImageByMethodProps {
  form: ReturnType<typeof useLicenseForm>['form'];
  prevLicenseBack?: string;
  prevLicenseFront?: string;
  isApproveLicense?: boolean;
  hasLicense: boolean;
}

const LicenseImageByMethod: React.FC<LicenseImageByMethodProps> = ({
  form,
  prevLicenseBack,
  prevLicenseFront,
  isApproveLicense,
  hasLicense,
}) => {
  const { setStep } = useStepStore();
  const [licenseFront, setLicenseFront] = React.useState<string>();
  const [licenseBack, setLicenseBack] = React.useState<string>();

  React.useEffect(() => {
    if (prevLicenseBack && prevLicenseFront) {
      setLicenseBack(prevLicenseBack);
      setLicenseFront(prevLicenseFront);
    }
  }, [prevLicenseBack, prevLicenseFront]);

  React.useEffect(() => {
    const frontImage = form.getValues('licenseImageFront');
    const backImage = form.getValues('licenseImageBack');

    if (frontImage?.uri) {
      setLicenseFront(frontImage.uri);
    }
    if (backImage?.uri) {
      setLicenseBack(backImage.uri);
    }
  }, [form]);

  const hasDoneLicenseFrontForm =
    form.watch('expirationDate') && form.watch('licenseNumber') && form.watch('licenseImageFront');

  const hasDoneLicenseBackForm = form.watch('licenseImageBack');

  const handleUploadFront = React.useCallback(() => {
    if (hasDoneLicenseFrontForm) {
      form.setValue('expirationDate', new Date());
      form.setValue('licenseNumber', '');
      form.setValue('licenseImageFront', undefined);
    }
    setStep(3);
  }, [form, hasDoneLicenseFrontForm]);

  const handleUploadBack = React.useCallback(() => {
    if (hasDoneLicenseBackForm) {
      form.setValue('licenseImageBack', undefined);
    }
    setStep(4);
  }, [form]);

  return (
    <>
      <View
        className={cn(
          'flex-1 items-center justify-start gap-4 px-2 py-4',
          !!form.getValues('licenseImageBack') || prevLicenseBack ? 'mb-20' : 'mb-10'
        )}>
        <View className="items-center justify-center">
          {/* Avatar/Illustration */}
          <Image source={image} style={{ width: 124, height: 124 }} resizeMode="contain" />
          {/* Main instruction */}
          <Text className=" mb-4 text-center text-base font-medium text-gray-700">
            Tải lên bản sao bằng lái xe của bạn để hoàn tất quá trình xác thực.
          </Text>
        </View>
        <Show>
          <Show.When isTrue={hasLicense}>
            <Show.When isTrue={isApproveLicense === true}>
              <View className="w-full flex-row items-center justify-center gap-2 rounded-lg border border-green-400 bg-green-100 p-4">
                <FontAwesome name="drivers-license" size={24} color={COLORS.light.grey3} />
                <Text className="font-semibold text-gray-600">
                  Bằng lái xe của bạn đã được xét duyệt
                </Text>
              </View>
            </Show.When>
            <Show.When isTrue={isApproveLicense === false}>
              <View className="w-full flex-row items-center justify-center gap-2 rounded-lg border border-red-400 bg-red-200 p-4">
                <FontAwesome name="drivers-license" size={24} color={COLORS.light.grey3} />
                <Text className="font-semibold text-gray-600">
                  Bằng lái xe của bạn đã bị từ chối
                </Text>
              </View>
            </Show.When>
            <Show.When isTrue={isApproveLicense === undefined || isApproveLicense === null}>
              <View className="w-full flex-row items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-200 p-4">
                <FontAwesome name="drivers-license" size={24} color={COLORS.light.grey3} />
                <Text className="font-semibold text-gray-600">
                  Bằng lái xe của bạn chưa được xét duyệt
                </Text>
              </View>
            </Show.When>
          </Show.When>
          <Show.When isTrue={!hasLicense}>
            <View className="w-full flex-row items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-200 p-4">
              <FontAwesome name="drivers-license" size={24} color={COLORS.light.grey3} />
              <Text className="font-semibold text-gray-600">
                Cung cấp bằng lái xe để được xét duyệt
              </Text>
            </View>
          </Show.When>
        </Show>
        {/* Upload card */}
        <View className="w-full gap-2">
          <TouchableOpacity
            className={cn(
              'w-full flex-row items-center rounded-xl  p-4',
              hasDoneLicenseFrontForm
                ? 'border border-green-400 bg-green-100'
                : 'border border-gray-200 bg-white'
            )}
            activeOpacity={0.8}
            onPress={handleUploadFront}>
            <MaterialCommunityIcons name="paperclip" size={28} color="#4B5563" />
            <View className="ml-4">
              <Text className="text-base font-semibold">Ảnh bằng lái mặt trước</Text>
              <Text className="text-gray-500">Tải lên</Text>
            </View>
          </TouchableOpacity>

          {licenseFront && (
            <Image
              source={{ uri: licenseFront }}
              className="h-60 w-full rounded-lg"
              resizeMode="stretch"
            />
          )}
        </View>
        <View className="w-full gap-2">
          <TouchableOpacity
            className={cn(
              'w-full flex-row items-center rounded-xl  p-4',
              hasDoneLicenseBackForm
                ? 'border border-green-400 bg-green-100'
                : 'border border-gray-200 bg-white'
            )}
            activeOpacity={0.8}
            onPress={handleUploadBack}>
            <MaterialCommunityIcons name="paperclip" size={28} color="#4B5563" />
            <View className="ml-4">
              <Text className="text-base font-semibold">Ảnh bằng lái mặt sau</Text>
              <Text className="text-gray-500">Tải lên</Text>
            </View>
          </TouchableOpacity>

          {licenseBack && (
            <Image
              source={{ uri: licenseBack }}
              className="h-60 w-full rounded-lg"
              resizeMode="stretch"
            />
          )}
        </View>
      </View>
    </>
  );
};

export default LicenseImageByMethod;
