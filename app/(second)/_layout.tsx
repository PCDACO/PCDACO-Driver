import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

import BankAccount from './bank-account';
import Transaction from './transaction';

import { COLORS } from '~/theme/colors';

const Tab = createBottomTabNavigator();

function HomeButton() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.replace('/(main)/home')} style={{ marginRight: 16 }}>
      <Ionicons name="home" size={24} color={COLORS.dark.background} />
    </TouchableOpacity>
  );
}

function GoBackButton() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 16 }}>
      <Ionicons name="arrow-back" size={24} color={COLORS.dark.background} />
    </TouchableOpacity>
  );
}

export default function SecondLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitleAlign: 'center',

        headerLeft: () => <GoBackButton />,
        headerRight: () => <HomeButton />, // Thêm nút Home
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Transaction') {
            iconName = 'swap-horizontal';
          } else if (route.name === 'BankAccount') {
            iconName = 'card';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#007AFF',
        tabBarStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          paddingTop: 4,
          paddingHorizontal: 12,
        },
        tabBarButton: (props) => {
          // @ts-ignore toi qua met moi roi
          const newProps: TouchableOpacityProps = {
            ...props,
            delayLongPress: props.delayLongPress ?? undefined,
            activeOpacity: 1,
            disabled: props.disabled ?? undefined,
            onBlur: props.onBlur ?? undefined,
          };
          return <TouchableOpacity {...newProps} />;
        },
      })}>
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarLabel: 'Giao dịch',
          title: 'Lịch sử giao dịch',
        }}
      />
      <Tab.Screen
        name="BankAccount"
        component={BankAccount}
        options={{
          tabBarLabel: 'Ngân hàng',
          title: 'Tài khoản ngân hàng',
        }}
      />
    </Tab.Navigator>
  );
}
