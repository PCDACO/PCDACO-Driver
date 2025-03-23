import { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import { cn } from '~/lib/cn';

interface HeaderTitleProps {
  title: string;
  className?: string;
}

const HeaderTitle: FunctionComponent<HeaderTitleProps> = ({ title, className }) => {
  return (
    <View>
      <Text className={cn('text-center text-2xl font-bold', className)}>{title}</Text>
    </View>
  );
};

export default HeaderTitle;
