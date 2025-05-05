import React from 'react';
import { View } from 'react-native';

import LoadingAnimation from '~/components/plugins/loading-animation';
import {
  BalanceCard,
  HomeLayout,
  NearbyCarsSection,
  RecentBookingsSection,
  RecentReportsSection,
  WelcomeSection,
} from '~/components/screen/home-screen';
import { UserResponse } from '~/constants/models/user.model';
import { useHomeQueries } from '~/hooks/home/use-home';
import { useLocation } from '~/hooks/plugins/use-location';

const Home = () => {
  const { location } = useLocation();

  const [isRefetching, setIsRefetching] = React.useState(false);
  const { user, cars, bookings, reports, isLoading, refetch } = useHomeQueries({
    location: location!,
  });

  const userData = (user.data?.value as UserResponse) || {};
  const carsData = cars.data?.value?.items || [];
  const bookingsData = bookings.data?.value?.items || [];
  const reportsData = reports.data?.value?.items || [];

  const handleRefetch = async () => {
    try {
      setIsRefetching(true);
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  };

  if (isLoading) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <LoadingAnimation />
      </View>
    );
  }

  return (
    <HomeLayout isRefetching={isRefetching} onRefresh={handleRefetch}>
      <WelcomeSection user={userData} />
      <View className="px-4">
        <BalanceCard user={userData} />
      </View>
      <NearbyCarsSection cars={carsData} />
      <RecentBookingsSection bookings={bookingsData} />
      <RecentReportsSection reports={reportsData} />
    </HomeLayout>
  );
};

export default Home;
