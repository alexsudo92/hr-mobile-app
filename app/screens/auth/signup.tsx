import { useRegister, useSignIn } from '@/hooks/userHook';
import { info } from '@/lib/api';
import { handleNetworkError } from '@/lib/errorHandlers';
import { setToken } from '@/lib/storage';
import { useAuthStore } from '@/stores';
import { RegistrationDto } from '@/types';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
  const { signIn, setUserData } = useAuthStore();

  const [mail, setMail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const registerMutation = useRegister();
  const loginMutation = useSignIn();

  const handleRegistration = async () => {
    const data: RegistrationDto = {
      phone: phone,
      email: mail,
      username: name,
      password: password,
    };

    try {
      await registerMutation.mutateAsync(data);
      const token = await loginMutation.mutateAsync({
        email: mail,
        password: password,
      });

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
      <Text className="text-center text-lg">Зарегистрируйте свой аккаунт</Text>
      <Input
        keyboardType="default"
        textContentType="name"
        autoComplete="name"
        placeholder="Фамилия Имя Отчество"
        value={name}
        onChangeText={(e) => setName(e)}
      />
      <Input
        keyboardType="email-address"
        textContentType="emailAddress"
        autoComplete="email"
        placeholder="Email"
        value={mail}
        onChangeText={(e) => setMail(e)}
      />
      <Input
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        autoComplete="tel"
        placeholder="Номер телефона"
        value={phone}
        onChangeText={(e) => setPhone(e)}
      />
      <Input
        keyboardType="default"
        textContentType="password"
        autoComplete="password-new"
        placeholder="Пароль"
        value={password}
        onChangeText={(e) => setPassword(e)}
      />
      <Button onPress={handleRegistration}>
        <Text>Регистрация</Text>
      </Button>
    </SafeAreaView>
  );
};

export default SignUp;
