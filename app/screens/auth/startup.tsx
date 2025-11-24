import React from 'react';
import { View } from 'react-native';
import { LogIn } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Pages } from '@/types';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';

type NavigationProp = NativeStackNavigationProp<Pages>;

const Startup = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView className="flex-1 p-5">
      <View className="flex-1 items-center justify-center">
        <View style={{ borderRadius: 12 }} className="bg-black drop-shadow-xl">
          <Icon color={'white'} as={LogIn} size={90} className="!opacity-100"></Icon>
        </View>
        <Text variant="h3" className="mt-10 text-center">
          Sign in to your account
        </Text>
        <Text variant="h3" className="mt-5 text-center">
          Your access will stay on your device
        </Text>
      </View>

      <View className="flex-2 justify-center gap-3">
        <Button onPress={() => navigation.navigate('signin')}>
          <Text>Sign in</Text>
        </Button>
        <Button variant="outline" onPress={() => navigation.navigate('signup')}>
          <Text>Sign up</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Startup;
