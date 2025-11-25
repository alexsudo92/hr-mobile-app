import { View } from 'react-native'
import React from 'react'
import { JobData } from '@/types';
import { Text } from '@/ui/text'
import { Card, CardTitle } from '@/ui/card';
import { SafeAreaView } from 'react-native-safe-area-context';

const Editor = ({ route }:any) => {
  const {name}:JobData = route.params;

  return (
    <SafeAreaView edges={{bottom:'maximum'}}>
      <Text>{name}</Text>
    </SafeAreaView>
  )
}

export default Editor