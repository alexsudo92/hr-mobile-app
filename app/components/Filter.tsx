import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

export interface FilterOption<T> {
  value: T;
  label: string;
}

export interface FilterProps<T, V> {
  data: T[];
  filterOptions: FilterOption<V>[];
  searchKey: keyof T;
  statusKey: keyof T;
  onFilteredDataChange: (filteredData: T[]) => void;
}

const Filter = <T, V>({
  data,
  filterOptions,
  searchKey,
  statusKey,
  onFilteredDataChange,
}: FilterProps<T, V>) => {
  const [active, setActive] = useState<V | number>(0);
  const [search, setSearch] = useState('');
  useEffect(() => {
    const filteredData = data.filter((item) => {
      const searchField = item[searchKey];
      const statusField = item[statusKey];

      const matched = String(searchField).toLowerCase().includes(search.toLowerCase());
      const selectedFilter = active === 0 || Number(statusField) === Number(active).valueOf() - 1;

      return matched && selectedFilter;
    });

    onFilteredDataChange(filteredData);
  }, [data, active, search, searchKey, statusKey, onFilteredDataChange]);

  return (
    <View className="gap-2">
      <View>
        <Input
          value={search}
          onChangeText={setSearch}
          className="h-12"
          inputMode="search"
          placeholder="Поиск"
        />
      </View>

      <ScrollView
        contentContainerClassName="flex-row gap-1"
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {filterOptions.map((option) => (
          <Button
            key={Number(option.value)}
            onPress={() => setActive(option.value)}
            variant={active === option.value ? 'default' : 'outline'}>
            <Text>{option.label}</Text>
          </Button>
        ))}
      </ScrollView>
    </View>
  );
};

export default Filter;
