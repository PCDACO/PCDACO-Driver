import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { TextWithIconNoBorder } from '~/components/layout/text-with-icon/text-icon-no-border';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import CardBasic from '~/components/plugins/card-basic';
import NumberStepNext from '~/components/screen/register/number-step-next';
import Subtitle from '~/components/ui/subtitle';
import { useAuthForm } from '~/hooks/auth/use-auth-form';

interface ResultRegisterProps {
  form: ReturnType<typeof useAuthForm>['form'];
}

const ResultRegister: React.FC<ResultRegisterProps> = ({ form }) => {
  return (
    <CardBasic className="flex-1 justify-center gap-6 px-6">
      <View className="items-center justify-center gap-6">
        <View className="rounded-full bg-green-100 p-4 shadow-lg">
          <Feather name="check" size={40} color="green" />
        </View>

        <View className="items-center justify-center gap-2">
          <Text className=" text-2xl font-bold text-foreground">Đăng ký thành công!</Text>
          <Text className=" w-80 text-center text-sm text-muted">
            Tài khoản của bạn đã được tạo thành công. Bạn có thể đăng nhập ngay lập tức.
          </Text>
        </View>
      </View>

      <CardBasic className="gap-2">
        <TextWithIconNoBorder
          icon={<Feather name="user" size={20} color="gray" />}
          text="Tên tài khoản"
          fontSize="lg"
          fontWeight="bold"
        />
        {/* Infor Layout */}
        <InforLayout field="Email" value={form.getValues('email') || ''} />
        <InforLayout field="Tên tài khoản" value={form.getValues('name') || ''} />
        <InforLayout field="Số điện thoại" value={form.getValues('phone') || ''} />
      </CardBasic>

      <View className="h-0.5 w-full bg-gray-200" />

      <View className="gap-2">
        <Subtitle title="Bước kế tiếp" />
        <NumberStepNext
          number={1}
          title="Hoàn thành thông tin cá nhân"
          subtitle="Thêm bằng lái xe vào tài khoản của bạn"
        />
        <NumberStepNext
          number={2}
          title="Đăng ký xe"
          subtitle="Cung cấp thông tin chi tiết về xe của bạn"
        />
        <NumberStepNext
          number={3}
          title="Ký hợp đồng"
          subtitle="Ký tên vào hợp đồng để bắt đầu việc thuê xe"
        />
        <NumberStepNext
          number={4}
          title="Bắt đầu cho thuê xe"
          subtitle="Bắt đầu cho thuê xe và sử dụng xe của bạn"
        />
      </View>

      <View className="gap-1">
        <Button className="w-full" onPress={() => router.push('/license/license-edit')} size="lg">
          <Text className="text-white">Hoàn tất thông tin cá nhân</Text>
          <Feather name="chevron-right" size={18} color="white" />
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          size="lg"
          onPress={() => router.push('/(main)')}>
          <Feather name="home" size={18} color="black" />
          <Text className="text-foreground">Về trang chủ</Text>
        </Button>
      </View>
    </CardBasic>
  );
};

export default ResultRegister;

interface InforLayoutProps {
  field: string;
  value: string;
}

const InforLayout: React.FC<InforLayoutProps> = ({ field, value }) => {
  return (
    <View className="flex-row items-center justify-between gap-2">
      <Text className="text-sm font-semibold text-muted">{field}:</Text>
      <Text className="text-sm font-semibold text-foreground">{value}</Text>
    </View>
  );
};
