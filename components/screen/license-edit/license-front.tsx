import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Dimensions,
} from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { Input } from '~/components/layout/input-with-icon/input';
import { Button } from '~/components/nativewindui/Button';
import CameraTakePicture from '~/components/plugins/camera-take-picture';
import ImagePickerButton from '~/components/plugins/image-picker';
import { AILicensePlatePrevResponse } from '~/constants/models/ai.model';
import { useAiMutation } from '~/hooks/ai/use-ai';
import { useLicenseForm } from '~/hooks/license/use-license-form';
import { cn } from '~/lib/cn';
import { convertAssertToFile } from '~/lib/convert';
import { DateFormat, formatDateToString } from '~/lib/format';
import { useLicenseMethodStore } from '~/store/use-license-method';
import { useStepStore } from '~/store/use-step';
import { COLORS } from '~/theme/colors';

const { height: HeightScreen } = Dimensions.get('screen');

interface LicenseFrontProps {
  form: ReturnType<typeof useLicenseForm>['form'];
}

const LicenseFront: FunctionComponent<LicenseFrontProps> = ({ form }) => {
  const [licenseFront, setLicenseFront] = React.useState<string | undefined>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const { prevStep } = useStepStore();

  const { method } = useLicenseMethodStore();
  const { mutate: aiMutation } = useAiMutation();

  const parseDateString = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    // eslint-disable-next-line radix
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  const handleImageSelect = React.useCallback(
    (value: any) => {
      const file = convertAssertToFile(value);

      // Call AI mutation to process the image
      aiMutation(file, {
        onSuccess: (response) => {
          console.log('reponse', response);
          if (response.data && response.data.length > 0) {
            const licenseData = response.data[0] as AILicensePlatePrevResponse;

            if (!/[aA]/.test(licenseData.class)) {
              form.setValue('licenseNumber', licenseData.id);
              form.setValue('expirationDate', parseDateString(licenseData.doe));
              form.setValue('licenseImageFront', file);

              setLicenseFront(value.uri);

              // Trigger form update
              form.trigger(['licenseNumber', 'expirationDate']);
            } else {
              ToastAndroid.show('Vui lòng cung cấp bằng lái xe hơi!', ToastAndroid.BOTTOM);
            }
          }
        },
        onError: () => {
          ToastAndroid.show('Vui lòng chọn ảnh bằng lái', ToastAndroid.BOTTOM);
        },
      });
    },
    [aiMutation, form]
  );

  const handleSubmit = React.useCallback(async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    prevStep();
    setLoading(false);
  }, []);

  return (
    <View
      className="relative flex-1 gap-4 px-2 py-4"
      style={{
        height: HeightScreen - 140,
      }}>
      <View>
        {form.formState.errors.licenseImageFront && (
          <Text className="text-destructive">
            {form.formState.errors.licenseImageFront?.message?.toString()}
          </Text>
        )}
        {licenseFront || form.getValues('licenseImageFront') ? (
          <View className="relative rounded-xl border-b-2 border-l-4 border-b-green-400 border-l-green-400 p-0.5">
            <Image
              source={{ uri: licenseFront || form.getValues('licenseImageFront').uri }}
              className="h-60 w-full rounded-lg object-cover"
            />
            <TouchableOpacity
              className="absolute right-2 top-2"
              onPress={() => {
                setLicenseFront(undefined);
                form.setValue('licenseImageFront', undefined);
                form.setValue('expirationDate', new Date());
                form.setValue('licenseNumber', '');
                form.trigger(['licenseImageFront', 'expirationDate', 'licenseNumber']);
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

      {form.getValues('expirationDate') && form.getValues('licenseNumber') && (
        <View className="gap-4">
          <FieldLayout label="Số seri">
            <Controller
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || ''}
                  leftIcon={<MaterialIcons name="123" size={24} color={COLORS.light.foreground} />}
                  placeholder="Nhập số giấy phép"
                  keyboardType="number-pad"
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
          </FieldLayout>
          <FieldLayout label="Ngày hết hạn">
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <View className="flex-row items-center gap-2 rounded-lg border border-muted px-2 py-3">
                <Ionicons name="calendar" size={20} color={COLORS.light.foreground} />
                <Controller
                  control={form.control}
                  name="expirationDate"
                  render={({ field }) => (
                    <Text
                      className={cn(
                        'flex-1 text-sm ',
                        field.value ? 'text-foreground' : 'text-muted'
                      )}>
                      {field.value
                        ? formatDateToString(field.value || new Date(), DateFormat.Day)
                        : 'Chọn ngày hết hạn'}
                    </Text>
                  )}
                />
              </View>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={form.getValues('expirationDate') || new Date()}
                mode="date"
                minimumDate={new Date()}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(_, date) => {
                  setShowDatePicker(false);
                  form.setValue('expirationDate', date || new Date());
                }}
              />
            )}
          </FieldLayout>
        </View>
      )}

      <View className="absolute bottom-0 left-0 right-0">
        <Button
          className="py-4"
          size="lg"
          disabled={!licenseFront || loading}
          onPress={handleSubmit}>
          <Text className="font-semibold text-background">Tiếp tục thêm hình ảnh</Text>
        </Button>
      </View>
    </View>
  );
};

export default LicenseFront;
