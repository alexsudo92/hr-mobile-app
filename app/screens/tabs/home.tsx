import Filter, { FilterOption } from '@/app/components/Filter';
import JobCard from '@/app/components/JobCard';
import { useJobStore } from '@/stores';
import { JobData } from '@/types';
import { Text } from '@/ui';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

enum JobFilter {
  All,
  Open,
  Closed,
  OnHold,
}

const filterOptions: FilterOption<JobFilter>[] = [
  { value: JobFilter.All, label: 'Все' },
  { value: JobFilter.Open, label: 'Открытые' },
  { value: JobFilter.Closed, label: 'Закрытые' },
  { value: JobFilter.OnHold, label: 'На согласовании' },
];

const Home = () => {
  const { data } = useJobStore();
  const [filteredData, setFilteredData] = useState<JobData[]>([]);

  return (
    <SafeAreaView edges={{ bottom: 'off', top: 'maximum' }} className="flex-1 gap-2 p-5">
      <Text variant={'h3'} className="text-center">
        Список вакансий
      </Text>

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
          <JobCard
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
export default Home;
