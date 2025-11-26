import { useNavigation } from '@react-navigation/native';
import { LogIn } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationProp } from '@/types';
import { Button, Icon, Text } from '@/ui';

const Startup = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView className="flex-1 p-5">
      <View className="flex-1 items-center justify-center">
        <View style={{ borderRadius: 12 }} className="bg-black drop-shadow-xl">
          <Icon color={'white'} as={LogIn} size={90} className="!opacity-100"></Icon>
        </View>
        <Text variant="h3" className="mt-10 text-center">
          Войдите в свою учетную запись
        </Text>
        <Text variant="h3" className="mt-5 text-center">
          Доступ к ней сохранится на вашем устройстве
        </Text>
      </View>

      <View className="flex-2 justify-center gap-3">
        <Button onPress={() => navigation.navigate('signin')}>
          <Text>Вход</Text>
        </Button>
        <Button variant="outline" onPress={() => navigation.navigate('signup')}>
          <Text>Регистрация</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Startup;
