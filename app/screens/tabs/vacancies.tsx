import Filter, { FilterOption } from '@/app/components/Filter';
import VacancyCard from '@/app/components/VacancyCard';
import { useVacancyStore } from '@/stores';
import { EmploymentType, NavigationProp, VacancyData, VacancyStatus } from '@/types';
import { Icon } from '@/ui/icon';
import { Text } from '@/ui/text';
import { useNavigation } from '@react-navigation/native';
import { Plus } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v7 } from 'uuid';

enum VacancyFilter {
  All,
  Open,
  Closed,
  OnHold,
}

const filterOptions: FilterOption<VacancyFilter>[] = [
  { value: VacancyFilter.All, label: 'Все' },
  { value: VacancyFilter.Open, label: 'Открытые' },
  { value: VacancyFilter.Closed, label: 'Закрытые' },
  { value: VacancyFilter.OnHold, label: 'На согласовании' },
];

const Vacancies = () => {
  const { data, addVacancy } = useVacancyStore();
  const [filteredData, setFilteredData] = useState<VacancyData[]>([]);
  const navigation = useNavigation<NavigationProp>();

  const handleNew = () => {
    const uniqueId = v7();

    const newVacancy: VacancyData = {
      id: uniqueId,
      name: '',
      startSalary: 0,
      endSalary: 0,
      description: '',
      education: '',
      employment: EmploymentType.FullTime,
      workHours: 0,
      location: '',
      branch: '',
      tags: [],
      postDate: new Date(),
      endDate: new Date(),
      status: VacancyStatus.OnHold,
      requirements: [],
      experience: 0,
      features: [],
      tasks: [],
    };

    addVacancy(newVacancy);
    navigation.navigate('vacancyEditor', { id: uniqueId });
  };

  return (
    <SafeAreaView edges={{ bottom: 'off', top: 'maximum' }} className="flex-1 gap-2 p-5">
      <Text variant={'h3'} className="text-center">
        Список вакансий
      </Text>

      <TouchableOpacity className="absolute left-[90%] top-[95%] z-10" onPress={handleNew}>
        <View className="size-14 items-center justify-center rounded-full bg-amber-700 shadow-md">
          <Icon size={35} className="color-white" as={Plus} />
        </View>
      </TouchableOpacity>

      <Filter
        data={data}
        filterOptions={filterOptions}
        searchKey="name"
        statusKey="status"
        onFilteredDataChange={setFilteredData}
      />

      <FlatList
        contentContainerClassName="gap-2"
        data={filteredData}
        renderItem={({
          item: {
            id,
            location,
            endSalary,
            branch,
            name,
            startSalary,
            employment,
            postDate,
            status,
          },
        }) => (
          <VacancyCard
            location={location}
            branch={branch}
            id={id}
            name={name}
            startSalary={startSalary}
            endSalary={endSalary}
            employment={employment}
            postDate={postDate}
            status={status}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Vacancies;
