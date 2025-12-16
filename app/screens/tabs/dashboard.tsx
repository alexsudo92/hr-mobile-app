import { useStats } from '@/hooks/statsHook';
import { getToken } from '@/lib/storage';
import { Text } from '@/ui/text';
import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';
import { SafeAreaView } from 'react-native-safe-area-context';

const Dashboard = () => {
  const { data, isLoading, isError } = useStats(getToken());

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="black" />
        <Text className="mt-4">Загрузка статистики...</Text>
      </SafeAreaView>
    );
  }

  if (isError || !data) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center p-5">
        <Text className="text-center text-red-600">
          Не удалось загрузить статистику. Попробуйте позже.
        </Text>
      </SafeAreaView>
    );
  }

  const {
    totalCandidates,
    totalVacancies,
    vacancyStatusCounts,
    candidateStatusCounts,
    employmentTypeCounts,
    avgCandidateSalary,
    avgVacancySalary,
  } = data;

  const vacancyChartData = Object.entries(vacancyStatusCounts).map(([key, count]) => {
    return {
      name: key === 'Closed' ? 'Закрытые' : key === 'OnHold' ? 'На согласовании' : 'Открытые',
      population: count,
      color: key === 'Closed' ? '#f87171' : key === 'OnHold' ? '#fbbf24' : '#4ade80',
    };
  });

  const candidateChartData = Object.entries(candidateStatusCounts).map(([key, count]) => {
    return {
      name:
        key === 'New'
          ? 'Новые'
          : key === 'Reviewing'
            ? 'На рассмотрении'
            : key === 'Offer'
              ? 'Оффер'
              : key === 'Hired'
                ? 'Приняты'
                : key === 'Rejected'
                  ? 'Отказано'
                  : '',
      population: count,
      color:
        key === 'New'
          ? '#60a5fa'
          : key === 'Reviewing'
            ? '#93c5fd'
            : key === 'Offer'
              ? '#a78bfa'
              : key === 'Hired'
                ? '#4ade80'
                : key === 'Rejected'
                  ? '#f87171'
                  : '#94a3b8',
    };
  });

  const employmentChartData = Object.entries(employmentTypeCounts).map(([key, count]) => {
    return {
      name:
        key === 'FullTime'
          ? 'Полный день'
          : key === 'Remote'
            ? 'Удаленно'
            : key === 'PartTime'
              ? 'Неполный день'
              : key === 'Internship'
                ? 'Стажировка'
                : '',
      population: count,
      color:
        key === 'FullTime'
          ? '#818cf8'
          : key === 'Remote'
            ? '#ec4899'
            : key === 'PartTime'
              ? '#f472b6'
              : key === 'Internship'
                ? '#fde047'
                : '#94a3b8',
    };
  });

  const vacancySalaryData: ChartData = {
    labels: Object.keys(avgVacancySalary),
    datasets: [
      {
        data: Object.entries(avgVacancySalary).map(([key, count]) => count),
      },
    ],
  };

  const candidateSalaryData: ChartData = {
    labels: Object.keys(avgCandidateSalary),
    datasets: [
      {
        data: Object.entries(avgCandidateSalary).map(([key, count]) => count),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 0,
    },
  };

  return (
    <SafeAreaView edges={{ bottom: 'off', top: 'maximum' }} className="flex-1">
      <ScrollView className="flex-1 gap-5 bg-white p-5 dark:bg-gray-900">
        <Text className="text-center" variant={'h3'}>
          Dashboard
        </Text>

        <View className="mb-5 mt-5 flex-row justify-between gap-5">
          <View className="flex-1 items-center rounded-lg bg-black p-3">
            <Text className="text-white">Вакансий</Text>
            <Text className="text-2xl font-bold text-white">{totalVacancies}</Text>
          </View>

          <View className="flex-1 items-center rounded-lg bg-black p-3">
            <Text className="text-white">Кандидатов</Text>
            <Text className="text-2xl font-bold text-white">{totalCandidates}</Text>
          </View>
        </View>

        <View className="items-center">
          <Text className="text-center text-lg font-semibold">Статусы вакансий</Text>
          {vacancyChartData.length > 0 ? (
            <PieChart
              data={vacancyChartData}
              width={400}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="0"
              absolute
            />
          ) : (
            <Text className="text-gray-500">Нет данных</Text>
          )}
        </View>

        <View className="items-center">
          <Text className="text-center text-lg font-semibold">Статусы кандидатов</Text>
          {candidateChartData.length > 0 ? (
            <PieChart
              data={candidateChartData}
              width={350}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="0"
              absolute
            />
          ) : (
            <Text className="text-gray-500">Нет данных</Text>
          )}
        </View>

        <View className="items-center">
          <Text className="text-center text-lg font-semibold">Типы занятости</Text>
          {employmentChartData.length > 0 ? (
            <PieChart
              data={employmentChartData}
              width={350}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="0"
              absolute
            />
          ) : (
            <Text className="text-gray-500">Нет данных</Text>
          )}
        </View>

        <View className="items-center">
          <Text className="text-center text-lg font-semibold">Среднее предложение по зарплате</Text>
          {vacancySalaryData ? (
            <BarChart
              data={vacancySalaryData}
              width={350}
              height={250}
              yAxisLabel=""
              showValuesOnTopOfBars
              yAxisSuffix=" ₽"
              chartConfig={chartConfig}
              style={{ padding: 10, borderRadius: 16 }}
              fromZero
              showBarTops={true}
            />
          ) : (
            <Text className="text-gray-500">Нет данных</Text>
          )}
        </View>

        <View className="items-center">
          <Text className="text-center text-lg font-semibold">Средние требования к зарплате</Text>
          {candidateSalaryData ? (
            <BarChart
              data={candidateSalaryData}
              width={350}
              height={250}
              yAxisLabel=""
              showValuesOnTopOfBars
              yAxisSuffix=" ₽"
              chartConfig={chartConfig}
              style={{ padding: 10, borderRadius: 16 }}
              fromZero
              showBarTops={true}
            />
          ) : (
            <Text className="text-gray-500">Нет данных</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
