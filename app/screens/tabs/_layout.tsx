import HomePage from '@/app/screens/tabs/home';
import { Icon } from '@/ui/icon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, LucideIcon, Notebook, User } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import KanbanPage from './kanban';
import ProfilePage from './profile';

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

function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={Home} />,
        }}
        component={HomePage}
      />
      <Tab.Screen
        name="kanban"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={Notebook} />,
        }}
        component={KanbanPage}
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
}

export default TabLayout;
