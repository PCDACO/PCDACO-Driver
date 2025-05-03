import { FunctionComponent } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';

import { cn } from '~/lib/cn';

interface SubtitleProps {
  title: string;
  className?: string;
  style?: StyleProp<TextStyle>;
}

const Subtitle: FunctionComponent<SubtitleProps> = ({ title, className, style }) => {
  return (
    <View>
      <Text className={cn('text-lg font-bold', className)} style={style}>
        {title}
      </Text>
    </View>
  );
};

export default Subtitle;
