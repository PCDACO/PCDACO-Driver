import * as Location from 'expo-location';
import React from 'react';
import { ToastAndroid } from 'react-native';

export const useLocation = () => {
  const [location, setLocation] = React.useState<Location.LocationObject | null>(null);

  React.useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        ToastAndroid.show('Xin hãy cấp quyền truy cập vị trí', ToastAndroid.SHORT);
        return;
      }

      const response = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 10,
      });
      setLocation(response);
    }

    getCurrentLocation();
  }, []);

  return { location };
};
