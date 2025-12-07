import VacancyState from '@/app/components/VacancyState';
import { employmentText, getPlural } from '@/lib/utils';
import { useVacancyStore } from '@/stores';
import { NavigationProp, VacancyData } from '@/types';
import { Card, CardContent, CardHeader } from '@/ui/card';
import { Icon } from '@/ui/icon';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { useNavigation } from '@react-navigation/native';
import { Briefcase, Building, Clock, Edit, MapPin } from 'lucide-react-native';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Viewer = ({ route }: any) => {
  const { getVacancy } = useVacancyStore();
  const navigation = useNavigation<NavigationProp>();

  const {
    id,
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
    tasks,
    features,
    experience,
  }: VacancyData = getVacancy(route.params.id);

  return (
    <SafeAreaView className="p-5" edges={{ bottom: 'maximum' }}>
      <TouchableOpacity
        className="absolute left-[90%] top-[90%] z-10"
        onPress={() => navigation.navigate('vacancyEditor', { id })}>
        <View className="size-14 items-center justify-center rounded-full bg-amber-700 shadow-md">
          <Icon size={35} className="color-white" as={Edit} />
        </View>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-2">
        <Card>
          <CardHeader className="flex flex-row">
            <Text className="text-2xl font-semibold">{name}</Text>
          </CardHeader>
          <Separator />
          <CardContent>
            <VacancyState status={status} />
          </CardContent>
          <Separator />
          <CardContent>
            <Text className="text-lg font-medium text-green-600">
              {startSalary.toLocaleString()} ₽ — {endSalary.toLocaleString()} ₽
            </Text>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="gap-2">
            <View className="flex-row gap-2">
              <Icon as={Building} size={20} />
              <Text className="text-sm">Отдел: {branch}</Text>
            </View>
            <View className="flex-row gap-2">
              <Icon as={MapPin} size={20} />
              <Text className="text-sm">Город: {location}</Text>
            </View>
            <View className="flex-row gap-2">
              <Icon as={Briefcase} size={20} />
              <Text className="text-sm">
                Опыт работы: {experience} {getPlural(experience, ['год', 'года', 'лет'])}
              </Text>
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
            <Text className="text-lg font-semibold">Образование</Text>
          </CardHeader>
          <Separator />
          <CardContent>
            <Text className="text-sm">• {education}</Text>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Text className="text-lg font-semibold">Требования</Text>
          </CardHeader>
          <Separator />
          <CardContent>
            {requirements.map((x, i) => (
              <Text key={i} className="text-sm">
                • {x}
              </Text>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Text className="text-lg font-semibold">Задачи</Text>
          </CardHeader>
          <Separator />
          <CardContent>
            {tasks.map((x, i) => (
              <Text key={i} className="text-sm">
                • {x}
              </Text>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Text className="text-lg font-semibold">Условия</Text>
          </CardHeader>
          <Separator />
          <CardContent>
            {features.map((x, i) => (
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
