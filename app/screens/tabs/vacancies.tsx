import Filter, { FilterOption } from '@/app/components/Filter';
import VacancyCard from '@/app/components/VacancyCard';
import { useVacancies } from '@/hooks/vacanciesHook';
import { getToken } from '@/lib/storage';
import { useVacancyStore } from '@/stores';
import { EmploymentType, NavigationProp, VacancyData, VacancyStatus } from '@/types';
import { Icon } from '@/ui/icon';
import { Text } from '@/ui/text';
import { useNavigation } from '@react-navigation/native';
import { Plus } from 'lucide-react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
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
  { value: VacancyFilter.OnHold, label: 'На согласовании' },
  { value: VacancyFilter.Closed, label: 'Закрытые' },
];

const Vacancies = () => {
  const { addVacancy, setData } = useVacancyStore();
  const [filteredData, setFilteredData] = useState<VacancyData[]>([]);
  const navigation = useNavigation<NavigationProp>();

  const token = getToken();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading } =
    useVacancies(token);

  const allVacancies = useMemo(() => {
    if (!data) return [];

    return data.pages.flat();
  }, [data]);

  useEffect(() => {
    if (allVacancies.length > 0) {
      setData(allVacancies);
    }
  }, [allVacancies, setData]);

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

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="black" />
        <Text className="mt-4">Загрузка вакансий...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center p-5">
        <Text className="text-center text-red-600">
          Не удалось загрузить вакансии. Попробуйте позже.
        </Text>
      </SafeAreaView>
    );
  }

  const renderFooter = () => {
    if (!hasNextPage) return null;
    return (
      <View className="pt-4">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
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
        data={allVacancies}
        filterOptions={filterOptions}
        searchKey="name"
        statusKey="status"
        onFilteredDataChange={setFilteredData}
      />

      <FlatList
        contentContainerClassName="gap-2 mb-6"
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
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
      />
    </SafeAreaView>
  );
};

export default Vacancies;
