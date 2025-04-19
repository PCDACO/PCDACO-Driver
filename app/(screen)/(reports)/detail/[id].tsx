import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { ScrollView, View } from 'react-native';

import ReportProofForm from '~/components/form-ui/report-form/report-proof-form';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import Loading from '~/components/plugins/loading';
import TabView, { Tab } from '~/components/plugins/tab-view';
import ReportBasicInfo from '~/components/screen/report-detail/report-basic-info';
import ReportBookInfo from '~/components/screen/report-detail/report-book-info';
import ReportCarInfo from '~/components/screen/report-detail/report-car-info';
import ReportGallery from '~/components/screen/report-detail/report-gallery';
import { Role } from '~/constants/enums';
import { useReportDetailQuery } from '~/hooks/report/use-report';
import { useReportProofForm } from '~/hooks/report/use-report-proof-form';

const ReportDetailScreen: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const { data: report } = useReportDetailQuery({ id: id as string });
  const { form, onSubmit, isLoading } = useReportProofForm({
    id: id as string,
  });

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
    <View className="relative h-full flex-1 bg-slate-100 dark:bg-slate-900 ">
      <ScrollView>
        <View
          className="h-full gap-2 "
          style={{
            paddingBottom: 50,
          }}>
          <TabView tabs={tabs} initialTab={0} contentClassName="bg-gray-50" />
          <View className="gap-2 px-4">
            <ReportBasicInfo
              title={reportDetail?.title || ''}
              reportType={reportDetail?.reportType || 0}
              description={reportDetail?.description || ''}
              reportName={reportDetail?.reporterName || ''}
              status={reportDetail?.status || 0}
            />
            <ReportGallery imageUrls={reportDetail?.imageUrls || []} />
            <ReportProofForm
              form={form}
              role={reportDetail?.reporterRole || ''}
              imageUrl={reportDetail?.compensationDetail?.imageUrl || ''}
              compensationReason={reportDetail?.compensationDetail?.compensationReason || ''}
              compensationAmount={reportDetail?.compensationDetail?.compensationAmount || 0}
              isPaid={reportDetail?.compensationDetail?.isPaid || false}
            />
          </View>
        </View>
      </ScrollView>
      {reportDetail?.reporterRole !== Role.Driver && !reportDetail?.compensationDetail?.isPaid && (
        <View className="absolute bottom-0 left-0 right-0 z-20 bg-white p-4 dark:bg-slate-900">
          <Button onPress={onSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loading size="small" />
                <Text>Đang xử lý...</Text>
              </>
            ) : (
              <Text>Xác nhận</Text>
            )}
          </Button>
        </View>
      )}
    </View>
  );
};

export default ReportDetailScreen;
