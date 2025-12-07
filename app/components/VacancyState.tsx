import { cn } from '@/lib/utils';
import { VacancyStatus } from '@/types';
import { Icon } from '@/ui/icon';
import { Text } from '@/ui/text';
import { CircleCheckBig, CircleX, LoaderCircle } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

interface VacancyStatusProps {
  status: VacancyStatus;
  className?: string | undefined;
}

const color = (status: VacancyStatus) => {
  switch (status) {
    case VacancyStatus.Open:
      return 'bg-green-500';
    case VacancyStatus.Closed:
      return 'bg-red-500';
    case VacancyStatus.OnHold:
      return 'bg-blue-500';
    default:
      throw new Error('wrong status');
  }
};

const text = (status: VacancyStatus) => {
  switch (status) {
    case VacancyStatus.Open:
      return 'Открыта';
    case VacancyStatus.Closed:
      return 'Закрыта';
    case VacancyStatus.OnHold:
      return 'На согласовании';
    default:
      throw new Error('wrong status');
  }
};

const icon = (status: VacancyStatus) => {
  switch (status) {
    case VacancyStatus.Open:
      return CircleCheckBig;
    case VacancyStatus.Closed:
      return CircleX;
    case VacancyStatus.OnHold:
      return LoaderCircle;
    default:
      throw new Error('wrong status');
  }
};

const VacancyState = ({ className, status }: VacancyStatusProps) => {
  return (
    <View className={cn(color(status), 'flex-row items-center gap-1 rounded-xl p-1', className)}>
      <Icon as={icon(status)} size={15} className="text-white" />
      <Text className="text-xs text-white">{text(status)}</Text>
    </View>
  );
};

export default VacancyState;
