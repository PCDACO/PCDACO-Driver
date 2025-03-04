import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { cn } from '~/lib/cn';

interface InputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = ({ leftIcon, rightIcon, className, ...props }) => {
  return (
    <View className=" w-full flex-row items-center justify-between gap-2 rounded-lg border border-muted p-2">
      <View className="w-72 flex-row items-center gap-2">
        {leftIcon && <View>{leftIcon}</View>}
        <TextInput className={cn('w-full placeholder:text-muted', className)} {...props} />
      </View>
      {rightIcon && <View className="">{rightIcon}</View>}
    </View>
  );
};

export default Input;
