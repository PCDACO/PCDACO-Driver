import React from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface QrCodeWithCornersProps {
  value: string;
  size?: number;
  qrRef?: React.RefObject<QRCode | null>;
}

export default function QrCodeWithCorners({ value, size = 200, qrRef }: QrCodeWithCornersProps) {
  const cornerSize = 24;
  const borderWidth = 4;

  return (
    <View
      className="relative items-center justify-center"
      style={{
        width: size + 20,
        height: size + 20,
      }}>
      {/* Top Left */}
      <View
        className="absolute border-l-black border-t-black"
        style={{
          top: 0,
          left: 0,
          width: cornerSize,
          height: cornerSize,
          borderTopWidth: borderWidth,
          borderLeftWidth: borderWidth,
          borderTopLeftRadius: 6,
        }}
      />
      {/* Top Right */}
      <View
        className="absolute border-r-black border-t-black"
        style={{
          top: 0,
          right: 0,
          width: cornerSize,
          height: cornerSize,
          borderTopWidth: borderWidth,
          borderRightWidth: borderWidth,
          borderTopRightRadius: 6,
        }}
      />
      {/* Bottom Left */}
      <View
        className="absolute border-b-black border-l-black"
        style={{
          bottom: 0,
          left: 0,
          width: cornerSize,
          height: cornerSize,
          borderBottomWidth: borderWidth,
          borderLeftWidth: borderWidth,
          borderBottomLeftRadius: 6,
        }}
      />
      {/* Bottom Right */}
      <View
        className="absolute border-b-black border-r-black"
        style={{
          bottom: 0,
          right: 0,
          width: cornerSize,
          height: cornerSize,
          borderBottomWidth: borderWidth,
          borderRightWidth: borderWidth,
          borderBottomRightRadius: 6,
        }}
      />

      {/* QR Code nằm ở giữa */}
      <View className="rounded-lg bg-white p-2">
        <QRCode
          getRef={(ref) => {
            if (ref && qrRef) {
              qrRef.current = ref;
            }
          }}
          value={value}
          size={size}
          backgroundColor="white"
          color="black"
        />
      </View>
    </View>
  );
}
