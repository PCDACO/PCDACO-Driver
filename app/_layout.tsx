import '../global.css';
import 'expo-dev-client';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const queryClient = new QueryClient();
  // const [location, setLocation] = React.useState<Location.LocationObject | null>(null);
  const [requestPermission] = useCameraPermissions();
  const { requestForegroundPermissionsAsync } = Location;

  const handlerPermission = React.useCallback(() => {
    // request camera permission
    // eslint-disable-next-line no-unused-expressions
    requestPermission;
  }, []);

  React.useEffect(() => {
    requestForegroundPermissionsAsync();
    handlerPermission();
  }, []);

  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ActionSheetProvider>
            <NavThemeProvider value={NAV_THEME[colorScheme]}>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}>
                <Slot />
              </Stack>
            </NavThemeProvider>
          </ActionSheetProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
