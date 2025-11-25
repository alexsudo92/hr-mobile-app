import { FlatList, ScrollView, View } from 'react-native';
import React, { act, useState } from 'react';
import JobCard from '@/app/components/JobCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJobStore } from '@/stores';
import { JobData } from '@/types';
import Filter, { FilterOption } from '@/app/components/Filter';
import { Text } from '@/ui/text';

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
  { value: JobFilter.OnHold, label: 'Согласуются' },
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
