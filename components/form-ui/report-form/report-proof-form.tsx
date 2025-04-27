import { Feather } from '@expo/vector-icons';
import { FunctionComponent, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import CardBasic from '~/components/plugins/card-basic';
import ImagePickerButton from '~/components/plugins/image-picker';
import { Role } from '~/constants/enums';
import { useReportProofForm } from '~/hooks/report/use-report-proof-form';
import { convertAssertToFile } from '~/lib/convert';

interface ReportProofFormProps {
  form: ReturnType<typeof useReportProofForm>['form'];
  role: string;
  imageUrl: string;
  compensationReason: string;
  compensationAmount: number;
  isPaid: boolean;
}

const ReportProofForm: FunctionComponent<ReportProofFormProps> = ({
  form,
  role,
  imageUrl,
  compensationReason,
  compensationAmount,
  isPaid,
}) => {
  const [image, setImage] = useState<string | null>(imageUrl);

  const handleRemoveImage = () => {
    setImage(null);
    form.setValue('images', null);
  };

  const renderImage = () => {
    if (imageUrl) {
      return (
        <View>
          <Image
            source={{ uri: imageUrl }}
            className="h-60 w-full rounded-lg object-cover shadow-lg"
          />
        </View>
      );
    } else {
      return (
        <View className="h-60 w-full items-center justify-center gap-2 rounded-lg bg-gray-200 dark:bg-gray-800">
          <Feather name="image" size={40} color="gray" />
          <Text className="text-center text-sm text-gray-500">Chưa có chứng từ bồi thường</Text>
        </View>
      );
    }
  };

  return (
    <CardBasic className="mb-10 gap-2">
      <FieldLayout label="Chứng từ bồi thường">
        <View className="gap-2">
          <RenderInfo label="Lý do bồi thường" value={compensationReason} />
          <RenderInfo label="Số tiền bồi thường" value={compensationAmount.toString()} />
          <RenderInfo label="Trạng thái" value={isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'} />
        </View>
      </FieldLayout>
      {role !== Role.Driver && !isPaid ? (
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
      ) : (
        renderImage()
      )}
    </CardBasic>
  );
};

export default ReportProofForm;

interface RenderInfoProps {
  label: string;
  value: string;
}

const RenderInfo: FunctionComponent<RenderInfoProps> = ({ label, value }) => {
  return (
    <View className="flex-row items-center justify-between gap-2">
      <Text className="text-sm font-medium text-gray-500">{label}</Text>
      <Text className="text-sm">{value}</Text>
    </View>
  );
};
