import { Icon } from '@/ui/icon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BriefcaseBusiness,
  LayoutDashboard,
  LucideIcon,
  Notebook,
  User,
} from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import CandidatesPage from './candidates';
import Dashboard from './dashboard';
import ProfilePage from './profile';
import VacanciesPage from './vacancies';

const Tab = createBottomTabNavigator();

interface TabIconProps {
  focused: boolean;
  icon: LucideIcon;
}

const TabIcon = ({ focused, icon }: TabIconProps) => (
  <View className="mt-1 flex-1 flex-col items-center justify-center">
    <Icon size={30} color={focused ? '#0000FF' : '#000000'} as={icon} />
  </View>
);

const TabLayout = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={LayoutDashboard} />,
        }}
        component={Dashboard}
      />
      <Tab.Screen
        name="vacancies"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={BriefcaseBusiness} />,
        }}
        component={VacanciesPage}
      />
      <Tab.Screen
        name="candidates"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={Notebook} />,
        }}
        component={CandidatesPage}
      />
      <Tab.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={User} />,
        }}
        component={ProfilePage}
      />
    </Tab.Navigator>
  );
};

export default TabLayout;
