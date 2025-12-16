import { useSignOut } from '@/hooks/userHook';
import { handleNetworkError } from '@/lib/errorHandlers';
import { deleteToken, getToken } from '@/lib/storage';
import { useAuthStore } from '@/stores';
import { Roles, UserData } from '@/types';
import { Avatar, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Icon } from '@/ui/icon';
import { Text } from '@/ui/text';
import { AxiosError } from 'axios';
import { ArrowRight, Calendar, Edit2, LogOut, Paperclip, Shield, User } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const roleText = (role: Roles) => {
  switch (role) {
    case Roles.Hr:
      return 'Рекрутер';
    case Roles.BranchHead:
      return 'Глава отдела';
    case Roles.Admin:
      return 'Администратор';
    default:
      throw new Error('wrong role');
  }
};

const Profile = () => {
  const { signOut, data } = useAuthStore();
  const { username, role, avatarUrl } = data as UserData;
  const logoutMutation = useSignOut();

  const handleLogout = async () => {
    const token = getToken();
    if (!token) return;
    try {
      await logoutMutation.mutateAsync(token);
      deleteToken();

      signOut();
    } catch (error) {
      const code = handleNetworkError(error as AxiosError);
      console.log(code);
    }
  };

  return (
    <SafeAreaView edges={{ bottom: 'off', top: 'maximum' }} className="flex-1 p-5">
      <View className="flex-3 items-center">
        <Text className="justify-center text-3xl font-bold">Профиль</Text>
        <Avatar alt={username} className="mt-5 h-32 w-32 border-background">
          <AvatarImage source={{ uri: avatarUrl, cache: 'reload' }} />
        </Avatar>
        <Text className="mt-5 text-2xl font-bold">{username}</Text>
        <Text className="mt-1 text-xl font-thin">{roleText(role)}</Text>
      </View>

      <View className="mt-5 w-full flex-1 gap-2">
        <Button variant="outline" className="justify-between">
          <Icon as={User}></Icon>
          <Text>Профиль</Text>
          <Icon as={Edit2}></Icon>
        </Button>
        <Button variant="outline" className="justify-between">
          <Icon as={Calendar}></Icon>
          <Text>Календарь</Text>
          <Icon as={ArrowRight}></Icon>
        </Button>
        <Button variant="outline" className="justify-between">
          <Icon as={Shield}></Icon>
          <Text>Безопасность</Text>
          <Icon as={ArrowRight}></Icon>
        </Button>
        <Button variant="outline" className="justify-between">
          <Icon as={Paperclip}></Icon>
          <Text>Документы</Text>
          <Icon as={ArrowRight}></Icon>
        </Button>
      </View>

      <View className="flex-1 justify-end">
        <Button onPress={handleLogout} className="justify-between bg-red-700">
          <Icon color={'white'} as={LogOut}></Icon>
          <Text className="font-semibold">Выход</Text>
          <Icon color={'white'} as={ArrowRight}></Icon>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
