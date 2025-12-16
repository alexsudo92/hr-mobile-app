import InteractionList from '@/app/components/InteractionList';
import { useCandidateStore } from '@/stores';
import { CandidateData } from '@/types';
import { Button } from '@/ui/button';
import { Text } from '@/ui/text';
import * as Calendar from 'expo-calendar';
import * as MailComposer from 'expo-mail-composer';
import * as SMS from 'expo-sms';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Шаблоны писем
const EMAIL_TEMPLATES = {
  interview: {
    subject: 'Приглашение на собеседование',
    body: 'Здравствуйте!\n\nМы хотели бы пригласить вас на собеседование...',
  },
  rejection: {
    subject: 'Результат рассмотрения вашей кандидатуры',
    body: 'Здравствуйте!\n\nБлагодарим вас за интерес к нашей компании...',
  },
  followUp: {
    subject: 'Уточнение по вашей кандидатуре',
    body: 'Здравствуйте!\n\nХотели бы уточнить несколько деталей...',
  },
};

const Interactions = ({ route }: any) => {
  const { getCandidate } = useCandidateStore();

  const { id, name, phone, mail, interactions }: CandidateData = getCandidate(route.params.id);

  const [isMailAvailable, setIsMailAvailable] = useState(false);
  const [isSmsAvailable, setIsSmsAvailable] = useState(false);

  // Проверка доступности сервисов
  useEffect(() => {
    (async () => {
      // Календарь
      const { status: calendarStatus } = await Calendar.requestCalendarPermissionsAsync();
      if (calendarStatus === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Calendars:', calendars);
      }

      // Почта
      const canSendMail = await MailComposer.isAvailableAsync();
      setIsMailAvailable(canSendMail);

      // SMS
      const canSendSms = await SMS.isAvailableAsync();
      setIsSmsAvailable(canSendSms);
    })();
  }, []);

  const handleCall = () => {
    if (!phone) {
      Alert.alert('Ошибка', 'Номер телефона не указан');
      return;
    }
    const url = Platform.OS === 'android' ? `tel:${phone}` : `telprompt:${phone}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Ошибка', 'Невозможно совершить звонок');
      }
    });
  };

  const handleSms = async () => {
    if (!isSmsAvailable) {
      Alert.alert('Ошибка', 'Отправка SMS недоступна на этом устройстве');
      return;
    }
    if (!phone) {
      Alert.alert('Ошибка', 'Номер телефона не указан');
      return;
    }

    Alert.alert(
      'Подтверждение отправки SMS',
      `Вы уверены, что хотите отправить SMS на номер ${phone}?`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Отправить',
          onPress: async () => {
            const { result } = await SMS.sendSMSAsync([phone], '');
            if (result === 'sent') {
              Alert.alert('Успех', 'SMS успешно отправлено');
            } else if (result === 'cancelled') {
              console.log('Пользователь отменил отправку SMS');
            } else {
              Alert.alert('Ошибка', 'Не удалось отправить SMS');
            }
          },
        },
      ]
    );
  };

  const handleEmail = (templateKey: keyof typeof EMAIL_TEMPLATES) => {
    if (!isMailAvailable) {
      Alert.alert('Ошибка', 'Отправка писем недоступна на этом устройстве');
      return;
    }
    if (!mail) {
      Alert.alert('Ошибка', 'Email не указан');
      return;
    }

    const template = EMAIL_TEMPLATES[templateKey];
    MailComposer.composeAsync({
      recipients: [mail],
      subject: template.subject,
      body: template.body.replace('Здравствуйте!', `Здравствуйте, ${name}!`),
      isHtml: false,
    }).catch((err) => {
      console.error('Ошибка отправки письма:', err);
      Alert.alert('Ошибка', 'Не удалось открыть почтовый клиент');
    });
  };

  const scheduleEvent = async (eventType: 'interview' | 'meeting') => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Разрешение необходимо', 'Пожалуйста, разрешите доступ к календарю');
      return;
    }

    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const defaultCalendar = calendars.find((c) => c.allowsModifications) || calendars[0];

    if (!defaultCalendar) {
      Alert.alert('Ошибка', 'Не удалось найти календарь для записи');
      return;
    }

    const eventTitle = eventType === 'interview' ? `Собеседование с ${name}` : `Встреча с ${name}`;
    const now = new Date();
    const startTime = new Date(now.getTime() + 60 * 60 * 1000); // через 1 час
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // на 1 час

    const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
      title: eventTitle,
      startDate: startTime.toISOString(),
      endDate: endTime.toISOString(),
      notes: `Кандидат: ${name}\nТелефон: ${phone || 'не указан'}\nEmail: ${mail || 'не указан'}`,
    });

    Alert.alert('Успех', `Событие создано. ID: ${eventId}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text>ID: {id}</Text>
      <Text style={{ fontSize: 20, marginVertical: 8 }}>Взаимодействия</Text>

      {/* Статус */}
      <View style={{ marginVertical: 12 }}>
        <Text>Статус</Text>
        <Button>
          <Text>Сменить статус</Text>
        </Button>
      </View>

      {/* Запланировать */}
      <View style={{ marginVertical: 12 }}>
        <Text>Запланировать</Text>
        <Button onPress={() => scheduleEvent('interview')}>
          <Text>Собеседование</Text>
        </Button>
        <Button onPress={() => scheduleEvent('meeting')} style={{ marginTop: 8 }}>
          <Text>Встречу</Text>
        </Button>
      </View>

      {/* Контакт */}
      <View style={{ marginVertical: 12 }}>
        <Text>Контакт</Text>
        <Button onPress={handleCall} style={{ marginTop: 8 }}>
          <Text>Позвонить</Text>
        </Button>
        <Button onPress={handleSms} style={{ marginTop: 8 }}>
          <Text>Отправить SMS</Text>
        </Button>

        <View style={{ marginTop: 12 }}>
          <Text>Отправить письмо (выберите шаблон):</Text>
          <Button onPress={() => handleEmail('interview')} style={{ marginTop: 8 }}>
            <Text>Пригласить на собеседование</Text>
          </Button>
          <Button onPress={() => handleEmail('followUp')} style={{ marginTop: 8 }}>
            <Text>Уточнить детали</Text>
          </Button>
          <Button onPress={() => handleEmail('rejection')} style={{ marginTop: 8 }}>
            <Text>Отказать</Text>
          </Button>
        </View>
      </View>

      {/* История взаимодействий */}
      <InteractionList interactions={interactions} />
    </SafeAreaView>
  );
};

export default Interactions;
