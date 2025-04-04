import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  useWindowDimensions,
  FlatList,
  ScrollView,
} from 'react-native';

export interface Tab {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  initialTab?: number;
  headerClassName?: string;
  contentClassName?: string;
}

const TabView: React.FC<TabsProps> = ({
  tabs,
  initialTab = 0,
  headerClassName = '',
  contentClassName = '',
}) => {
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const [activeTab, setActiveTab] = useState(initialTab);

  // Handle tab press
  const handleTabPress = (index: number) => {
    setActiveTab(index);
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  // Calculate indicator position
  const translateX = scrollX.interpolate({
    inputRange: tabs.map((_, i) => i * width),
    outputRange: tabs.map((_, i) => (i * width) / tabs.length),
  });

  const renderItem = ({ item, index }: { item: Tab; index: number }) => (
    <View style={{ width }} className="flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}>
        {item.content}
      </ScrollView>
    </View>
  );

  return (
    <View className="flex-1">
      {/* Header Tabs */}
      <View
        className={`relative flex-row border-b border-gray-300 bg-white dark:bg-slate-900 ${headerClassName}`}>
        {tabs.map((tab, index) => (
          <Pressable
            key={tab.key}
            onPress={() => handleTabPress(index)}
            className="flex-1 items-center p-3">
            <Text
              className={`${
                activeTab === index
                  ? 'font-bold text-black dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
              {tab.title}
            </Text>
          </Pressable>
        ))}

        {/* Animated Indicator */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            width: `${100 / tabs.length}%`,
            height: 2,
            backgroundColor: 'black',
            transform: [{ translateX }],
          }}
        />
      </View>

      {/* Content */}
      <View className="flex-1">
        <FlatList
          ref={flatListRef}
          data={tabs}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setActiveTab(index);
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          className={contentClassName}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
      </View>
    </View>
  );
};

export default TabView;
