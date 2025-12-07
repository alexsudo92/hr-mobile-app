import { cn } from '@/lib/utils';
import { CandidateStatus } from '@/types';
import { Icon } from '@/ui/icon';
import { Text } from '@/ui/text';
import { BadgeRussianRuble, Briefcase, Eye, Plus, X } from 'lucide-react-native';
import { View } from 'react-native';

interface CandidateStateProps {
  status: CandidateStatus;
  className?: string;
}

const color = (status: CandidateStatus) => {
  switch (status) {
    case CandidateStatus.New:
      return 'bg-blue-500';
    case CandidateStatus.Reviewing:
      return 'bg-orange-500';
    case CandidateStatus.Offer:
      return 'bg-pink-500';
    case CandidateStatus.Hired:
      return 'bg-green-500';
    case CandidateStatus.Rejected:
      return 'bg-red-500';
    default:
      throw new Error('wrong status');
  }
};

const text = (status: CandidateStatus) => {
  switch (status) {
    case CandidateStatus.New:
      return 'Новый';
    case CandidateStatus.Reviewing:
      return 'На рассмотрении';
    case CandidateStatus.Offer:
      return 'Предложение';
    case CandidateStatus.Hired:
      return 'Принят';
    case CandidateStatus.Rejected:
      return 'Отклонен';
    default:
      throw new Error('wrong status');
  }
};

const icon = (status: CandidateStatus) => {
  switch (status) {
    case CandidateStatus.New:
      return Plus;
    case CandidateStatus.Reviewing:
      return Eye;
    case CandidateStatus.Offer:
      return BadgeRussianRuble;
    case CandidateStatus.Hired:
      return Briefcase;
    case CandidateStatus.Rejected:
      return X;
    default:
      throw new Error('wrong status');
  }
};

const CandidateState = ({ className, status }: CandidateStateProps) => {
  return (
    <View className={cn(color(status), 'flex-row items-center gap-1 rounded-xl p-1', className)}>
      <Icon as={icon(status)} size={15} className="text-white" />
      <Text className="text-xs text-white">{text(status)}</Text>
    </View>
  );
};

export default CandidateState;
