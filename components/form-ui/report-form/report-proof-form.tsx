import { Feather } from '@expo/vector-icons';
import { FunctionComponent, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import CardBasic from '~/components/plugins/card-basic';
import ImagePickerButton from '~/components/plugins/image-picker';
import { useReportProofForm } from '~/hooks/report/use-report-proof-form';
import { convertAssertToFile } from '~/lib/convert';

interface ReportProofFormProps {
  form: ReturnType<typeof useReportProofForm>['form'];
}

const ReportProofForm: FunctionComponent<ReportProofFormProps> = ({ form }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleRemoveImage = () => {
    setImage(null);
    form.setValue('images', null);
  };

  return (
    <CardBasic>
      <FieldLayout label="Chứng từ bồi thường">
        <View>
          <View className="relative">
            {image && (
              <View className="relative h-60">
                <Image
                  source={{ uri: image }}
                  className="h-60 w-full rounded-lg object-cover shadow-lg"
                />
                <TouchableOpacity className="absolute right-2 top-2" onPress={handleRemoveImage}>
                  <Feather name="x-circle" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}

            {!image && (
              <ImagePickerButton
                onChange={(images) => {
                  if (images.length > 0) {
                    const file = convertAssertToFile(images[0]);
                    if (file) {
                      setImage(images[0].uri);
                      form.setValue('images', file);
                    }
                  }
                }}
                contextInput={
                  <View className="items-center gap-2 py-4">
                    <Feather name="camera" size={24} color="black" />
                    <View className="items-center">
                      <Text className="text-lg font-bold">Chọn ảnh</Text>
                      <Text className="text-sm text-gray-500">Tối thiểu 1 hình ảnh</Text>
                    </View>
                  </View>
                }
              />
            )}
          </View>
          {form.formState.errors.images?.message && (
            <Text className="text-xs text-destructive">
              {String(form.formState.errors.images.message)}
            </Text>
          )}
        </View>
      </FieldLayout>
    </CardBasic>
  );
};

export default ReportProofForm;
