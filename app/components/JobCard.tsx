import { Card, CardContent, CardFooter, CardHeader } from '@/ui/card';
import { Text } from '@/ui/text';
import { Icon } from '@/ui/icon';
import { EmploymentStatus, JobData, JobStatus, Pages } from '@/types';
import React from 'react';
import { View } from 'react-native';
import {
  MapPin,
  Briefcase,
  Building,
} from 'lucide-react-native';
import { Separator } from '@/ui/separator';
import { Button } from '@/ui/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import JobState from './JobState';

interface JobCardProps {
  id: string;
  employment: EmploymentStatus;
  name: string;
  location: string;
  branch: string;
  startSalary: number;
  endSalary: number;
  status: JobStatus;
  postDate: Date;
}

type NavigationProp = NativeStackNavigationProp<Pages>;


const JobCard = ({
  id,
  employment,
  name,
  postDate,
  location,
  branch,
  startSalary,
  status,
  endSalary,
}: JobCardProps) => {
  const navigation = useNavigation<NavigationProp>();

  const employmentText = () => {
    switch (employment) {
      case EmploymentStatus.FullTime:
        return 'Полный рабочий день';
      case EmploymentStatus.Internship:
        return 'Стажировка';
      case EmploymentStatus.Remote:
        return 'Удаленная работа';
      case EmploymentStatus.PartTime:
        return 'Неполный рабочий день';
      default:
        throw new Error('wrong status');
    }
  };

  return (
    <Card>
      <CardHeader>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold">{name}</Text>
          <JobState status={status}></JobState>
        </View>

        <Text className="text-sm font-semibold text-green-600">
          {startSalary} ₽ — {endSalary} ₽
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
          <Text className="text-sm">{employmentText()}</Text>
        </View>
      </CardContent>

      <Separator />

      <CardContent>
        <View className="flex-row justify-center gap-1">
          <Button onPress={() => navigation.navigate('jobViewer', {id})} className="w-1/2">
            <Text>Просмотр</Text>
          </Button>
          <Button onPress={() => navigation.navigate('jobEditor', {id})} className="w-1/2">
            <Text>Управление</Text>
          </Button>
        </View>
      </CardContent>

      <Separator />
      <CardFooter className="justify-end">
        <Text className="text-sm text-teal-600">Опубликовано {postDate.toLocaleDateString()}</Text>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
