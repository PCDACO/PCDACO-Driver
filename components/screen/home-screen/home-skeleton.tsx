import React from 'react';
import { View } from 'react-native';

import Skeleton from '~/components/ui/skeleton';

export const HomeSkeleton = () => {
  return (
    <View className="flex-1 bg-gray-50">
      {/* Welcome Section Skeleton */}
      <View className="bg-white px-4 py-6 shadow-lg">
        <Skeleton width={200} height={32} />
        <Skeleton width={250} height={20} className="mt-2" />
      </View>

      {/* Balance Card Skeleton */}
      <View className="px-4 pt-4">
        <View className="rounded-lg border border-gray-200 bg-white p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Skeleton width={120} height={20} />
              <Skeleton width={150} height={32} className="mt-1" />
            </View>
            <Skeleton width={48} height={48} borderRadius={24} />
          </View>
        </View>
      </View>

      {/* Nearby Cars Section Skeleton */}
      <View className="px-4 pt-4">
        <View className="mb-4 flex-row items-center justify-between">
          <Skeleton width={120} height={24} />
          <Skeleton width={60} height={20} />
        </View>
        <View className="flex-row gap-4">
          {[1, 2, 3].map((item) => (
            <View key={item} className="w-48 overflow-hidden rounded-lg bg-white shadow-sm">
              <Skeleton width="100%" height={112} />
              <View className="p-3">
                <Skeleton width={120} height={20} />
                <Skeleton width={100} height={20} className="mt-1" />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Bookings Section Skeleton */}
      <View className="mb-6 px-4 pt-4">
        <View className="mb-4 flex-row items-center justify-between">
          <Skeleton width={140} height={24} />
          <Skeleton width={60} height={20} />
        </View>
        <View className="gap-2">
          {[1, 2, 3].map((item) => (
            <View key={item} className="rounded-lg bg-white p-4 shadow-sm">
              <View className="flex-row items-start justify-between">
                <View>
                  <Skeleton width={120} height={20} />
                  <Skeleton width={180} height={16} className="mt-1" />
                </View>
                <Skeleton width={80} height={24} borderRadius={12} />
              </View>
              <View className="mt-2 flex-row items-center justify-between">
                <Skeleton width={120} height={16} />
                <Skeleton width={100} height={16} />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Reports Section Skeleton */}
      <View className="mb-6 px-4">
        <View className="mb-4 flex-row items-center justify-between">
          <Skeleton width={140} height={24} />
          <Skeleton width={60} height={20} />
        </View>
        <View className="gap-2">
          {[1, 2, 3].map((item) => (
            <View key={item} className="rounded-lg bg-white p-4 shadow-sm">
              <View className="flex-row items-start justify-between">
                <View>
                  <Skeleton width={120} height={20} />
                  <Skeleton width={180} height={16} className="mt-1" />
                </View>
                <View className="flex-row gap-2">
                  <Skeleton width={60} height={24} borderRadius={12} />
                  <Skeleton width={60} height={24} borderRadius={12} />
                </View>
              </View>
              <View className="mt-2">
                <Skeleton width={120} height={16} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
