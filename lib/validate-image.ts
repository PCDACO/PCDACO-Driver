import * as React from 'react';
import { Image, ImageProps } from 'react-native';

export const validateImageUrl = (url: string | undefined | null) => {
  if (!url) {
    return require('~/assets/images/fallback-car.png');
  }

  try {
    new URL(url);
    return { uri: url };
  } catch {
    return require('~/assets/images/fallback-car.png');
  }
};

export function ImageWithFallback(props: ImageProps) {
  const [error, setError] = React.useState(false);
  const fallback = require('~/assets/images/fallback-car.png');

  return (
    <Image
      {...props}
      source={error ? fallback : props.source}
      onError={() => setError(true)}
    />
  );
} 