import { Feather } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/Feather';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import CameraTakePicture from '~/components/plugins/camera-take-picture';
import CardBasic from '~/components/plugins/card-basic';
import { AILicensePlatePrevResponse } from '~/constants/models/ai.model';
import { useAiMutation } from '~/hooks/ai/use-ai';
import { useLicenseForm } from '~/hooks/license/use-license-form';
import { convertAssertToFile } from '~/lib/convert';
import { withNoCache } from '~/lib/utils';
import { useApiStore } from '~/store/check-endpoint';

interface RenderLicense {
  image: string;
  onClear: () => void;
  isEdit?: boolean;
  id?: string;
}

const renderLicense: React.FC<RenderLicense> = ({ image, onClear, isEdit = false, id }) => {
  return (
    <View className="relative h-60 rounded-lg border border-gray-200 shadow-lg">
      {(isEdit || !id) && (
        <TouchableOpacity className="absolute right-2 top-2 z-10" onPress={onClear}>
          <Icon name="x-circle" size={20} color="red" />
        </TouchableOpacity>
      )}
      <Image source={{ uri: image }} className=" h-60 w-full rounded-lg object-cover" />
    </View>
  );
};

interface LicensesImageFormProps {
  form: ReturnType<typeof useLicenseForm>['form'];
  licenseImageFront?: string;
  licenseImageBack?: string;
  id?: string;
}

const LicensesImageForm: React.FC<LicensesImageFormProps> = ({
  form,
  licenseImageFront,
  licenseImageBack,
  id,
}) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const { addEndpoint, removeEndpoint } = useApiStore();
  const [licenseFront, setLicenseFront] = React.useState<string | undefined>();
  const [licenseBack, setLicenseBack] = React.useState<string | undefined>();
  const { mutate: aiMutation } = useAiMutation();

  const parseDateString = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    console.log(day, month, year);
    // eslint-disable-next-line radix
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  React.useEffect(() => {
    if (licenseImageFront) {
      setLicenseFront(licenseImageFront);
    }
    if (licenseImageBack) {
      setLicenseBack(licenseImageBack);
    }
  }, [licenseImageFront, licenseImageBack]);

  const handleCaptureFront = React.useCallback(
    (value: any) => {
      setLicenseFront(value.uri);
      const file = convertAssertToFile(value);
      form.setValue('licenseImageFront', file);

      // Call AI mutation to process the image
      aiMutation(file, {
        onSuccess: (response) => {
          if (response.data && response.data.length > 0 && 'id' in response.data[0]) {
            const licenseData = response.data[0] as AILicensePlatePrevResponse;
            // Set the license number and expiration date from AI response
            form.setValue('licenseNumber', licenseData.id);
            form.setValue('expirationDate', parseDateString(licenseData.doe));
            // Trigger form update
            form.trigger(['licenseNumber', 'expirationDate']);
          }
        },
      });
    },
    [aiMutation, form]
  );

  return (
    <CardBasic className="gap-2">
      <View className="flex-row items-center gap-2">
        <Text className="text-2xl font-bold">Hình ảnh giấy phép lái xe</Text>
        {id && (
          <TouchableOpacity
            onPress={() => {
              setIsEdit(!isEdit);
              if (!isEdit) {
                addEndpoint('edit-image');
              } else {
                removeEndpoint('edit-image');
              }
            }}>
            <Feather name="edit" size={16} color={isEdit ? 'blue' : 'gray'} />
          </TouchableOpacity>
        )}
      </View>
      <View className="gap-2">
        <FieldLayout label="Ảnh mặt trước">
          {licenseFront ? (
            renderLicense({
              image: withNoCache(licenseFront),
              isEdit,
              onClear: () => {
                setLicenseFront(undefined);
                form.setValue('licenseImageFront', undefined);
              },
              id,
            })
          ) : (
            <CameraTakePicture
              className="h-32"
              onCapture={handleCaptureFront}
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
              image: withNoCache(licenseBack),
              isEdit,
              onClear: () => {
                setLicenseBack(undefined);
                form.setValue('licenseImageBack', undefined);
              },
              id,
            })
          ) : (
            <CameraTakePicture
              className="h-32"
              onCapture={(value) => {
                setLicenseBack(value.uri);

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
    </CardBasic>
  );
};

export default LicensesImageForm;
