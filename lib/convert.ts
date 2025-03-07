import { ImagePickerAsset } from 'expo-image-picker';

export const convertAssertToFile = (file: ImagePickerAsset): File => {
  const uri = file.uri;
  const type = file.mimeType;
  const name = file.fileName;

  return {
    uri,
    name: name || 'image.jpg',
    type: type || 'image/jpeg',
  } as unknown as File;
};
