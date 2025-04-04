import { Feather } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { Input } from '~/components/layout/input-with-icon/input';
import CardBasic from '~/components/plugins/card-basic';
import ImagePickerButton from '~/components/plugins/image-picker';
import { BookingReportTypeNumber } from '~/constants/enums';
import { ReportSchemaType } from '~/constants/schemas/report.schema';
import { useReportForm } from '~/hooks/report/use-report-form';
import { convertAssertToFile } from '~/lib/convert';

interface ReportFormProps {
  form: ReturnType<typeof useReportForm>['form'];
  onOpenReportTypeSheet: () => void;
  reportTypes: { value: BookingReportTypeNumber; label: string }[];
}

const ReportForm: FunctionComponent<ReportFormProps> = ({
  form,
  onOpenReportTypeSheet,
  reportTypes,
}) => {
  const [images, setImages] = React.useState<string[]>();
  const [active, setActive] = React.useState<number>(0);
  const [viewWidth, setViewWidth] = React.useState<number>(0);

  const flatlistRef = React.useRef<FlatList<any>>(null);

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActive(viewableItems[0].index + 1);
    } else {
      setActive(0);
    }
  };

  React.useEffect(() => {
    if (form.watch('files')) {
      const files = form.watch('files');
      if (Array.isArray(files)) {
        setImages(files.map((item: any) => item.uri));
      }
    }
  }, [form.watch('files')]);

  const handleRemoveImage = () => {
    setImages(undefined);
    setActive(0);
    form.setValue('files', []);
  };

  return (
    <CardBasic className="py-4">
      <View className="gap-4">
        <FieldLayout label="Tiêu đề">
          <Controller<ReportSchemaType>
            control={form.control}
            name="title"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập tiêu đề"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
          {form.formState.errors.title && (
            <Text className="text-xs text-destructive">{form.formState.errors.title.message}</Text>
          )}
        </FieldLayout>

        <FieldLayout label="Mô tả">
          <Controller<ReportSchemaType>
            control={form.control}
            name="description"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập mô tả"
                value={field.value}
                onChangeText={field.onChange}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            )}
          />
          {form.formState.errors.description && (
            <Text className="text-xs text-destructive">
              {form.formState.errors.description.message}
            </Text>
          )}
        </FieldLayout>

        <FieldLayout label="Loại báo cáo">
          <Controller<ReportSchemaType>
            control={form.control}
            name="reportType"
            render={({ field }) => (
              <TouchableOpacity
                onPress={onOpenReportTypeSheet}
                className="flex-row items-center justify-between rounded-lg border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
                <Text className="text-foreground">
                  {reportTypes.find((type) => type.value === field.value)?.label ||
                    'Chọn loại báo cáo'}
                </Text>
                <Feather name="chevron-down" size={20} color="gray" />
              </TouchableOpacity>
            )}
          />
          {form.formState.errors.reportType && (
            <Text className="text-xs text-destructive">
              {form.formState.errors.reportType.message}
            </Text>
          )}
        </FieldLayout>

        <FieldLayout label="Hình ảnh">
          <View>
            <View
              className="relative"
              onLayout={(event) => setViewWidth(event.nativeEvent.layout.width)}>
              {images?.length !== undefined && (
                <View className="absolute bottom-2 right-2 z-10 rounded-full bg-slate-200 p-2 dark:bg-slate-800">
                  <Text className="text-black">
                    {active}/{images?.length}
                  </Text>
                </View>
              )}
              <FlatList
                ref={flatlistRef}
                data={images}
                keyExtractor={(item) => item}
                horizontal
                onViewableItemsChanged={onViewableItemsChanged}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View className="relative h-60">
                    <Image
                      source={{ uri: item }}
                      style={{ width: viewWidth }}
                      className="h-60 rounded-lg object-cover shadow-lg"
                    />
                    <TouchableOpacity
                      className="absolute right-2 top-2"
                      onPress={handleRemoveImage}>
                      <Feather name="x-circle" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                )}
              />

              {(images?.length === 0 || images?.length === undefined) && (
                <ImagePickerButton
                  onChange={(image) => {
                    setImages(image.map((item) => item.uri));

                    const imageConvert = image.map((item) => convertAssertToFile(item));

                    if (imageConvert.length > 0) {
                      form.setValue('files', imageConvert);
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
            {form.formState.errors.files && (
              <Text className="text-xs text-destructive">
                {form.formState.errors.files.message}
              </Text>
            )}
          </View>
        </FieldLayout>
      </View>
    </CardBasic>
  );
};

export default ReportForm;
