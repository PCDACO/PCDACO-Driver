import { Feather } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/Feather';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import CameraTakePicture from '~/components/plugins/camera-take-picture';
import { useLicenseForm } from '~/hooks/license/use-license-form';
import { convertAssertToFile } from '~/lib/convert';
import { useApiStore } from '~/store/check-endpoint';

interface RenderLicense {
  image: string;
  onClear: () => void;
  isEdit?: boolean;
  id?: string;
}

const renderLicense: React.FC<RenderLicense> = ({ image, onClear, isEdit = false, id }) => {
  return (
    <View className="relative h-60">
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

  React.useEffect(() => {
    if (licenseImageFront) {
      setLicenseFront(licenseImageFront);
    }
    if (licenseImageBack) {
      setLicenseBack(licenseImageBack);
    }
  }, [licenseImageFront, licenseImageBack]);

  return (
    <View className="gap-2">
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
            <Feather name="edit" size={24} color={isEdit ? 'blue' : 'gray'} />
          </TouchableOpacity>
        )}
      </View>
      <View className="gap-2">
        <FieldLayout label="Ảnh mặt trước">
          {licenseFront ? (
            renderLicense({
              image: licenseFront,
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
              onCapture={(value) => {
                setLicenseFront(value.uri);

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
    </View>
  );
};

export default LicensesImageForm;
