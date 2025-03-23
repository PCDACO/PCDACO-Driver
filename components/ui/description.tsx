import { FunctionComponent } from 'react';
import { Text, TextProps, View } from 'react-native';

import { cn } from '~/lib/cn';

interface DescriptionProps extends TextProps {
  title: string;
  className?: string;
}

const Description: FunctionComponent<DescriptionProps> = ({ title, className, ...props }) => {
  return (
    <View>
      <Text className={cn('text-base text-gray-500', className)} {...props}>
        {title}
      </Text>
    </View>
  );
};

export default Description;
