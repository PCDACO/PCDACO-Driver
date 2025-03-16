import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PasswordForm from '~/components/form-ui/user/password-form';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import Header from '~/components/plugins/header';
import Loading from '~/components/plugins/loading';
import { usePasswordForm } from '~/hooks/user/use-password-form';

const PasswordScreen: React.FC = () => {
  const { id } = useLocalSearchParams();
  const { form, onSubmit, isLoading, isDone } = usePasswordForm({ id: id as string });

  return (
    <SafeAreaView>
      <Header title="Thay đổi mật khẩu" />

      <View className="items-center justify-center p-4">
        <PasswordForm form={form} />
        <View className="mt-4 w-full">
          <Button
            onPress={onSubmit}
            disabled={isLoading}
            className="items-center justify-center gap-2">
            {isDone ? (
              <Feather name="check" size={24} color="white" />
            ) : (
              <>
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    <Feather name="check" size={24} color="white" />
                    <Text>Cập nhật</Text>
                  </>
                )}
              </>
            )}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PasswordScreen;
