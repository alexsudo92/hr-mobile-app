import { CandidateStatus, VacancyStatus } from '@/types'; // ← подставь свой путь к типам
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type StatusType = 'candidate' | 'vacancy';

interface StatusSelectorProps {
  type: StatusType;
  currentStatus: VacancyStatus | CandidateStatus;
  onClose: () => void;
  onStatusChange: (newStatus: VacancyStatus | CandidateStatus) => void;
}

const StatusSelector: React.FC<StatusSelectorProps> = ({
  type,
  currentStatus,
  onClose,
  onStatusChange,
}) => {
  const getStatusOptions = () => {
    if (type === 'candidate') {
      return Object.entries(CandidateStatus)
        .filter(([key]) => isNaN(Number(key)))
        .map(([key, value]) => ({ label: key, value: value as CandidateStatus }));
    } else {
      return Object.entries(VacancyStatus)
        .filter(([key]) => isNaN(Number(key)))
        .map(([key, value]) => ({ label: key, value: value as VacancyStatus }));
    }
  };

  const options = getStatusOptions();

  return (
    <View className="rounded-lg bg-white p-4 shadow-sm">
      <Text className="mb-3 text-lg font-bold text-gray-800">
        Изменить статус ({type === 'candidate' ? 'Кандидат' : 'Вакансия'})
      </Text>

      <View className="mb-4">
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            className={`mb-2 flex-row items-center rounded-lg px-4 py-3 ${
              currentStatus === option.value ? 'border border-blue-500 bg-blue-100' : 'bg-gray-50'
            }`}
            onPress={() => {
              onStatusChange(option.value);
            }}>
            <View
              className={`mr-3 h-4 w-4 rounded-full border ${
                currentStatus === option.value ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
              }`}
            />
            <Text
              className={`${currentStatus === option.value ? 'text-blue-700' : 'text-gray-700'}`}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default StatusSelector;
