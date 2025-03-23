import { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import { cn } from '~/lib/cn';

interface SubtitleProps {
  title: string;
  className?: string;
}

const Subtitle: FunctionComponent<SubtitleProps> = ({ title, className }) => {
  return (
    <View>
      <Text className={cn('text-lg font-bold', className)}>{title}</Text>
    </View>
  );
};

export default Subtitle;
