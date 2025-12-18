import CandidateState from '@/app/components/CandidateState';
import InteractionList from '@/app/components/InteractionList';
import StatusSelector from '@/app/components/StatusSelector';
import { addCandidateInteraction, setCandidateStatus } from '@/lib/api';
import { getToken } from '@/lib/storage';
import { useAuthStore, useCandidateStore } from '@/stores';
import { CandidateData, CandidateStatus, Interaction, InteractionType, Roles } from '@/types';
import { Button } from '@/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/ui/card';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import * as Calendar from 'expo-calendar';
import * as MailComposer from 'expo-mail-composer';
import * as SMS from 'expo-sms';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v7 } from 'uuid';

const emailTemplates = {
  interview: {
    subject: 'Приглашение на собеседование',
    body: `Здравствуйте!

Благодарим вас за отклик на вакансию. Мы ознакомились с вашим резюме и хотели бы пригласить вас на собеседование.

Пожалуйста, подтвердите вашу доступность в ближайшие дни, и мы согласуем удобное время.

С уважением,
Команда HR`,
  },
  offer: {
    subject: 'Поздравляем! Мы готовы сделать вам оффер',
    body: `Здравствуйте!

Поздравляем! По итогам собеседований мы приняли решение предложить вам позицию в нашей компании.

В ближайшее время с вами свяжется наш HR-менеджер, чтобы обсудить детали оффера: условия, компенсацию и дату выхода.

Спасибо за проявленный интерес к нашей команде!

С уважением,
Команда HR`,
  },
  invite: {
    subject: 'Напоминание о предстоящем собеседовании',
    body: `Здравствуйте!

Напоминаем, что ваше собеседование запланировано на dt.

Если у вас возникли изменения в расписании, пожалуйста, сообщите нам заранее.

С уважением,
Команда HR`,
  },
  followUp: {
    subject: 'Уточнение по вашей кандидатуре',
    body: `Здравствуйте!

Благодарим вас за интерес к нашей компании.  
Хотели бы уточнить несколько деталей по вашему резюме / опыту / ожиданиям.

Будем рады вашему ответу в удобное для вас время.

С уважением,
Команда HR`,
  },
  rejection: {
    subject: 'Результат рассмотрения вашей кандидатуры',
    body: `Здравствуйте!

Благодарим вас за время, уделённое нашему процессу, и за интерес к нашей компании.

К сожалению, на данный момент мы не можем предложить вам вакансию. Однако ваш профиль произвёл хорошее впечатление, и мы сохраним ваши данные для будущих возможностей.

Желаем вам успехов в поиске!

С уважением,
Команда HR`,
  },
};

const candidateOptions = [
  { label: 'Новый', value: CandidateStatus.New },
  { label: 'На рассмотрении', value: CandidateStatus.Reviewing },
  { label: 'Оффер отправлен', value: CandidateStatus.Offer },
  { label: 'Принят', value: CandidateStatus.Hired },
  { label: 'Отклонён', value: CandidateStatus.Rejected },
];

