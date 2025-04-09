import React, { useEffect, useRef, useState } from 'react';
import { StyleProp, TextInput, TextStyle } from 'react-native';

import { HStack } from './Stack';

import { cn } from '~/lib/cn';
import { COLORS } from '~/theme/colors';

interface OTPInputProps {
  length?: number;
  value?: string;
  onOTPChange?: (OTP: string) => void;
  isClear?: boolean;
  className?: string;
  style?: StyleProp<TextStyle>;
  selectionColor?: string;
}

export const OTPInput = ({
  length = 4,
  value = '',
  onOTPChange,
  isClear = false,
  className,
  style,
  selectionColor = COLORS.dark.foreground,
}: OTPInputProps) => {
  const [otp, setOTP] = useState<string[]>(Array(length).fill(''));
  const [timer, setTimer] = useState(60);
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (value) {
      const newOTP = value.split('').slice(0, length);
      while (newOTP.length < length) {
        newOTP.push('');
      }
      setOTP(newOTP);
    }
  }, [value, length]);

  useEffect(() => {
    if (isClear) {
      const clearedOTP = Array(length).fill('');
      setOTP(clearedOTP);
      inputs.current[0]?.focus();
      if (onOTPChange) {
        onOTPChange(clearedOTP.join(''));
      }
    }
  }, [isClear, length, onOTPChange]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (onOTPChange) {
      onOTPChange(newOTP.join(''));
    }
  };

  const handleKeyPress = (e: { nativeEvent: { key: string } }, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newOTP = [...otp];
      if (index > 0 && !newOTP[index]) {
        newOTP[index - 1] = '';
        setOTP(newOTP);
        inputs.current[index - 1]?.focus();
      } else {
        newOTP[index] = '';
        setOTP(newOTP);
      }

      if (onOTPChange) {
        onOTPChange(newOTP.join(''));
      }
    }
  };

  return (
    <HStack className="justify-between">
      {otp.map((char, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          value={char}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          selectionColor={selectionColor}
          className={cn(
            'h-14 w-12 rounded-lg border border-border bg-white pl-5 text-xl font-bold text-primary',
            className
          )}
          style={style}
        />
      ))}
    </HStack>
  );
};
