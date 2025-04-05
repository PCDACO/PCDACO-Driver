import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useCallback } from 'react';
import { Alert, Linking, ToastAndroid } from 'react-native';
import type QRCode from 'react-native-qrcode-svg';

export function useQrCodeDownload(qrRef: React.RefObject<QRCode | null>) {
  const downloadQrCode = useCallback(async () => {
    if (!qrRef.current) {
      Alert.alert('Lỗi', 'Không tìm thấy mã QR');
      return;
    }

    (qrRef.current as any).toDataURL(async (dataURL: string) => {
      try {
        const fileUri = FileSystem.documentDirectory + 'qrcode.png';

        // Lưu base64 thành file ảnh
        await FileSystem.writeAsStringAsync(fileUri, dataURL, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Xin quyền
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Không có quyền', 'Bạn cần cấp quyền để lưu ảnh', [
            {
              text: 'OK',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ]);
          return;
        }

        // Lưu vào thư viện
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync('PCDACO-Driver', asset, false);

        ToastAndroid.show('Đã lưu mã QR vào thư viện ảnh', ToastAndroid.SHORT);
      } catch (error) {
        console.error(error);
        ToastAndroid.show('Không thể lưu mã QR', ToastAndroid.SHORT);
      }
    });
  }, [qrRef]);

  return { downloadQrCode };
}
