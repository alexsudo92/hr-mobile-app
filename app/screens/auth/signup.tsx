import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
  return (
    <SafeAreaView className="p-5 items-center flex-1 gap-5">
      <Text className='text-lg text-center mb-5'>Sign up with your email and phone number</Text>
      <Input
        keyboardType="default"
        textContentType="name"
        autoComplete="name"
        placeholder="Full name"
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
        placeholder="Phone number"
        
      />
      <Button>
        <Text>Sign up</Text>
      </Button>
    </SafeAreaView>
  );
};

export default SignUp;
