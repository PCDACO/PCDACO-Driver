import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FunctionComponent } from 'react';
import { Pressable } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import Subtitle from '~/components/ui/subtitle';
import { COLORS } from '~/theme/colors';

interface BookHeaderProps {
  onPress?: () => void;
}

const BookHeader: FunctionComponent<BookHeaderProps> = ({ onPress }) => {
  const router = useRouter();

  return (
    <CardBasic className="relative h-16 flex-row items-center justify-center">
      <Pressable
        className="absolute left-4 top-4 h-full w-10 items-center justify-center"
        onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={COLORS.black} />
      </Pressable>
      <Subtitle title="Thông tin đặt xe" />
      <Pressable
        className="absolute right-4 top-4 h-full w-10 items-center justify-center"
        onPress={onPress}>
        <Feather name="more-vertical" size={24} color={COLORS.black} />
      </Pressable>
    </CardBasic>
  );
};

export default BookHeader;
