import { Redirect } from 'expo-router';

import { useAuthStore } from '~/store/auth-store';

export default function Root() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Redirect href="/(main)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
