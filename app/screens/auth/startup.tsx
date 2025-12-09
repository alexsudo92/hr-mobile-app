import { useNavigation } from '@react-navigation/native';
import { LogIn } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useUserInfo } from '@/hooks/userHook';
import { deleteToken, getToken } from '@/lib/storage';
import { useAuthStore } from '@/stores';
import { NavigationProp } from '@/types';
import { Button } from '@/ui/button';
import { Icon } from '@/ui/icon';
import { Text } from '@/ui/text';

const Startup = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setUserData, signIn, signOut } = useAuthStore();
  const [initializing, setInitializing] = useState(true);

  const [localToken, setLocalToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = getToken();
    if (savedToken) {
      setLocalToken(savedToken);
    }
    setInitializing(false);
  }, []);

  const { data, isError } = useUserInfo(localToken);

  useEffect(() => {
    if (localToken && data) {
      setUserData(data);
      signIn();
    } else if (localToken && isError) {
      deleteToken();
      signOut();
    }
  }, [localToken, data, isError, setUserData, signIn, signOut]);

  if (initializing) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="black"></ActivityIndicator>
      </SafeAreaView>
    );
  }

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
