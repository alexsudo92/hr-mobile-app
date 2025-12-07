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
  Plus,
  Save,
  X,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CandidateState from '@/app/components/CandidateState';
import EditableList from '@/app/components/EditableList';
import { useCandidateStore } from '@/stores';
import { CandidateData, EmploymentType, NavigationProp, Workplace } from '@/types';
import { Button } from '@/ui/button';
import { Card, CardContent, CardHeader } from '@/ui/card';
import { Icon } from '@/ui/icon';
import { Input } from '@/ui/input';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';

const Editor = ({ route }: any) => {
  const navigation = useNavigation<NavigationProp>();

  const { getCandidate, setCandidate } = useCandidateStore();
  const candidate = getCandidate(route.params.id);

  const [editedCandidate, setEditedCandidate] = useState<CandidateData>(candidate);

  const {
    name,
    status,
    salary,
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
  } = editedCandidate;

  const handleSave = () => {
    setCandidate(editedCandidate);

    navigation.goBack();
  };

  const updateField = (field: keyof CandidateData, value: any) => {
    setEditedCandidate((prev) => ({ ...prev, [field]: value }));
  };

  const updateWorkplace = (index: number, field: keyof Workplace, value: any) => {
    const updatedWorkplaces = [...workplaces];
    updatedWorkplaces[index] = { ...updatedWorkplaces[index], [field]: value };
    updateField('workplaces', updatedWorkplaces);
  };

  const addWorkplace = () => {
    const newWorkplace: Workplace = {
      name: '',
      startDate: new Date(),
      endDate: new Date(),
    };
    updateField('workplaces', [...workplaces, newWorkplace]);
  };

  const removeWorkplace = (index: number) => {
    const updatedWorkplaces = workplaces.filter((_, i) => i !== index);
    updateField('workplaces', updatedWorkplaces);
  };

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={40} behavior={'padding'}>
      <SafeAreaView className="p-5" edges={{ bottom: 'maximum' }}>
        <TouchableOpacity className="absolute left-[90%] top-[1%] z-10" onPress={handleSave}>
          <View className="size-14 items-center justify-center rounded-full bg-blue-700 shadow-md">
            <Icon size={35} className="color-white" as={Save} />
          </View>
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-2">
          <Card>
            <CardHeader className="flex flex-row">
              <View className="flex-1">
                <Input
                  value={name}
                  onChangeText={(value) => updateField('name', value)}
                  className="text-2xl font-semibold"
                  placeholder="ФИО кандидата"
                />
                <CandidateState className="my-2" status={status} />
                <View className="flex-row items-center gap-2">
                  <Icon as={BadgeRussianRuble} size={20} />
                  <Input
                    value={salary.toString()}
                    onChangeText={(value) => updateField('salary', Number(value))}
                    className="flex-1 text-lg font-medium text-green-600"
                    placeholder="Зарплата"
                    keyboardType="numeric"
                  />
                  <Text className="text-lg font-medium">₽</Text>
                </View>
              </View>
            </CardHeader>
          </Card>

          <Card>
            <CardContent className="gap-2">
              <View className="flex-row items-center gap-2">
                <Icon as={Mail} size={20} />
                <Input
                  value={mail}
                  onChangeText={(value) => updateField('mail', value)}
                  className="flex-1 text-sm"
                  placeholder="Email"
                  keyboardType="email-address"
                />
              </View>
              <View className="flex-row items-center gap-2">
                <Icon as={Phone} size={20} />
                <Input
                  value={phone}
                  onChangeText={(value) => updateField('phone', value)}
                  className="flex-1 text-sm"
                  placeholder="Телефон"
                  keyboardType="phone-pad"
                />
              </View>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="gap-2">
              <View className="flex-row items-center gap-2">
                <Icon as={Briefcase} size={20} />
                <Input
                  value={experience.toString()}
                  onChangeText={(value) => updateField('experience', Number(value))}
                  className="flex-1 text-sm"
                  placeholder="Опыт работы (лет)"
                  keyboardType="numeric"
                />
              </View>
              <View className="flex-row items-center gap-2">
                <Icon as={GraduationCap} size={20} />
                <Input
                  value={education}
                  onChangeText={(value) => updateField('education', value)}
                  className="flex-1 text-sm"
                  placeholder="Образование"
                />
              </View>
            </CardContent>
          </Card>

          <EditableList
            items={skills}
            title="Навыки"
            onItemsChange={(items) => updateField('skills', items)}
          />

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold">Предыдущие места работы</Text>
              <TouchableOpacity onPress={addWorkplace}>
                <View className="size-8 items-center justify-center rounded-full bg-gray-200">
                  <Icon size={20} className="color-black" as={Plus} />
                </View>
              </TouchableOpacity>
            </CardHeader>
            <Separator />
            <CardContent className="gap-4">
              {workplaces.map((workplace: Workplace, index) => (
                <View key={index} className="gap-2 border-gray-200">
                  <View className="flex-row items-center gap-2">
                    <Icon as={Building2} size={20} />
                    <Input
                      value={workplace.name}
                      onChangeText={(value) => updateWorkplace(index, 'name', value)}
                      className="flex-1 text-sm"
                      placeholder="Название компании"
                    />
                    <TouchableOpacity onPress={() => removeWorkplace(index)}>
                      <View className="size-8 items-center justify-center rounded-full bg-red-100">
                        <Icon size={16} className="color-red-600" as={X} />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View className="flex-row gap-1">
                    <Input
                      value={workplace.startDate.toLocaleDateString()}
                      onChangeText={(value) => {
                        const dateParts = value.split('.');
                        if (dateParts.length === 3) {
                          const day = parseInt(dateParts[0]);
                          const month = parseInt(dateParts[1]) - 1;
                          const year = parseInt(dateParts[2]);
                          if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                            updateWorkplace(index, 'startDate', new Date(year, month, day));
                          }
                        }
                      }}
                      className="flex-1 text-xs text-slate-600"
                      placeholder="Дата начала"
                      keyboardType="number-pad"
                    />
                    <Text className="self-center text-xs">—</Text>
                    <Input
                      value={workplace.endDate.toLocaleDateString()}
                      onChangeText={(value) => {
                        const dateParts = value.split('.');
                        if (dateParts.length === 3) {
                          const day = parseInt(dateParts[0]);
                          const month = parseInt(dateParts[1]) - 1;
                          const year = parseInt(dateParts[2]);
                          if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                            updateWorkplace(index, 'endDate', new Date(year, month, day));
                          }
                        }
                      }}
                      className="flex-1 text-xs text-slate-600"
                      placeholder="Дата окончания"
                      keyboardType="number-pad"
                    />
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
              <View className="gap-2">
                <Button
                  variant={employment == EmploymentType.FullTime ? 'default' : 'outline'}
                  onPress={() => updateField('employment', EmploymentType.FullTime)}
                  className="items-center justify-center rounded-lg border py-2">
                  <Text className="font-medium">Полный рабочий день</Text>
                </Button>
                <Button
                  variant={employment === EmploymentType.PartTime ? 'default' : 'outline'}
                  onPress={() => updateField('employment', EmploymentType.PartTime)}
                  className="items-center justify-center rounded-lg border py-2">
                  <Text className="font-medium">Неполный рабочий день</Text>
                </Button>
                <Button
                  variant={employment === EmploymentType.Remote ? 'default' : 'outline'}
                  onPress={() => updateField('employment', EmploymentType.Remote)}
                  className="items-center justify-center rounded-lg border py-2">
                  <Text className="font-medium">Удаленная работа</Text>
                </Button>
                <Button
                  variant={employment === EmploymentType.Internship ? 'default' : 'outline'}
                  onPress={() => updateField('employment', EmploymentType.Internship)}
                  className="items-center justify-center rounded-lg border py-2">
                  <Text className="font-medium">Стажировка</Text>
                </Button>
              </View>
              <Separator />
              <View className="flex-row items-center gap-2">
                <Icon as={Clock} size={20} />
                <Input
                  value={workHours.toString()}
                  onChangeText={(value) => updateField('workHours', Number(value))}
                  className="flex-1 text-sm"
                  keyboardType="numeric"
                  placeholder="Часов в неделю"
                />
                <Text className="text-sm text-gray-600">часов в неделю</Text>
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
                <Text>{respondDate.toLocaleDateString()}</Text>
              </View>
              <Input
                value={vacancyId}
                onChangeText={(value) => updateField('vacancyId', value)}
                className="text-sm"
                placeholder="ID вакансии"
              />
            </CardContent>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Editor;
