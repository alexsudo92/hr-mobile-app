import { View, Text } from 'react-native'
import React from 'react'

const Viewer = ({route}:any) => {
  const job = route.params;

  return (
    <View>
      <Text>Viewer</Text>
    </View>
  )
}

export default Viewer