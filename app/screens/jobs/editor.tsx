import JobState from '@/app/components/JobState';
import { useJobStore } from '@/stores';
import { EmploymentStatus, JobData, NavigationProp } from '@/types';
import { Button } from '@/ui/button';
import { Card, CardContent, CardHeader } from '@/ui/card';
import { Icon } from '@/ui/icon';
import { Input } from '@/ui/input';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { Textarea } from '@/ui/textarea';
import { useNavigation } from '@react-navigation/native';
import { Building, Clock, MapPin, Plus, Save, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Editor = ({ route }: any) => {
  const { getJob, setJob } = useJobStore();

  const job = getJob(route.params.id);
  const [editedJob, setEditedJob] = useState<JobData>(job);

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
  } = editedJob;

  const [postDateString, setPostDate] = useState<string>(postDate.toLocaleDateString());
  const [endDateString, setEndDate] = useState<string>(endDate.toLocaleDateString());
  const navigation = useNavigation<NavigationProp>();

  const handleSave = () => {
    const pDs = postDateString.split('.');
    const eDs = endDateString.split('.');

    const updatedJob = {
      ...editedJob,
      postDate: new Date(Number(pDs[2]), Number(pDs[1]) - 1, Number(pDs[0])),
      endDate: new Date(Number(eDs[2]), Number(eDs[1]) - 1, Number(eDs[0])),
    };

    setJob(job.id, updatedJob);

    navigation.goBack();
  };

  const updateField = (field: keyof JobData, value: any) => {
    setEditedJob((prev) => (prev ? { ...prev, [field]: value } : job));
  };

  const addRequirement = () => {
    const newRequirements = [...requirements, ''];
    updateField('requirements', newRequirements);
  };

  const removeRequirement = (index: number) => {
    const newRequirements = requirements.filter((_, i) => i !== index);
    updateField('requirements', newRequirements);
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    updateField('requirements', newRequirements);
  };

  const addTag = () => {
    const newTags = [...tags, ''];
    updateField('tags', newTags);
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    updateField('tags', newTags);
  };

  const updateTag = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index] = value;
    updateField('tags', newTags);
  };

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={40} behavior={'padding'}>
      <SafeAreaView className="p-5" edges={{ bottom: 'maximum' }}>
        <TouchableOpacity className="absolute left-[90%] top-[90%] z-10" onPress={handleSave}>
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
                  placeholder="Название вакансии"
                />

                <JobState className="my-2" status={status} />

                <View className="flex-row gap-2">
                  <Input
                    value={startSalary.toString()}
                    onChangeText={(value) => updateField('startSalary', Number(value))}
                    className="flex-1 text-lg font-medium text-green-600"
                    placeholder="Начальная зарплата"
                    keyboardType="numeric"
                  />
                  <Text className="self-center text-lg font-medium">—</Text>
                  <Input
                    value={endSalary.toString()}
                    onChangeText={(value) => updateField('endSalary', Number(value))}
                    className="flex-1 text-lg font-medium text-green-600"
                    placeholder="Конечная зарплата"
                    keyboardType="numeric"
                  />
                  <Text className="self-center text-lg font-medium">₽</Text>
                </View>
              </View>
            </CardHeader>
          </Card>

          <Card>
            <CardContent className="gap-2">
              <View className="flex-row items-center gap-2">
                <Icon as={Building} size={20} />
                <Input
                  value={branch}
                  onChangeText={(value) => updateField('branch', value)}
                  className="flex-1 text-sm"
                  placeholder="Отдел"
                />
              </View>
              <View className="flex-row items-center gap-2">
                <Icon as={MapPin} size={20} />
                <Input
                  value={location}
                  onChangeText={(value) => updateField('location', value)}
                  className="flex-1 text-sm"
                  placeholder="Город"
                />
              </View>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Text className="text-lg font-semibold">Описание</Text>
            </CardHeader>
            <Separator />
            <CardContent>
              <Textarea
                value={description}
                onChangeText={(value) => updateField('description', value)}
                className="text-sm"
                placeholder="Описание вакансии"
                multiline
                numberOfLines={10}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Text className="text-lg font-semibold">Даты найма</Text>
            </CardHeader>
            <Separator />
            <CardContent className="gap-2">
              <Text className="text-sm">Вакансия открыта:</Text>
              <Input
                keyboardType="number-pad"
                value={postDateString}
                onChangeText={(value) => setPostDate(value)}
                placeholder="День.Месяц.Год"
              />
              <Text className="text-sm">Вакансия закроется:</Text>
              <Input
                keyboardType="number-pad"
                value={endDateString}
                onChangeText={(value) => setEndDate(value)}
                placeholder="День.Месяц.Год"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold">Требования</Text>
              <TouchableOpacity onPress={addRequirement}>
                <View className="size-8 items-center justify-center rounded-full bg-gray-200">
                  <Icon size={20} className="color-black" as={Plus} />
                </View>
              </TouchableOpacity>
            </CardHeader>
            <Separator />
            <CardContent className="gap-2">
              <Input
                value={education}
                onChangeText={(value) => updateField('education', value)}
                className="text-sm"
                placeholder="Образование"
              />
              {requirements.map((requirement, index) => (
                <View key={index} className="flex-row items-center gap-2">
                  <TouchableOpacity onPress={() => removeRequirement(index)}>
                    <View className="size-8 items-center justify-center rounded-full bg-red-100">
                      <Icon size={16} className="color-red-600" as={X} />
                    </View>
                  </TouchableOpacity>
                  <Input
                    value={requirement}
                    onChangeText={(value) => updateRequirement(index, value)}
                    className="flex-1 text-sm"
                    placeholder={`Требование ${index + 1}`}
                  />
                </View>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Text className="text-lg font-semibold">Рабочий график</Text>
            </CardHeader>
            <Separator />
            <CardContent className="gap-2">
              <View className="gap-2">
                <Button
                  variant={employment == EmploymentStatus.FullTime ? 'default' : 'outline'}
                  onPress={() => updateField('employment', EmploymentStatus.FullTime)}
                  className="items-center justify-center rounded-lg border py-2">
                  <Text className="font-medium">Полный день</Text>
                </Button>
                <Button
                  variant={employment === EmploymentStatus.Remote ? 'default' : 'outline'}
                  onPress={() => updateField('employment', EmploymentStatus.Remote)}
                  className="items-center justify-center rounded-lg border py-2">
                  <Text className="font-medium">Удаленно</Text>
                </Button>

                <Button
                  variant={employment === EmploymentStatus.PartTime ? 'default' : 'outline'}
                  onPress={() => updateField('employment', EmploymentStatus.PartTime)}
                  className="items-center justify-center rounded-lg border py-2">
                  <Text className="font-medium">Частичная занятость</Text>
                </Button>

                <Button
                  variant={employment === EmploymentStatus.Internship ? 'default' : 'outline'}
                  onPress={() => updateField('employment', EmploymentStatus.Internship)}
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
                  placeholder="Количество рабочих часов"
                />
                <Text className="text-sm text-gray-600">часов</Text>
              </View>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold">Тэги</Text>
              <TouchableOpacity onPress={addTag}>
                <View className="size-8 items-center justify-center rounded-full bg-gray-200">
                  <Icon size={20} className="color-black" as={Plus} />
                </View>
              </TouchableOpacity>
            </CardHeader>
            <Separator />
            <CardContent className="gap-2">
              {tags.map((tag, index) => (
                <View key={index} className="flex-row items-center gap-2">
                  <TouchableOpacity onPress={() => removeTag(index)}>
                    <View className="size-8 items-center justify-center rounded-full bg-red-100">
                      <Icon size={16} className="color-red-600" as={X} />
                    </View>
                  </TouchableOpacity>
                  <Input
                    value={tag}
                    onChangeText={(value) => updateTag(index, value)}
                    placeholder="Тэг"
                    className="flex-1 text-sm"
                  />
                </View>
              ))}
            </CardContent>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Editor;
