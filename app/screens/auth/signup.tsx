import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { Text } from '@/ui/text';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
  return (
    <SafeAreaView className="p-5 items-center mt-10 gap-5">
      <Text className='text-lg text-center'>Зарегистрируйте свой аккаунт</Text>
      <Input
        keyboardType="default"
        textContentType="name"
        autoComplete="name"
        placeholder="Имя"
      />
      <Input
        keyboardType="default"
        textContentType="name"
        autoComplete="name"
        placeholder="Фамилия"
      />
      <Input
        keyboardType="email-address"
        textContentType="emailAddress"
        autoComplete="email"
        placeholder="Email"
      />
      <Input
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        autoComplete="tel"
        placeholder="Номер телефона"
        
      />
      <Button>
        <Text>Регистрация</Text>
      </Button>
    </SafeAreaView>
  );
};

export default SignUp;
