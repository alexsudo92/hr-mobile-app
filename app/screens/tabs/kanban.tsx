import { View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

enum Filter {
  All,
  New,
  Reviewing,
  Offer,
  Hired,
  Rejected
}

const Kanban = () => {
const [active, setActive] = useState<Filter>(Filter.All);
  const [search, setSearch] = useState('');

  /*const filteredData = jobCardsData.filter((x) => {
    const matched = x.title.toLowerCase().includes(search.toLowerCase());
    const selectedFilter = active === Filter.All || x.status.valueOf() === active.valueOf() - 1;

    return matched && selectedFilter;
  });*/

  return (
    <SafeAreaView edges={{ bottom: 'off', top:'maximum'}} className='className="flex-1 gap-2 p-5"'>
      <Text variant={'h3'} className="text-center">
        Candidate list
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
          onPress={() => setActive(Filter.New)}
          variant={active === Filter.New ? 'default' : 'outline'}>
          <Text>New</Text>
        </Button>
        <Button
          onPress={() => setActive(Filter.Reviewing)}
          variant={active === Filter.Reviewing ? 'default' : 'outline'}>
          <Text>Reviewing</Text>
        </Button>
        <Button
          onPress={() => setActive(Filter.Offer)}
          variant={active === Filter.Offer ? 'default' : 'outline'}>
          <Text>Offer</Text>
        </Button>
        <Button
          onPress={() => setActive(Filter.Hired)}
          variant={active === Filter.Hired ? 'default' : 'outline'}>
          <Text>Hired</Text>
        </Button>
        <Button
          onPress={() => setActive(Filter.Rejected)}
          variant={active === Filter.Rejected ? 'default' : 'outline'}>
          <Text>Rejected</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default Kanban