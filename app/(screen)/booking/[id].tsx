import { FontAwesome } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const Booking: FunctionComponent = () => {
  return (
    <SafeAreaView className="relative h-screen bg-slate-100 dark:bg-slate-800">
      <View className="absolute left-4 top-4 z-10">
        <TouchableOpacity>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Booking;
