import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/ui/text';
import Filter, { FilterOption } from '@/app/components/Filter';
import { CandidateData } from '@/types';
import { useCandidateStore } from '@/stores';

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

const Kanban = () => {
  const { data } = useCandidateStore();
  const [filteredData, setFilteredData] = useState<CandidateData[]>([]);

  return (
    <SafeAreaView edges={{ bottom: 'off', top: 'maximum' }} className='className="flex-1 gap-2 p-5'>
      <Text variant={'h3'} className="text-center">
        Список кандидатов
      </Text>

      <Filter
        data={data}
        filterOptions={filterOptions}
        searchKey="name"
        statusKey="status"
        onFilteredDataChange={setFilteredData}
      />
    </SafeAreaView>
  );
};

export default Kanban;
