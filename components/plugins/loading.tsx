import { View } from 'react-native';

import { ActivityIndicator } from '../nativewindui/ActivityIndicator';

interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
}

const Loading = ({ size = 'large', color = '#0000ff' }: LoadingProps) => {
  return (
    <View className="items-center justify-center">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;
