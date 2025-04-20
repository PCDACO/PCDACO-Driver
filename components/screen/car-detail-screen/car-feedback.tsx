import { AntDesign } from '@expo/vector-icons';
import { FunctionComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/nativewindui/Avatar';
import { CarResponseDetail } from '~/constants/models/car.model';
import { getTimeAgo } from '~/lib/format';

interface CarFeedbackProps {
  feedbacks: CarResponseDetail['feedbacks'];
}

const CarFeedback: FunctionComponent<CarFeedbackProps> = ({ feedbacks }) => {
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <AntDesign
          key={index}
          name={index < rating ? 'star' : 'star'}
          size={16}
          color={index < rating ? '#F59E0B' : '#D1D5DB'}
        />
      ));
  };

  return (
    <FieldLayout label="Đánh giá">
      <ScrollView className="max-h-96">
        {feedbacks.length > 0 ? (
          <View className="gap-4">
            {feedbacks.map((feedback, index) => (
              <View
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <Avatar className="h-8 w-8" alt={feedback.userName}>
                      {feedback.userAvatar ? (
                        <AvatarImage source={{ uri: feedback.userAvatar }} />
                      ) : (
                        <AvatarFallback>
                          <Text className="font-semibold text-gray-600">
                            {feedback.userName.charAt(0).toUpperCase()}
                          </Text>
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <View>
                      <Text className="font-medium text-gray-800 dark:text-gray-200">
                        {feedback.userName}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {getTimeAgo(new Date(feedback.createdAt))}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row gap-1">{renderStars(feedback.rating)}</View>
                </View>
                {feedback.content && (
                  <Text className="mt-3 text-gray-600 dark:text-gray-300">{feedback.content}</Text>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
            <Text className="text-center text-gray-500">Chưa có đánh giá nào</Text>
          </View>
        )}
      </ScrollView>
    </FieldLayout>
  );
};

export default CarFeedback;
