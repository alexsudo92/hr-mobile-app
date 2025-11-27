import CandidateCard from '@/app/components/CandidateCard';
import Filter, { FilterOption } from '@/app/components/Filter';
import { useCandidateStore } from '@/stores';
import { CandidateData, CandidateStatus, EmploymentStatus, NavigationProp } from '@/types';
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
  New,
  Reviewing,
  Offer,
  Hired,
  Rejected,
}

const filterOptions: FilterOption<VacancyFilter>[] = [
  { value: VacancyFilter.All, label: 'Все' },
  { value: VacancyFilter.New, label: 'Новые' },
  { value: VacancyFilter.Reviewing, label: 'На рассмотрении' },
  { value: VacancyFilter.Offer, label: 'Оффер' },
  { value: VacancyFilter.Hired, label: 'Приняты' },
  { value: VacancyFilter.Rejected, label: 'Отклонены' },
];

const Candidates = () => {
  const { data, addCandidate } = useCandidateStore();
  const [filteredData, setFilteredData] = useState<CandidateData[]>(data);
  const navigation = useNavigation<NavigationProp>();

  const handleNew = () => {
    const uniqueId = v7();

    const newVacancy: CandidateData = {
      id: uniqueId,
      name: '',
      phone: '',
      mail: '',
      salary: 0,
      status: CandidateStatus.New,
      skills: [],
      workplaces: [],
      education: '',
      experience: 0,
      employment: EmploymentStatus.FullTime,
      workHours: 0,
      respondDate: new Date(),
      vacancyId: '',
    };

    addCandidate(newVacancy);
    navigation.navigate('candidateEditor', { id: uniqueId });
  };

  return (
    <SafeAreaView edges={{ bottom: 'off', top: 'maximum' }} className="flex-1 gap-2 p-5">
      <Text variant={'h3'} className="text-center">
        Список кандидатов
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
            vacancyId,
            salary,
            skills,
            education,
            workHours,
            name,
            experience,
            employment,
            status,
            respondDate,
          },
        }) => (
          <CandidateCard
            id={id}
            name={name}
            respondDate={respondDate}
            workHours={workHours}
            status={status}
            experience={experience}
            employment={employment}
            salary={salary}
            skills={skills}
            education={education}
            vacancyId={vacancyId}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Candidates;
