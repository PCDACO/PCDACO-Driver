import { Ionicons } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Button } from '~/components/nativewindui/Button';
import CameraTakePicture from '~/components/plugins/camera-take-picture';
import ImagePickerButton from '~/components/plugins/image-picker';
import { useLicenseForm } from '~/hooks/license/use-license-form';
import { convertAssertToFile } from '~/lib/convert';
import { useLicenseMethodStore } from '~/store/use-license-method';
import { useStepStore } from '~/store/use-step';

interface LicenseBackProps {
  form: ReturnType<typeof useLicenseForm>['form'];
}

const LicenseBack: FunctionComponent<LicenseBackProps> = ({ form }) => {
  const { method } = useLicenseMethodStore();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [licenseBack, setLicenseBack] = React.useState<string | undefined>();
  const { setStep } = useStepStore();

  const handleImageSelect = React.useCallback((value: any) => {
    const file = convertAssertToFile(value);

    form.setValue('licenseImageBack', file);
    setLicenseBack(value.uri);
  }, []);

  const handleSubmit = React.useCallback(async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setStep(2); // <-- Bây giờ chỉ chạy sau khi chờ 2s
    setLoading(false);
  }, []);

  return (
    <View
      className="relative flex-1 gap-4 px-2 py-4"
      style={{
        height: 730,
      }}>
      <View>
        {form.formState.errors.licenseImageBack && (
          <Text className="text-destructive">
            {form.formState.errors.licenseImageBack?.message?.toString()}
          </Text>
        )}
        {licenseBack || form.getValues('licenseImageBack') ? (
          <View className="relative rounded-xl border-b-2 border-l-4 border-b-green-400 border-l-green-400 p-0.5">
            <Image
              source={{ uri: licenseBack || form.getValues('licenseImageBack').uri }}
              className="h-60 w-full rounded-lg object-cover"
            />
            <TouchableOpacity
              className="absolute right-2 top-2"
              onPress={() => {
                setLicenseBack(undefined);
                form.setValue('licenseImageBack', undefined);
              }}>
              <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ) : method === 'camera' ? (
          <CameraTakePicture
            onCapture={handleImageSelect}
            contextInput={
              <View className="h-40 items-center justify-center">
                <Ionicons name="camera" size={24} color="gray" />
                <Text className="text-foreground">Nhấn để chụp ảnh</Text>
              </View>
            }
          />
        ) : (
          <ImagePickerButton
            onChange={(images) => handleImageSelect(images[0])}
            contextInput={
              <View className="h-40 items-center justify-center">
                <Ionicons name="images" size={24} color="gray" />
                <Text className="text-foreground">Nhấn để chọn ảnh</Text>
              </View>
            }
          />
        )}
      </View>
      <View className="absolute bottom-0 left-0 right-0">
        <Button
          className="py-4"
          size="lg"
          disabled={!licenseBack || loading}
          onPress={handleSubmit}>
          <Text className="font-semibold text-background">Tiếp tục thêm hình ảnh</Text>
        </Button>
      </View>
    </View>
  );
};

export default LicenseBack;
