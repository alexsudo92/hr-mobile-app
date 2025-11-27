import { employmentText } from '@/lib/utils';
import { CandidateStatus, EmploymentStatus, NavigationProp } from '@/types';
import { Button } from '@/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/ui/card';
import { Icon } from '@/ui/icon';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { useNavigation } from '@react-navigation/native';
import { BookText, Briefcase, Calendar, Clock, GraduationCap } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import CandidateState from './CandidateState';

interface CandidateCardProps {
  id: string;
  vacancyId: string;
  name: string;
  salary: number;
  status: CandidateStatus;
  skills: string[];
  education: string;
  experience: number;
  employment: EmploymentStatus;
  workHours: number;
  respondDate: Date;
}

const CandidateCard = ({
  id,
  vacancyId,
  name,
  salary,
  status,
  skills,
  education,
  experience,
  employment,
  workHours,
  respondDate,
}: CandidateCardProps) => {
  const navigation = useNavigation<NavigationProp>();

  const experienceText = () => {
    if (experience === 0) return 'Без опыта';
    if (experience === 1) return '1 год';
    if (experience >= 2 && experience <= 4) return `${experience} года`;
    return `${experience} лет`;
  };

  return (
    <Card>
      <CardHeader>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold">{name}</Text>
          <CandidateState status={status}></CandidateState>
        </View>

        <Text className="text-sm font-semibold text-green-600">{salary.toLocaleString()} ₽</Text>
      </CardHeader>
      <Separator />

      <CardContent className="gap-2 py-2">
        <View className="flex-row items-center gap-2">
          <Icon as={GraduationCap} size={20} />
          <Text className="text-sm" numberOfLines={1}>
            {education}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Icon as={BookText} size={20} />
          <Text className="text-sm">Опыт работы {experienceText()}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Icon as={Briefcase} size={20} />
          <Text className="text-sm">{employmentText(employment)}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Icon as={Clock} size={20} />
          <Text className="text-sm">{workHours} часов в неделю</Text>
        </View>
      </CardContent>
      <Separator />
      <CardContent>
        <View className="flex-row justify-center gap-1">
          <Button onPress={() => navigation.navigate('candidateViewer', { id })} className="w-1/2">
            <Text>Просмотр</Text>
          </Button>
          <Button onPress={() => navigation.navigate('candidateEditor', { id })} className="w-1/2">
            <Text>Управление</Text>
          </Button>
        </View>
      </CardContent>

      <Separator />
      <CardFooter className="justify-between">
        <View className="flex-row items-center gap-1">
          <Icon as={Calendar} size={16}></Icon>
          <Text className="text-sm text-teal-600">Дата отклика:</Text>
        </View>
        <Text className="text-sm text-teal-600">{respondDate.toLocaleDateString()}</Text>
      </CardFooter>
    </Card>
  );
};

export default CandidateCard;
