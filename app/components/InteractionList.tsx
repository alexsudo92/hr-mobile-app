import { Interaction, InteractionType } from '@/types';
import { Card, CardContent, CardHeader } from '@/ui/card';
import { Icon } from '@/ui/icon';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import {
  BadgeRussianRuble,
  Calendar,
  Check,
  Mail,
  Mailbox,
  MessageSquare,
  PhoneIncoming,
  PhoneOutgoing,
  Send,
  X,
} from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

interface InteractionListProps {
  interactions: Interaction[];
  className?: string;
}

const getInteractionIcon = (type: InteractionType) => {
  switch (type) {
    case InteractionType.RecievedCall:
      return PhoneIncoming;
    case InteractionType.SentCall:
      return PhoneOutgoing;
    case InteractionType.RecievedSms:
      return MessageSquare;
    case InteractionType.SentSms:
      return Send;
    case InteractionType.RecievedMail:
      return Mailbox;
    case InteractionType.SentMail:
      return Mail;
    case InteractionType.Interview:
      return Calendar;
    case InteractionType.Offer:
      return BadgeRussianRuble;
    case InteractionType.Hired:
      return Check;
    case InteractionType.Rejected:
      return X;
    default:
      throw new Error('wrong type');
  }
};

const getInteractionText = (type: InteractionType) => {
  switch (type) {
    case InteractionType.RecievedCall:
    case InteractionType.SentCall:
      return 'Звонок';
    case InteractionType.RecievedSms:
    case InteractionType.SentSms:
      return 'SMS';
    case InteractionType.RecievedMail:
    case InteractionType.SentMail:
      return 'Письмо';
    case InteractionType.Interview:
      return 'Собеседование';
    case InteractionType.Offer:
      return 'Предложение о работе';
    case InteractionType.Hired:
      return 'Принят на работу';
    case InteractionType.Rejected:
      return 'Отказ';
    default:
      throw new Error('wrong type');
  }
};

const getInteractionColor = (type: InteractionType) => {
  switch (type) {
    case InteractionType.Hired:
      return 'bg-green-100 border-green-300';
    case InteractionType.Offer:
      return 'bg-pink-100 border-pink-300';
    case InteractionType.Interview:
      return 'bg-blue-100 border-blue-300';
    case InteractionType.Rejected:
      return 'bg-red-100 border-red-300';
    case InteractionType.RecievedCall:
    case InteractionType.SentCall:
      return 'bg-teal-100 border-teal-300';
    case InteractionType.RecievedSms:
    case InteractionType.SentSms:
      return 'bg-cyan-100 border-cyan-300';
    case InteractionType.RecievedMail:
    case InteractionType.SentMail:
      return 'bg-amber-100 border-amber-300';
    default:
      throw new Error('wrong type');
  }
};

const getDirectionBadge = (type: InteractionType) => {
  if (
    type === InteractionType.RecievedCall ||
    type === InteractionType.RecievedSms ||
    type === InteractionType.RecievedMail
  ) {
    return (
      <View className="rounded bg-blue-500 px-2 py-1">
        <Text className="text-xs text-white">Входящее</Text>
      </View>
    );
  } else if (
    type === InteractionType.SentCall ||
    type === InteractionType.SentSms ||
    type === InteractionType.SentMail
  ) {
    return (
      <View className="rounded bg-green-500 px-2 py-1">
        <Text className="text-xs text-white">Исходящее</Text>
      </View>
    );
  }

  return null;
};

const InteractionList = ({ interactions, className }: InteractionListProps) => {
  if (interactions.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <Text className="text-lg font-semibold">История взаимодействий</Text>
        </CardHeader>
        <Separator />
        <CardContent className="py-8">
          <Text className="text-center text-gray-500">Взаимодействий пока нет</Text>
        </CardContent>
      </Card>
    );
  }

  const sortedInteractions = [...interactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card className={className}>
      <CardHeader>
        <Text className="text-lg font-semibold">История взаимодействий</Text>
      </CardHeader>
      <Separator />
      <CardContent className="gap-2">
        <View className="absolute bottom-2 left-[34] top-2 w-1 bg-gray-300" />

        {sortedInteractions.map(({ type, date, message, userId }, i) => (
          <View key={i} className="flex-row items-start gap-4">
            <View
              className={`flex size-12 items-center justify-center rounded-full border-2 ${getInteractionColor(type)}`}>
              <Icon
                as={getInteractionIcon(type)}
                size={20}
                className={
                  type === InteractionType.Hired
                    ? 'text-green-600'
                    : type === InteractionType.Rejected
                      ? 'text-red-600'
                      : type === InteractionType.Offer
                        ? 'text-pink-600'
                        : 'text-gray-600'
                }
              />
            </View>

            <View className={`flex-1 gap-2 rounded-md border p-2 ${getInteractionColor(type)}`}>
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-semibold">{getInteractionText(type)}</Text>
                <Text className="text-xs text-gray-500">{date.toLocaleDateString()}</Text>
              </View>

              {getDirectionBadge(type)}

              {message && (
                <View className="rounded border bg-white p-1">
                  <Text className="text-sm text-gray-700">{message}</Text>
                </View>
              )}

              <View className="flex-col justify-between gap-1">
                <Text className="text-xs text-gray-400">By: {userId}</Text>
                <Text className="text-right text-xs text-gray-400">
                  {date.toLocaleTimeString()}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </CardContent>
    </Card>
  );
};

export default InteractionList;
