import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import UserForm from '~/components/form-ui/user/user-form';
import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import Header from '~/components/plugins/header';
import { SomethingError } from '~/components/screen/something-error';
import Skeleton from '~/components/ui/skeleton';
import { useUserDetailQuery } from '~/hooks/user/use-user';
import { useUserForm } from '~/hooks/user/use-user-form';

const UserDetail: React.FC = () => {
  const { id } = useLocalSearchParams();
  const [isEditing, setIsEditing] = React.useState(false);

  const { data, isLoading, error } = useUserDetailQuery(id as string);
  const { form, onSubmit, isLoading: isFormLoading, isSuccess } = useUserForm({ id: id as string });

  const user = data?.value;

  if (isLoading) {
    return (
      <SafeAreaView>
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
      </SafeAreaView>
    );
  }

  if (error || !user) {
    return <SomethingError />;
  }

  return (
    <SafeAreaView>
      <Header
        title="Thông tin cá nhân"
        children={
          <View>
            {isEditing ? (
              <TouchableOpacity
                onPress={async () => {
                  onSubmit();
                  if (isSuccess) {
                    setIsEditing(!isEditing);
                  }
                }}>
                <Feather name="check" size={24} color="black" />
              </TouchableOpacity>
            ) : (
              <>
                {isFormLoading ? (
                  <ActivityIndicator size="small" color="black" />
                ) : (
                  <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                    <Feather name="edit" size={24} color="black" />
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        }
      />

      <View className="mt-4 px-4">
        <UserForm
          isEditing={isEditing}
          form={form}
          value={{
            name: user?.name ?? '',
            email: user?.email ?? '',
            address: user?.address ?? '',
            dateOfBirth: user?.dateOfBirth ?? new Date(),
            phone: user?.phone ?? '',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserDetail;
