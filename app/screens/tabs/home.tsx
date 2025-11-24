import { FlatList, View } from 'react-native';
import React, { act, useState } from 'react';
import JobCard from '@/app/components/JobCard';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { jobData } from '@/data/mockData';

enum Filter {
  All,
  Open,
  Closed,
  OnHold,
}

const Home = () => {
  const [active, setActive] = useState<Filter>(Filter.All);
  const [search, setSearch] = useState('');

  const filteredData = jobData.filter((x) => {
    const matched = x.name.toLowerCase().includes(search.toLowerCase());
    const selectedFilter = active === Filter.All || x.status.valueOf() === active.valueOf() - 1;

    return matched && selectedFilter;
  });

  return (
    <SafeAreaView edges={{ bottom: 'off', top: 'maximum' }} className="flex-1 gap-2 p-5">
      <Text variant={'h3'} className="text-center">
        Job list
      </Text>
      <Input
        value={search}
        onChangeText={(e) => setSearch(e)}
        className="h-12"
        inputMode="search"
        placeholder="Search"></Input>

      <View className="flex-row justify-between">
        <Button
          onPress={() => setActive(Filter.All)}
          variant={active === Filter.All ? 'default' : 'outline'}>
          <Text>All</Text>
        </Button>
        <Button
          onPress={() => setActive(Filter.Open)}
          variant={active === Filter.Open ? 'default' : 'outline'}>
          <Text>Open</Text>
        </Button>
        <Button
          onPress={() => setActive(Filter.Closed)}
          variant={active === Filter.Closed ? 'default' : 'outline'}>
          <Text>Closed</Text>
        </Button>
        <Button
          onPress={() => setActive(Filter.OnHold)}
          variant={active === Filter.OnHold ? 'default' : 'outline'}>
          <Text>On hold</Text>
        </Button>
      </View>

      <FlatList
        contentContainerClassName="gap-2"
        data={filteredData}
        renderItem={({ item }) => (
          <JobCard job={item} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
export default Home;
