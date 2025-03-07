import Icon from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import FieldLayout from '~/components/layout/form/field-layout';
import { Text } from '~/components/nativewindui/Text';
import CameraTakePicture from '~/components/plugins/camera-take-picture';
import { useLicenseForm } from '~/hooks/license/use-license-form';
import { convertAssertToFile } from '~/lib/convert';

interface RenderLicense {
  image: ImagePicker.ImagePickerAsset;
  onClear: () => void;
}

const renderLicense: React.FC<RenderLicense> = ({ image, onClear }) => {
  return (
    <View className="relative h-60">
      <Icon
        name="x-circle"
        size={20}
        color="red"
        className="absolute right-2 top-2 z-10"
        onPress={onClear}
      />
      <Image source={{ uri: image.uri }} className=" h-60 w-full rounded-lg object-cover" />
    </View>
  );
};

interface LicensesImageFormProps {
  form: ReturnType<typeof useLicenseForm>['form'];
}

const LicensesImageForm: React.FC<LicensesImageFormProps> = ({ form }) => {
  const [licenseFront, setLicenseFront] = React.useState<ImagePicker.ImagePickerAsset | undefined>(
    form.watch('licenseImageFront')
  );
  const [licenseBack, setLicenseBack] = React.useState<ImagePicker.ImagePickerAsset | undefined>(
    form.watch('licenseImageBack')
  );

  return (
    <View className="w-full gap-6">
      <Text variant="largeTitle" color="secondary">
        Hình ảnh giấy phép lái xe
      </Text>
      <ScrollView className="h-96">
        <View className="gap-2">
          <FieldLayout label="Ảnh mặt trước">
            {licenseFront ? (
              renderLicense({
                image: licenseFront,
                onClear: () => {
                  setLicenseFront(undefined);
                  form.setValue('licenseImageFront', undefined);
                },
              })
            ) : (
              <CameraTakePicture
                className="h-32"
                onCapture={(value) => {
                  setLicenseFront(value);

                  form.setValue('licenseImageFront', convertAssertToFile(value));
                }}
                contextInput={
                  <>
                    <Icon name="camera" size={20} color="gray" />
                    <Text className="text-foreground">Ảnh mặt trước</Text>
                  </>
                }
              />
            )}

            {form.formState.errors.licenseImageFront && (
              <Text className="text-destructive">
                {form.formState.errors.licenseImageFront?.message?.toString()}
              </Text>
            )}
          </FieldLayout>
          <FieldLayout label="Ảnh mặt sau">
            {licenseBack ? (
              renderLicense({
                image: licenseBack,
                onClear: () => {
                  setLicenseBack(undefined);
                  form.setValue('licenseImageBack', undefined);
                },
              })
            ) : (
              <CameraTakePicture
                className="h-32"
                onCapture={(value) => {
                  setLicenseBack(value);

                  form.setValue('licenseImageBack', convertAssertToFile(value));
                }}
                contextInput={
                  <>
                    <Icon name="camera" size={20} color="gray" />
                    <Text className="text-foreground">Ảnh mặt sau</Text>
                  </>
                }
              />
            )}
            {form.formState.errors.licenseImageBack && (
              <Text className="text-destructive">
                {form.formState.errors.licenseImageBack.message?.toString()}
              </Text>
            )}
          </FieldLayout>
        </View>
      </ScrollView>
    </View>
  );
};

export default LicensesImageForm;
