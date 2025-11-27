import { Card, CardContent, CardHeader } from '@/ui/card';
import { Icon } from '@/ui/icon';
import { Input } from '@/ui/input';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { Plus, X } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface EditableListProps {
  items: string[];
  onItemsChange: (items: string[]) => void;
  title: string;
}

const EditableList = ({ items, onItemsChange, title }: EditableListProps) => {
  const handleAddItem = () => {
    const newItems = [...items, ''];
    onItemsChange(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onItemsChange(newItems);
  };

  const handleUpdateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onItemsChange(newItems);
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold">{title}</Text>
        <TouchableOpacity onPress={handleAddItem}>
          <View className="size-8 items-center justify-center rounded-full bg-gray-200">
            <Icon size={20} className="color-black" as={Plus} />
          </View>
        </TouchableOpacity>
      </CardHeader>
      <Separator />
      <CardContent className="gap-2">
        {items.map((item, index) => (
          <View key={index} className="flex-row items-center gap-2">
            <Input
              value={item}
              onChangeText={(value) => handleUpdateItem(index, value)}
              placeholder={`Требование ${index + 1}`}
              className="flex-1 text-sm"
            />
            <TouchableOpacity onPress={() => handleRemoveItem(index)}>
              <View className="size-8 items-center justify-center rounded-full bg-red-100">
                <Icon size={16} className="color-red-600" as={X} />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </CardContent>
    </Card>
  );
};

export default EditableList;
