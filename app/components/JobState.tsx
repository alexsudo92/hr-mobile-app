import { View, Text } from 'react-native'
import React from 'react'
import { JobStatus } from '@/types';
import { CircleCheckBig, CircleX, LoaderCircle } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';


interface JobStatusProps {
  status: JobStatus;
}

const JobState = ({status}: JobStatusProps) => {
  const color = () => {
    switch (status) {
      case JobStatus.Open:
        return 'bg-green-500';
      case JobStatus.Closed:
        return 'bg-red-500';
      case JobStatus.OnHold:
        return 'bg-blue-500';
      default:
        throw new Error('wrong status');
    }
  };

  const text = () => {
    switch (status) {
      case JobStatus.Open:
        return 'Открыта';
      case JobStatus.Closed:
        return 'Закрыта';
      case JobStatus.OnHold:
        return 'Согласуется';
      default:
        throw new Error('wrong status');
    }
  };

  const icon = () => {
    switch (status) {
      case JobStatus.Open:
        return CircleCheckBig;
      case JobStatus.Closed:
        return CircleX;
      case JobStatus.OnHold:
        return LoaderCircle;
      default:
        throw new Error('wrong status');
    }
  };

  return (
    <View className={color() + ' w-fit flex-row items-center gap-1 rounded-xl px-1 py-1'}>
      <Icon as={icon()} size={15} className="text-white" />
      <Text className="text-xs text-white">{text()}</Text>
    </View>
  );
};


export default JobState