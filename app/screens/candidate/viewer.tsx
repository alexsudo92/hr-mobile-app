import CandidateState from '@/app/components/CandidateState';
import InteractionList from '@/app/components/InteractionList';
import { employmentText, experienceText, getPlural } from '@/lib/utils';
import { useCandidateStore } from '@/stores';
import { CandidateData, NavigationProp, Workplace } from '@/types';
import { Card, CardContent, CardHeader } from '@/ui/card';
import { Icon } from '@/ui/icon';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { useNavigation } from '@react-navigation/native';
import {
  BadgeRussianRuble,
  Briefcase,
  Building2,
  Calendar,
  Clock,
  GraduationCap,
  Mail,
  Phone,
} from 'lucide-react-native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const calculateWorkDuration = (startDate: Date, endDate: Date): string => {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    const lastDayOfMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
    days += lastDayOfMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} ${getPlural(years, ['год', 'года', 'лет'])}`);
  if (months > 0) parts.push(`${months} ${getPlural(months, ['месяц', 'месяца', 'месяцев'])}`);
  if (days > 0 || parts.length === 0)
    parts.push(`${days} ${getPlural(days, ['день', 'дня', 'дней'])}`);

  return parts.join(' ');
};

const Viewer = ({ route }: any) => {
  const { getCandidate } = useCandidateStore();
  const navigation = useNavigation<NavigationProp>();

  const {
    id,
    name,
    salary,
    status,
    skills,
    workplaces,
    education,
    experience,
    employment,
    workHours,
    respondDate,
    vacancyId,
    phone,
    mail,
    interactions,
  }: CandidateData = getCandidate(route.params.id);

  return (
    <SafeAreaView className="p-5" edges={{ bottom: 'maximum' }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-2">
        <Card>
          <CardHeader className="flex flex-row">
            <Text className="text-2xl font-semibold">{name}</Text>
          </CardHeader>
          <Separator />
          <CardContent>
            <CandidateState status={status} />
          </CardContent>
          <Separator />
          <CardContent className="flex-row items-center gap-2">
            <Icon as={BadgeRussianRuble} size={20} />
            <Text className="text-lg font-medium text-green-600">{salary.toLocaleString()} ₽</Text>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="gap-2">
            <View className="flex-row gap-2">
              <Icon as={Mail} size={20} />
              <Text className="text-sm">Почта: {mail}</Text>
            </View>
            <View className="flex-row gap-2">
              <Icon as={Phone} size={20} />
              <Text className="text-sm">Телефон: {phone}</Text>
            </View>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="gap-2">
            <View className="flex-row items-center gap-2">
              <Icon as={Briefcase} size={20} />
              <Text className="text-sm">Опыт работы: {experienceText(experience)}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Icon as={GraduationCap} size={20} />
              <Text className="text-sm">Образование: {education}</Text>
            </View>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Text className="text-lg font-semibold">Навыки</Text>
          </CardHeader>
          <Separator />
          <CardContent className="gap-1">
            {skills.map((skill, index) => (
              <Text key={index} className="text-sm">
                • {skill}
              </Text>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Text className="text-lg font-semibold">Предыдущие места работы</Text>
          </CardHeader>
          <Separator />
          <CardContent className="gap-4">
            {workplaces.map((workplace: Workplace, index) => (
              <View key={index} className="flex-row justify-between gap-2">
                <View className="flex-row gap-1">
                  <Icon as={Building2} className="self-center" size={20} />
                  <View>
                    <Text className="text-sm font-medium">{workplace.name}</Text>
                    <Text className="text-xs text-slate-600">
                      {workplace.startDate.toLocaleDateString()} —
                      {workplace.endDate.toLocaleDateString()}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text className="text-xs font-semibold text-blue-700">
                    {calculateWorkDuration(workplace.startDate, workplace.endDate)}
                  </Text>
                </View>
              </View>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Text className="text-lg font-semibold">Предпочтения по работе</Text>
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
            <Text className="text-lg font-semibold">Информация об отклике</Text>
          </CardHeader>
          <Separator />
          <CardContent className="gap-2">
            <View className="flex-row items-center gap-2">
              <Icon as={Calendar} size={20} />
              <Text className="text-sm">
                Дата отклика: <Text className="font-bold">{respondDate.toLocaleDateString()}</Text>
              </Text>
            </View>
            <Text className="text-sm">
              ID вакансии: <Text className="font-bold">{vacancyId}</Text>
            </Text>
          </CardContent>
        </Card>

        <InteractionList interactions={interactions} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Viewer;
