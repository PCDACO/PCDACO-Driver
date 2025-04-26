import { useQueries } from '@tanstack/react-query';
import * as Location from 'expo-location';

import { QueryKey } from '~/lib/query-key';
import { BookService } from '~/services/book.service';
import { CarService } from '~/services/car.service';
import { ReportService } from '~/services/report.service';
import { UserService } from '~/services/user.service';

interface HomeQueriesProps {
  location: Location.LocationObject;
}

export const useHomeQueries = ({ location }: HomeQueriesProps) => {
  const [user, cars, bookings, reports] = useQueries({
    queries: [
      { queryKey: [QueryKey.User.Current], queryFn: () => UserService.get.current() },
      {
        queryKey: [QueryKey.Car.List],
        queryFn: () =>
          CarService.get.list({
            latitude: location!.coords.latitude,
            longtitude: location!.coords.longitude,
            radius: 10,
            size: 3,
          }),
      },
      {
        queryKey: [QueryKey.Booking.get.List],
        queryFn: () =>
          BookService.get.list({
            index: 1,
            size: 3,
          }),
      },
      { queryKey: [QueryKey.Report.List], queryFn: () => ReportService.get.list() },
    ],
  });

  return {
    user,
    cars,
    bookings,
    reports,
    isLoading: user.isLoading || cars.isLoading || bookings.isLoading || reports.isLoading,
    refetch: async () => {
      await user.refetch();
      await cars.refetch();
      await bookings.refetch();
      await reports.refetch();
    },
  };
};