const Interactions = ({ route }: any) => {
  const { getCandidate, addInteraction, setStatus } = useCandidateStore();
  const { data } = useAuthStore();

  const { id, name, phone, mail, interactions, status }: CandidateData = getCandidate(
    route.params.id
  );

  const [isMailAvailable, setIsMailAvailable] = useState(false);
  const [isSmsAvailable, setIsSmsAvailable] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<CandidateStatus | string>(status);

  useEffect(() => {
    (async () => {
      const { status: calendarStatus } = await Calendar.requestCalendarPermissionsAsync();
      if (calendarStatus !== 'granted') {
        Alert.alert('Ошибка', 'Необходим доступ к календарю');
      }

      const canSendMail = await MailComposer.isAvailableAsync();
      setIsMailAvailable(canSendMail);

      const canSendSms = await SMS.isAvailableAsync();
      setIsSmsAvailable(canSendSms);
    })();
  }, []);

  const handleCall = () => {
    const url = `tel:${phone}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Ошибка', 'Невозможно совершить звонок');
      }
    });

    handleInteraction(id, {
      id: v7(),
      date: new Date(),
      type: InteractionType.SentCall,
      message: 'Совершен звонок',
      candidateId: id,
      userId: data?.id!,
    });
  };

  const handleSms = async () => {
    if (!isSmsAvailable) {
      Alert.alert('Ошибка', 'Отправка SMS недоступна на этом устройстве');
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
              Alert.alert('Пользователь отменил отправку SMS');
            } else {
              Alert.alert('Ошибка', 'Не удалось отправить SMS');
            }
          },
        },
      ]
    );

    await handleInteraction(id, {
      id: v7(),
      date: new Date(),
      type: InteractionType.SentSms,
      message: 'Отправлено SMS сообщение',
      candidateId: id,
      userId: data?.id!,
    });
  };

  const handleEmail = (templateKey: keyof typeof emailTemplates) => {
    if (!isMailAvailable) {
      Alert.alert('Ошибка', 'Отправка писем недоступна на этом устройстве');
    }

    const template = emailTemplates[templateKey];
    MailComposer.composeAsync({
      recipients: [mail],
      subject: template.subject,
      body: template.body.replace('Здравствуйте!', `Здравствуйте, ${name}!`),
      isHtml: false,
    })
      .catch((err) => {
        Alert.alert('Ошибка', 'Не удалось открыть почтовый клиент');
      })
      .finally(() => {
        handleInteraction(id, {
          id: v7(),
          date: new Date(),
          type: InteractionType.SentMail,
          message: 'Отправленое сообщение по почте',
          candidateId: id,
          userId: data?.id!,
        });
      });
  };

  const scheduleEvent = async (eventType: 'interview' | 'meeting') => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Разрешение необходимо', 'Пожалуйста, разрешите доступ к календарю');
    }

    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const defaultCalendar = calendars.find((c) => c.allowsModifications) || calendars[0];

    if (!defaultCalendar) {
      Alert.alert('Ошибка', 'Не удалось найти календарь для записи');
    }

    const eventTitle = eventType === 'interview' ? `Собеседование с ${name}` : `Встреча с ${name}`;
    const now = new Date();
    const startTime = new Date(now.getTime() + 60 * 60 * 1000); // 1 час
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000 * 2); // 2 часа

    await Calendar.createEventAsync(defaultCalendar.id, {
      title: eventTitle,
      startDate: startTime,
      endDate: endTime,
      notes: `Кандидат: ${name}\nТелефон: ${phone || 'не указан'}\nEmail: ${mail || 'не указан'}`,
    });

    Alert.alert('Успех', 'Событие запланировано');
    await handleInteraction(id, {
      id: v7(),
      date: new Date(),
      type: InteractionType.Interview,
      message: 'Отправлено сообщение по почте',
      candidateId: id,
      userId: data?.id!,
    });
  };

  const handleInteraction = async (id: string, interaction: Interaction) => {
    addInteraction(id, interaction);
    const token = getToken();
    const response = await addCandidateInteraction(token!, id, interaction);
    console.log(response);
  };

  const handleStatusChange = async () => {
    const token = getToken();
    const response = await setCandidateStatus(token!, id, currentStatus as CandidateStatus);
    setStatus(id, currentStatus as CandidateStatus);

    let interactionMessage = '';
    let interactionType = InteractionType.SentMail;
    switch (currentStatus as CandidateStatus) {
      case CandidateStatus.Reviewing:
        interactionType = InteractionType.Interview;
        interactionMessage = 'Кандидат взят в работу';
        break;
      case CandidateStatus.Offer:
        interactionType = InteractionType.Offer;
        interactionMessage = 'Отправлено предложение о работе';
        break;
      case CandidateStatus.Hired:
        interactionType = InteractionType.Hired;
        interactionMessage = 'Кандидат принят на работу';
        break;
      case CandidateStatus.Rejected:
        interactionType = InteractionType.Rejected;
        interactionMessage = 'Кандидат отклонён';
        break;
      case CandidateStatus.New:
      default:
        interactionMessage = '';
        break;
    }

    console.log(interactionMessage);
    const intId = v7();

    addInteraction(id, {
      id: intId,
      date: new Date(),
      type: interactionType,
      message: interactionMessage,
      userId: data?.id!,
      candidateId: id,
    });

    await addCandidateInteraction(token!, id, {
      id: intId,
      date: new Date(),
      type: interactionType,
      message: interactionMessage,
      userId: data?.id!,
      candidateId: id,
    });

    Alert.alert('Статус обновлен', interactionMessage);
  };

  return (
    <SafeAreaView className="p-5" edges={{ bottom: 'maximum' }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-2">
        <Text className="mb-3 text-center text-xl font-bold">{name}</Text>
        {data?.role !== Roles.Hr && (
          <Card>
            <CardHeader>
              <Text className="text-lg font-semibold">Статус</Text>
            </CardHeader>
            <Separator />
            <CardContent>
              <CandidateState status={status} />
            </CardContent>
            <Separator />
            <CardContent>
              <StatusSelector
                currentStatus={currentStatus}
                onStatusChange={(e) => setCurrentStatus(e)}
                options={candidateOptions}
              />
            </CardContent>
            <Separator />
            <CardFooter className="justify-center">
              <Button onPress={handleStatusChange}>
                <Text>Сохранить</Text>
              </Button>
            </CardFooter>
          </Card>
        )}

        <Card>
          <CardHeader>
            <Text className="text-lg font-semibold">Запланировать</Text>
          </CardHeader>
          <Separator />
          <CardContent className="gap-2">
            <Button variant={'outline'} onPress={() => scheduleEvent('interview')}>
              <Text>Собеседование</Text>
            </Button>
            <Button variant={'outline'} onPress={() => scheduleEvent('meeting')}>
              <Text>Встречу</Text>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Text className="text-lg font-semibold">Связь</Text>
          </CardHeader>
          <Separator />
          <CardContent className="gap-2">
            <Button variant={'outline'} onPress={handleCall}>
              <Text>Позвонить</Text>
            </Button>
            <Button variant={'outline'} onPress={handleSms}>
              <Text>Отправить SMS</Text>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Text className="text-lg font-semibold">Отправить письмо (шаблон):</Text>
          </CardHeader>
          <Separator />
          <CardContent className="gap-2">
            <Button className="bg-green-500" onPress={() => handleEmail('invite')}>
              <Text>Принять</Text>
            </Button>
            <Button className="bg-pink-500" onPress={() => handleEmail('offer')}>
              <Text>Отправить оффер</Text>
            </Button>
            <Button className="bg-orange-500" onPress={() => handleEmail('interview')}>
              <Text>Пригласить на собеседование</Text>
            </Button>
            <Button className="bg-blue-500" onPress={() => handleEmail('followUp')}>
              <Text>Уточнить детали</Text>
            </Button>
            {data?.role !== Roles.Hr && (
              <Button className="bg-red-500" onPress={() => handleEmail('rejection')}>
                <Text>Отказать</Text>
              </Button>
            )}
          </CardContent>
        </Card>

        <InteractionList interactions={interactions} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Interactions;
