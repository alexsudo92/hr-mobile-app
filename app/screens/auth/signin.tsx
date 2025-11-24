import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {useAuthStore} from '@/stores';

const SignIn = () => {
  const { signIn } = useAuthStore();

  const onSignIn = () => {
    console.log('auth attempt');

    signIn(true);
  };
  
  return (
    <SafeAreaView className="items-center mt-10 gap-5 p-5">
      <Text className="text-center text-lg">Sign in with your email or phone number</Text>
      <Input
        keyboardType="email-address"
        textContentType="emailAddress"
        autoComplete="email"
        placeholder="Email or phone number"
      />
      <Button onPress={onSignIn}>
        <Text>Sign in</Text>
      </Button>
    </SafeAreaView>
  );
};

export default SignIn;
