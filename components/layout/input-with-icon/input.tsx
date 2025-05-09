import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { cn } from '~/lib/cn';

interface InputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  isFull?: boolean;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ isFull = true, className, placeholderClassName, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <View
        className={cn(
          'flex-row items-center justify-between gap-2 rounded-lg border border-muted p-2',
          isFull ? 'w-full' : 'flex-1'
        )}>
        <View className="flex-1 flex-row items-center gap-2">
          {leftIcon && <View>{leftIcon}</View>}
          <TextInput
            className={cn('w-full placeholder:text-muted ', className)}
            {...props}
            ref={ref}
          />
        </View>
        {rightIcon && <View className="">{rightIcon}</View>}
      </View>
    );
  }
);

Input.displayName = 'Input';

export { Input };
