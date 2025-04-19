import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import Loading from '~/components/plugins/loading';
import TabView, { Tab } from '~/components/plugins/tab-view';
import PostInspection from '~/components/screen/inspection-view/post-inspection';
import PreInspection from '~/components/screen/inspection-view/pre-inspection';
import { useBookingDetailQuery } from '~/hooks/book/use-book';

const ViewInspectionScreen: FunctionComponent = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: bookingDetail, isLoading } = useBookingDetailQuery(id as string);

  const bookDetail = bookingDetail?.value;

  const postInspectionPhotos = bookDetail?.booking.postInspectionPhotos;
  const preInspectionPhotos = bookDetail?.booking.preInspectionPhotos;

  const tab: Tab[] = [
    {
      title: 'Trước khi đi',
      key: 'pre',
      content: (
        <PreInspection
          preInspectionPhotos={
            preInspectionPhotos || {
              carKey: [],
              exteriorCar: [],
              fuelGauge: [],
              parkingLocation: [],
              trunkSpace: [],
            }
          }
        />
      ),
    },
    {
      title: 'Sau khi đi',
      key: 'post',
      content: (
        <PostInspection
          postInspectionPhotos={
            postInspectionPhotos || {
              fuelGaugeFinalPhotos: [],
              cleanlinessPhotos: [],
              scratchesPhotos: [],
              tollFeesPhotos: [],
            }
          }
        />
      ),
    },
  ];

  if (isLoading) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <Loading />
      </View>
    );
  }

  return (
    <View className="h-full flex-1">
      <TabView tabs={tab} />
    </View>
  );
};

export default ViewInspectionScreen;
