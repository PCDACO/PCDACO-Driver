import Icon from '@expo/vector-icons/Feather';
// import { useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import { Text } from '../nativewindui/Text';

import { cn } from '~/lib/cn';

interface CameraTakePictureProps {
  onCapture?: (imageUri: ImagePicker.ImagePickerAsset) => void;
  contextInput?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const CameraTakePicture: React.FC<CameraTakePictureProps> = ({
  contextInput,
  className,
  onCapture,
  disabled = false,
}) => {
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to allow camera access.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true, // Cho phép chỉnh sửa ảnh trước khi lấy về
      quality: 1, // Chất lượng ảnh cao nhất
    });

    if (!result.canceled) {
      onCapture && onCapture(result.assets[0]);
    }
  };

  return (
    <TouchableOpacity
      onPress={takePhoto}
      disabled={disabled}
      className={cn(
        ' flex-row items-center justify-center gap-2 rounded-md border border-dashed border-muted p-4',
        className
      )}>
      {!contextInput ? (
        <>
          <Icon name="camera" size={20} color="gray" />
          <Text className="text-muted-foreground">Take picture</Text>
        </>
      ) : (
        contextInput
      )}
    </TouchableOpacity>
  );
};

export default CameraTakePicture;
