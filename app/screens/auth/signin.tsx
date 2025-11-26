import { useAuthStore } from '@/stores';
import { Button, Input, Text } from '@/ui';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  const { signIn } = useAuthStore();

  const onSignIn = () => {
    console.log('auth attempt');

    signIn(true);
  };
  
  return (
    <SafeAreaView className="items-center mt-10 gap-5 p-5">
      <Text className="text-center text-lg">Войдите с помощью электронной почты</Text>
      <Input
        keyboardType="email-address"
        textContentType="emailAddress"
        autoComplete="email"
        placeholder="Email"
      />
      <Button onPress={onSignIn}>
        <Text>Войти</Text>
      </Button>
    </SafeAreaView>
  );
};

export default SignIn;
