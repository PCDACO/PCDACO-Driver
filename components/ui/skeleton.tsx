import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';

import { cn } from '~/lib/cn';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: any;
  className?: string;
}

const Skeleton = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style,
  className,
}: SkeletonProps) => {
  const [opacity, setOpacity] = useState(0.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity((prev) => (prev === 0.4 ? 0.3 : 0.4));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <LinearGradient
      colors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      className={cn('"overflow-hidden"', className)}
      style={[{ width, height, borderRadius, opacity }, style]}
    />
  );
};

export default Skeleton;
