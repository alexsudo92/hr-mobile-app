import { useCandidateStore } from '@/stores';
import { CandidateData } from '@/types';
import { Button } from '@/ui/button';
import { Text } from '@/ui/text';
import * as Calendar from 'expo-calendar';
import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';

const Interactions = ({ route }: any) => {
  const { getCandidate } = useCandidateStore();

  const {
    id,
    name,
    salary,
    status,
    skills,
    workplaces,
    education,
    experience,
    employment,
    workHours,
    respondDate,
    vacancyIds,
    phone,
    mail,
    interactions,
  }: CandidateData = getCandidate(route.params.id);

  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }

  async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar' };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Expo Calendar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
  }

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  return (
    <View>
      <Text>{id}</Text>
      <Text>Interactions</Text>
      <Button onPress={createCalendar}>
        <Text>Открыть календарь</Text>
      </Button>
    </View>
  );
};

export default Interactions;
