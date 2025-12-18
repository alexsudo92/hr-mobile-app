import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type StatusSelectorProps<T> = {
  currentStatus: T;
  onStatusChange: (newStatus: T) => void;
  options: { label: string; value: T }[];
};

const StatusSelector = <T,>({ currentStatus, onStatusChange, options }: StatusSelectorProps<T>) => {
  return (
    <View>
      <View className="gap-2">
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className={`flex-row items-center gap-2 rounded-2xl p-4 ${
              currentStatus === option.value ? 'border border-black bg-blue-100' : 'bg-gray-50'
            }`}
            onPress={() => {
              onStatusChange(option.value);
            }}>
            <View
              className={`h-4 w-4 rounded-full border ${
                currentStatus === option.value ? 'border-black bg-black' : 'border-gray-300'
              }`}
            />
            <Text className={`${currentStatus === option.value ? 'text-black' : 'text-gray-600'}`}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default StatusSelector;
