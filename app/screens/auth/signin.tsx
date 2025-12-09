import { useSignIn } from '@/hooks/userHook';
import { info } from '@/lib/api';
import { handleNetworkError } from '@/lib/errorHandlers';
import { setToken } from '@/lib/storage';
import { useAuthStore } from '@/stores';
import { AuthenticationDto } from '@/types';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  const { signIn, setUserData } = useAuthStore();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useSignIn();

  const handleLogin = async () => {
    const data: AuthenticationDto = {
      email: mail,
      password: password,
    };

    try {
      const token = await loginMutation.mutateAsync(data);
      if (!token) {
        throw new Error('No token');
      }

      const account = await info(token);
      if (!account) {
        throw new Error('No user');
      }

      setToken(token);
      setUserData(account);
      signIn();
    } catch (error) {
      const code = handleNetworkError(error as AxiosError);
      console.log(code);
    }
  };

  return (
    <SafeAreaView className="mt-10 items-center gap-5 p-5">
      <Text className="text-center text-lg">Войдите с помощью электронной почты</Text>
      <Input
        keyboardType="email-address"
        textContentType="emailAddress"
        autoComplete="email"
        placeholder="Email"
        value={mail}
        onChangeText={(e) => setMail(e)}
      />
      <Input
        keyboardType="default"
        textContentType="password"
        autoComplete="password-new"
        placeholder="Пароль"
        value={password}
        onChangeText={(e) => setPassword(e)}
      />
      <Button onPress={handleLogin}>
        <Text>Войти</Text>
      </Button>
    </SafeAreaView>
  );
};

export default SignIn;
