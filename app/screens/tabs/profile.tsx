import { View } from 'react-native';
import React from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import {
  ArrowRight,
  Bell,
  Calendar,
  Edit2,
  LogOut,
  Paperclip,
  Shield,
  User,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/stores';

const Profile = () => {
  const { logOut } = useAuthStore();

  const onLogOut = () => {
    console.log('logout attempt');

    logOut(false);
  };

  return (
    <SafeAreaView edges={{ bottom: 'off', top:'maximum'}} className="flex-1 p-5">
      <View className="flex-3 items-center">
        <Text className="justify-center text-3xl font-bold">Profile</Text>
        <Avatar alt="@mrzachnugent" className="mt-5 h-32 w-32 border-background">
          <AvatarImage source={{ uri: 'https://github.com/mrzachnugent.png' }} />
        </Avatar>
        <Text className="mt-5 text-2xl font-bold">Firstname SecondName</Text>
        <Text className="mt-1 text-xl font-thin">Role</Text>
      </View>

      <View className="mt-5 w-full flex-1 gap-2">
        <Button variant="outline" className="justify-between">
          <Icon as={User}></Icon>
          <Text>Edit profile</Text>
          <Icon as={Edit2}></Icon>
        </Button>
        <Button variant="outline" className="justify-between">
          <Icon as={Calendar}></Icon>
          <Text>View calendar</Text>
          <Icon as={ArrowRight}></Icon>
        </Button>
        <Button variant="outline" className="justify-between">
          <Icon as={Shield}></Icon>
          <Text>Security</Text>
          <Icon as={ArrowRight}></Icon>
        </Button>
        <Button variant="outline" className="justify-between">
          <Icon as={Bell}></Icon>
          <Text>Notifications</Text>
          <Icon as={ArrowRight}></Icon>
        </Button>
        <Button variant="outline" className="justify-between">
          <Icon as={Paperclip}></Icon>
          <Text>Documents</Text>
          <Icon as={ArrowRight}></Icon>
        </Button>
      </View>

      <View className="flex-1 justify-end">
        <Button variant='destructive' onPress={() => onLogOut()} className="justify-between">
          <Icon color={'white'} as={LogOut}></Icon>
          <Text className="font-semibold">Logout</Text>
          <Icon color={'white'} as={ArrowRight}></Icon>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
