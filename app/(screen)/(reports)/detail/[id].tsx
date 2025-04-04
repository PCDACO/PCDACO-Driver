import { useLocalSearchParams } from 'expo-router';
import { FunctionComponent } from 'react';
import { ScrollView, View } from 'react-native';

import TabView, { Tab } from '~/components/plugins/tab-view';
import ReportBasicInfo from '~/components/screen/report-detail/report-basic-info';
import ReportBookInfo from '~/components/screen/report-detail/report-book-info';
import ReportCarInfo from '~/components/screen/report-detail/report-car-info';
import ReportGallery from '~/components/screen/report-detail/report-gallery';
import { useReportDetailQuery } from '~/hooks/report/use-report';

const ReportDetailScreen: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const { data: report } = useReportDetailQuery({ id: id as string });

  const reportDetail = report?.value;

  const tabs: Tab[] = [
    {
      key: 'book-info',
      title: 'Thông tin đặt xe',
      content: (
        <ReportBookInfo
          bookingDetail={
            reportDetail?.bookingDetail || {
              id: '',
              driverId: '',
              driverName: '',
              driverAvatar: '',
              driverPhone: '',
              ownerId: '',
              ownerName: '',
              ownerAvatar: '',
              ownerPhone: '',
              startTime: new Date(),
              endTime: new Date(),
              totalAmount: 0,
              basePrice: 0,
            }
          }
        />
      ),
    },
    {
      key: 'car-info',
      title: 'Thông tin xe',
      content: (
        <ReportCarInfo
          carDetail={
            reportDetail?.carDetail || {
              id: '',
              licensePlate: '',
              modelName: '',
              manufacturerName: '',
              color: '',
              imageUrl: [],
            }
          }
        />
      ),
    },
  ];

  return (
    <View className="relative flex-1 bg-slate-100 dark:bg-slate-900 ">
      <ScrollView>
        <View className="h-full gap-2 pt-4">
          <View className="gap-2 px-4">
            <ReportBasicInfo
              title={reportDetail?.title || ''}
              reportType={reportDetail?.reportType || 0}
              description={reportDetail?.description || ''}
              reportName={reportDetail?.reporterName || ''}
              status={reportDetail?.status || 0}
            />
            <ReportGallery imageUrls={reportDetail?.imageUrls || []} />
          </View>
          <TabView tabs={tabs} initialTab={0} contentClassName="bg-gray-50" />
        </View>
      </ScrollView>
    </View>
  );
};

export default ReportDetailScreen;
