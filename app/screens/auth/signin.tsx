import { Authentication } from '@/lib/dtoTypes';
import { info, login } from '@/lib/httpClient';
import { storage } from '@/lib/storage';
import { useAuthStore } from '@/stores';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  const { signIn, setUserData } = useAuthStore();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const data: Authentication = {
      email: mail,
      password: password,
    };

    var token = await login(data);
    var account = await info(token);
    storage.set('token', token);

    setUserData(account);
    signIn();
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
