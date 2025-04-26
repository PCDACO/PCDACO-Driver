import React from 'react';
import { View, Text } from 'react-native';

import { UserResponse } from '~/constants/models/user.model';
import { translate } from '~/lib/translate';

interface WelcomeSectionProps {
  user: UserResponse;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ user }) => {
  return (
    <View className="bg-white px-4 py-6 shadow-lg dark:bg-black">
      <Text className="text-2xl font-bold text-gray-900">
        {translate.home.welcome}, {user.name || 'Tài xế'}!
      </Text>
      <Text className="mt-2 text-gray-600">{translate.home.welcomeSubtitle}</Text>
    </View>
  );
};
