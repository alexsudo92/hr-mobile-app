import { ScrollView, View } from 'react-native';
import React from 'react';
import { EmploymentStatus, JobData } from '@/types';
import { Text } from '@/ui/text';
import { Card, CardHeader, CardContent, CardFooter } from '@/ui/card';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@/ui/icon';
import { Briefcase, Building, Clock, Edit, MapPin, Timer } from 'lucide-react-native';
import { Separator } from '@/ui/separator';
import { useJobStore } from '@/stores';
import JobState from '@/app/components/JobState';

const employmentText = (employment: EmploymentStatus) => {
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

const Viewer = ({ route }: any) => {
  const { getJob } = useJobStore();

  const {
    name,
    status,
    startSalary,
    endSalary,
    description,
    postDate,
    endDate,
    education,
    requirements,
    location,
    branch,
    employment,
    workHours,
    tags,
  }: JobData = getJob(route.params.id);

  return (
    <SafeAreaView className="p-5" edges={{ bottom: 'maximum' }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-2">
        <Card>
          <CardHeader className="flex flex-row">
            <View className="flex-1">
              <Text className="text-2xl font-semibold">{name}</Text>
              <Separator />
              <JobState className="my-2" status={status} />
              <Separator />
              <Text className="text-lg font-medium text-green-600">
                {startSalary} ₽ — {endSalary} ₽
              </Text>
            </View>
            <Icon className="w-fit self-center" as={Edit} size={35} />
          </CardHeader>
        </Card>
        <Card>
          <CardContent className="gap-2">
            <View className="flex-row items-center gap-2">
              <Icon as={Building} size={20} />
              <Text className="text-sm">Отдел: {branch}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Icon as={MapPin} size={20} />
              <Text className="text-sm">Город: {location}</Text>
            </View>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Text className="text-lg font-semibold">Описание</Text>
          </CardHeader>
          <Separator />
          <CardContent>
            <Text className="text-sm">{description}</Text>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Text className="text-lg font-semibold">Даты найма</Text>
          </CardHeader>
          <Separator />
          <CardContent>
            <Text className="text-sm">
              Вакансия открыта: <Text className="font-bold">{postDate.toLocaleDateString()}</Text>
            </Text>
            <Text className="text-sm">
              Вакансия закроется: <Text className="font-bold">{endDate.toLocaleDateString()}</Text>
            </Text>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Text className="text-lg font-semibold">Требования</Text>
          </CardHeader>
          <Separator />
          <CardContent>
            <Text className="text-sm">• {education}</Text>
            {requirements.map((x, i) => (
              <Text key={i} className="text-sm">
                • {x}
              </Text>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Text className="text-lg font-semibold">Рабочий график</Text>
          </CardHeader>
          <Separator />
          <CardContent className="gap-2">
            <View className="flex-row items-center gap-2">
              <Icon as={Briefcase} size={20} />
              <Text className="text-sm">{employmentText(employment)}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Icon as={Clock} size={20} />
              <Text className="text-sm">{workHours} часов в неделю</Text>
            </View>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Text className="text-lg font-semibold">Тэги</Text>
          </CardHeader>
          <Separator />
          <CardContent className="flex-row flex-wrap gap-1">
            {tags.map((x, i) => (
              <View key={i} className="w-fit flex-row items-center rounded-xl bg-black px-3 py-1">
                <Text className="font-semibold text-white">{x}</Text>
              </View>
            ))}
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Viewer;
