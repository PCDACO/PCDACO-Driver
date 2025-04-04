import { Feather, Foundation } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/nativewindui/Avatar';
import { Text } from '~/components/nativewindui/Text';
import CardBasic from '~/components/plugins/card-basic';
import Description from '~/components/ui/description';
import Subtitle from '~/components/ui/subtitle';
import { ReportDetailResponse } from '~/constants/models/report.model';
import { DateFormat, formatDateToString, formatPhoneNumber, formatPriceToVND } from '~/lib/format';
import { COLORS } from '~/theme/colors';

interface ReportBookInfoProps {
  bookingDetail: ReportDetailResponse['bookingDetail'];
}

const ReportBookInfo: FunctionComponent<ReportBookInfoProps> = ({ bookingDetail }) => {
  const {
    driverAvatar,
    driverName,
    driverPhone,
    ownerAvatar,
    ownerName,
    ownerPhone,
    startTime,
    endTime,
    totalAmount,
    basePrice,
  } = bookingDetail;

  return (
    <CardBasic className="mb-4 gap-4">
      <View className="gap-2">
        <Subtitle title="Thông tin đặt xe" />
        <View className="flex-row items-center gap-2">
          <Avatar alt={ownerName}>
            <AvatarImage source={{ uri: ownerAvatar }} />
            <AvatarFallback>
              <Text>ownerName.charAt(0)</Text>
            </AvatarFallback>
          </Avatar>

          <View>
            <Subtitle className="text-base" title={`${ownerName} - Chủ sở hữu xe`} />
            <View className="flex-row items-center gap-1">
              <Feather name="phone" size={12} color={COLORS.gray} />
              <Description className="text-md" title={formatPhoneNumber(ownerPhone)} />
            </View>
          </View>
        </View>
      </View>

      <View className="h-0.5 bg-slate-200 dark:bg-slate-800" />

      <View className="flex-row items-center gap-2">
        <Avatar alt={driverName}>
          <AvatarImage source={{ uri: driverAvatar }} />
          <AvatarFallback>
            <Text>driverName.charAt(0)</Text>
          </AvatarFallback>
        </Avatar>

        <View>
          <Subtitle className="text-base" title={`${driverName} - Tài xế`} />
          <View className="flex-row items-center gap-1">
            <Feather name="phone" size={12} color={COLORS.gray} />
            <Description className="text-md" title={formatPhoneNumber(driverPhone)} />
          </View>
        </View>
      </View>

      <View className="h-0.5 bg-slate-200 dark:bg-slate-800" />

      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <FieldLayout className="text-md" label="Thời gian bắt đầu">
            <View className="flex-row items-center gap-2">
              <Feather name="calendar" size={16} color={COLORS.gray} />
              <Description
                className="text-md"
                title={formatDateToString(new Date(startTime), DateFormat.DayTime)}
              />
            </View>
          </FieldLayout>
        </View>

        <View className="flex-1">
          <FieldLayout className="text-md" label="Thời gian kết thúc">
            <View className="flex-row items-center gap-2">
              <Feather name="calendar" size={16} color={COLORS.gray} />
              <Description
                className="text-md"
                title={formatDateToString(new Date(endTime), DateFormat.DayTime)}
              />
            </View>
          </FieldLayout>
        </View>
      </View>

      <View className="h-0.5 bg-slate-200 dark:bg-slate-800" />

      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <FieldLayout className="text-md" label="Tổng tiền">
            <View className="flex-row items-center gap-2">
              <Foundation name="dollar" size={20} color={COLORS.gray} />
              <Description className="text-md" title={formatPriceToVND(totalAmount)} />
            </View>
          </FieldLayout>
        </View>

        <View className="flex-1">
          <FieldLayout className="text-md" label="Giá gốc">
            <View className="flex-row items-center gap-2">
              <Foundation name="dollar" size={20} color={COLORS.gray} />
              <Description className="text-md" title={formatPriceToVND(basePrice)} />
            </View>
          </FieldLayout>
        </View>
      </View>
    </CardBasic>
  );
};

export default ReportBookInfo;
