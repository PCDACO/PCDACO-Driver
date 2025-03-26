import { Feather } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import Description from '~/components/ui/description';
import { BookResponseList } from '~/constants/models/book.model';
import { DateFormat, formatDateToString } from '~/lib/format';
import { COLORS } from '~/theme/colors';

interface BookBodyProps {
  startTime: BookResponseList['startTime'];
  endTime: BookResponseList['endTime'];
  actualReturnTime: BookResponseList['actualReturnTime'];
}

const BookBody: FunctionComponent<BookBodyProps> = ({ startTime, endTime, actualReturnTime }) => {
  return (
    <View className="gap-2">
      <View className="flex-row items-center gap-2">
        <Feather name="calendar" size={24} color={COLORS.gray} />
        <View>
          <Description title="Ngày bắt đầu" className="text-sm" />
          <Description
            className="font-bold text-foreground"
            title={formatDateToString(new Date(startTime), DateFormat.DayTime)}
          />
        </View>
      </View>
      <View className="flex-row items-center gap-2">
        <Feather name="calendar" size={24} color={COLORS.gray} />
        <View>
          <Description title="Ngày kết thúc" className="text-sm" />
          <Description
            className="font-bold text-foreground"
            title={formatDateToString(new Date(endTime), DateFormat.DayTime)}
          />
        </View>
      </View>
      <View className="flex-row items-center gap-2">
        <Feather name="clock" size={24} color={COLORS.gray} />
        <View>
          <Description title="Thời gian thực trả xe" className="text-sm" />
          <Description
            className="font-bold text-foreground"
            title={formatDateToString(new Date(actualReturnTime), DateFormat.DayTime)}
          />
        </View>
      </View>
    </View>
  );
};

export default BookBody;
