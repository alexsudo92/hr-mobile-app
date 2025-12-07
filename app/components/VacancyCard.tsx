import { EmploymentType, NavigationProp, VacancyStatus } from '@/types';
import { Button } from '@/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/ui/card';
import { Icon } from '@/ui/icon';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { useNavigation } from '@react-navigation/native';
import { Briefcase, Building, Calendar, MapPin } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import VacancyState from './VacancyState';

interface VacancyCardProps {
  id: string;
  employment: EmploymentType;
  name: string;
  location: string;
  branch: string;
  startSalary: number;
  endSalary: number;
  status: VacancyStatus;
  postDate: Date;
}

const employmentText = (employment: EmploymentType) => {
  switch (employment) {
    case EmploymentType.FullTime:
      return 'Полный рабочий день';
    case EmploymentType.Internship:
      return 'Стажировка';
    case EmploymentType.Remote:
      return 'Удаленная работа';
    case EmploymentType.PartTime:
      return 'Неполный рабочий день';
    default:
      throw new Error('wrong status');
  }
};

const VacancyCard = ({
  id,
  employment,
  name,
  postDate,
  location,
  branch,
  startSalary,
  status,
  endSalary,
}: VacancyCardProps) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Card>
      <CardHeader>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold">{name}</Text>
          <VacancyState status={status}></VacancyState>
        </View>

        <Text className="text-sm font-semibold text-green-600">
          {startSalary.toLocaleString()} ₽ — {endSalary.toLocaleString()} ₽
        </Text>
      </CardHeader>
      <Separator />

      <CardContent className="gap-2 py-2">
        <View className="flex-row items-center gap-2">
          <Icon as={Building} size={20} />
          <Text className="text-sm">{branch}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Icon as={MapPin} size={20} />
          <Text className="text-sm">{location}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Icon as={Briefcase} size={20} />
          <Text className="text-sm">{employmentText(employment)}</Text>
        </View>
      </CardContent>

      <Separator />

      <CardContent>
        <View className="flex-row justify-center gap-1">
          <Button onPress={() => navigation.navigate('vacancyViewer', { id })} className="w-1/2">
            <Text>Просмотр</Text>
          </Button>
          <Button onPress={() => navigation.navigate('vacancyEditor', { id })} className="w-1/2">
            <Text>Управление</Text>
          </Button>
        </View>
      </CardContent>

      <Separator />
      <CardFooter className="justify-between">
        <View className="flex-row items-center gap-1">
          <Icon as={Calendar} size={16}></Icon>
          <Text className="text-sm text-teal-600">Дата публикации:</Text>
        </View>
        <Text className="text-sm text-teal-600">{postDate.toLocaleDateString()}</Text>
      </CardFooter>
    </Card>
  );
};

export default VacancyCard;
