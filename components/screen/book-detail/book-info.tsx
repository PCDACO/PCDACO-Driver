import { Feather } from '@expo/vector-icons';
import { FunctionComponent } from 'react';
import { View } from 'react-native';

import BookBadgeStatus from '../book-list/book-badge-status';

import CardBasic from '~/components/plugins/card-basic';
import Description from '~/components/ui/description';
import Subtitle from '~/components/ui/subtitle';
import { BookResponseDetail } from '~/constants/models/book.model';
import { DateFormat, formatDateToString, getDuration } from '~/lib/format';
import { COLORS } from '~/theme/colors';

interface BookInfoProps {
  booking: BookResponseDetail['booking'];
}

const BookInfo: FunctionComponent<BookInfoProps> = ({ booking }) => {
  return (
    <CardBasic className="gap-6">
      <View className="flex-row items-center gap-2">
        <Feather name="calendar" size={24} color={COLORS.gray} />
        <Subtitle title="Thông tin đặt xe" />
        <BookBadgeStatus status={booking.status} />
      </View>

      <View className="flex-row gap-2">
        <Feather name="clock" size={24} color={COLORS.gray} />
        <View>
          <Description
            title={`Thời gian thuê (${getDuration(new Date(booking.startTime), new Date(booking.endTime))})`}
          />

          <View className="flex-row">
            <Description title={`Thời gian bắt đầu: `} />
            <Description
              className="font-bold text-foreground"
              title={`${formatDateToString(new Date(booking.startTime), DateFormat.DayTime)}`}
            />
          </View>
          <View className="flex-row">
            <Description title={`Thời gian kết thúc: `} />
            <Description
              className="font-bold text-foreground"
              title={`${formatDateToString(new Date(booking.endTime), DateFormat.DayTime)}`}
            />
          </View>
        </View>
      </View>
    </CardBasic>
  );
};

export default BookInfo;
