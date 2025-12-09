import CandidateCard from '@/app/components/CandidateCard';
import Filter, { FilterOption } from '@/app/components/Filter';
import { useCandidates } from '@/hooks/candidatesHook';
import { getToken } from '@/lib/storage';
import { useCandidateStore } from '@/stores';
import { CandidateData, CandidateStatus, EmploymentType, NavigationProp } from '@/types';
import { Icon } from '@/ui/icon';
import { Text } from '@/ui/text';
import { useNavigation } from '@react-navigation/native';
import { Plus } from 'lucide-react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v7 } from 'uuid';

enum CandidateFilter {
  All,
  New,
  Reviewing,
  Offer,
  Hired,
  Rejected,
}

const filterOptions: FilterOption<CandidateFilter>[] = [
  { value: CandidateFilter.All, label: 'Все' },
  { value: CandidateFilter.New, label: 'Новые' },
  { value: CandidateFilter.Reviewing, label: 'На рассмотрении' },
  { value: CandidateFilter.Offer, label: 'Оффер' },
  { value: CandidateFilter.Hired, label: 'Приняты' },
  { value: CandidateFilter.Rejected, label: 'Отклонены' },
];

const Candidates = () => {
  const { addCandidate, setData } = useCandidateStore();
  const [filteredData, setFilteredData] = useState<CandidateData[]>([]);
  const navigation = useNavigation<NavigationProp>();

  const token = getToken();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading } =
    useCandidates(token);

  const allCandidates = useMemo(() => {
    return data?.pages.flat() || [];
  }, [data]);

  useEffect(() => {
    if (allCandidates.length > 0) {
      setData(allCandidates);
    }
  }, [allCandidates, setData]);

  useEffect(() => {
    setFilteredData(allCandidates);
  }, [allCandidates]);

  const handleNew = () => {
    const uniqueId = v7();
    const newCandidate: CandidateData = {
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
      employment: EmploymentType.FullTime,
      workHours: 0,
      respondDate: new Date(),
      vacancyId: '',
    };

    addCandidate(newCandidate);
    navigation.navigate('candidateEditor', { id: uniqueId });
  };

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderFooter = () => {
    if (!hasNextPage) return null;
    return (
      <View className="pt-4">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="black" />
        <Text className="mt-4">Загрузка кандидатов...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center p-5">
        <Text className="text-center text-red-600">
          Не удалось загрузить кандидатов. Попробуйте позже.
        </Text>
      </SafeAreaView>
    );
  }

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
        data={allCandidates}
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
            vacancyId,
            salary,
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
            education={education}
            vacancyId={vacancyId}
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

export default Candidates;
