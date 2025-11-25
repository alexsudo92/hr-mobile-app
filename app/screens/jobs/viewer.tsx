import { ScrollView, View } from 'react-native';
import React from 'react';
import { JobData } from '@/types';
import { Text } from '@/ui/text';
import { Card, CardHeader, CardContent, CardFooter } from '@/ui/card';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@/ui/icon';
import { Building, Edit, MapPin } from 'lucide-react-native';
import { Separator } from '@/ui/separator';
import { useJobStore } from '@/stores';
import JobState from '@/app/components/JobState';

const Viewer = ({ route }: any) => {
  const { getData } = useJobStore();

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
  }: JobData = getData(route.params.id);

  return (
    <SafeAreaView className="p-5" edges={{ bottom: 'maximum' }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-2">
        <Card>
          <CardHeader className="flex flex-row">
            <View className="flex-1">
              <Text className="text-2xl font-semibold">
                {name}
                <JobState status={status} />
              </Text>
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
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Viewer;
