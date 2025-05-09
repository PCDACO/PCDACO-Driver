import { AntDesign, Feather } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import Description from '~/components/ui/description';
import Subtitle from '~/components/ui/subtitle';
import { Role } from '~/constants/enums';
import { BookResponseDetail } from '~/constants/models/book.model';
import { useFeedbackForm } from '~/hooks/feedback/use-feedback-form';
import { COLORS } from '~/theme/colors';

interface FeedbackCardProps {
  id: string;
  feedback?: BookResponseDetail['feedbacks'];
}

const FeedbackCard: FunctionComponent<FeedbackCardProps> = ({ id, feedback }) => {
  const { form, onSubmit, isLoading } = useFeedbackForm(id);

  const hasDriverFeedback = feedback?.some((f) => f.role === Role.Driver);

  return (
    <CardBasic>
      <Subtitle title="Đánh giá về xe" />
      <Description
        className="text-sm"
        title="Chia sẻ kinh nghiệm của bạn với người thuê xe này để giúp đỡ những chủ xe khác."
      />

      <View className="mt-4">
        {feedback?.map((feedback, index) => (
          <View
            key={index}
            className="mb-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <View className="flex-row items-center justify-between">
              <Text className="font-medium">{feedback.role}</Text>
              <View className="flex-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <AntDesign
                    key={star}
                    name={star <= feedback.rating ? 'star' : 'star'}
                    size={16}
                    color={star <= feedback.rating ? '#FACC15' : COLORS.light.grey5}
                  />
                ))}
              </View>
            </View>
            <Text className="mt-2 text-sm">{feedback.content || 'Không có nhận xét'}</Text>
          </View>
        ))}
      </View>

      {!hasDriverFeedback && (
        <>
          <View className="mt-4">
            <Text className="mb-2 text-base font-medium">Đánh giá của bạn</Text>
            <Controller
              control={form.control}
              name="rating"
              render={({ field: { value, onChange } }) => (
                <View className="flex-row justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => onChange(star)} className="p-2">
                      <AntDesign
                        name={star <= value ? 'star' : 'star'}
                        size={32}
                        color={star <= value ? '#FACC15' : COLORS.light.grey5}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            />
            {form.formState.errors.rating && (
              <Text className="mt-1 text-xs text-destructive">
                {form.formState.errors.rating.message}
              </Text>
            )}
          </View>

          <View className="mt-4">
            <Text className="mb-2 text-base font-medium">Nhận xét chi tiết</Text>
            <Controller
              control={form.control}
              name="comment"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  className="min-h-[100px] rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                  placeholder="Hãy chia sẻ trải nghiệm của bạn..."
                  value={value}
                  onChangeText={onChange}
                  multiline
                  textAlignVertical="top"
                  returnKeyType="done"
                  blurOnSubmit
                  style={Platform.OS === 'android' ? { textAlignVertical: 'top' } : undefined}
                />
              )}
            />
            {form.formState.errors.comment && (
              <Text className="mt-1 text-xs text-destructive">
                {form.formState.errors.comment.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={onSubmit}
            disabled={isLoading || !form.formState.isValid}
            className={`mt-4 flex-row items-center justify-center gap-2 rounded-lg bg-primary p-2 ${
              (isLoading || !form.formState.isValid) && 'opacity-50'
            }`}>
            {isLoading ? (
              <>
                <Feather name="loader" size={20} color={COLORS.white} />
                <Text className="text-background">Đang gửi...</Text>
              </>
            ) : (
              <>
                <Feather name="send" size={20} color={COLORS.white} />
                <Text className="text-background">Gửi đánh giá</Text>
              </>
            )}
          </TouchableOpacity>
        </>
      )}
    </CardBasic>
  );
};

export default FeedbackCard;
