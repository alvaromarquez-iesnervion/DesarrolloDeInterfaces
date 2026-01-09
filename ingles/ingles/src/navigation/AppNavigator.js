import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';

import NotesScreen from '../screens/NotesScreen';
import GoalsScreen from '../screens/GoalsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import TimerScreen from '../screens/TimerScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Notes') {
              iconName = focused ? 'document-text' : 'document-text-outline';
            } else if (route.name === 'Goals') {
              iconName = focused ? 'flag' : 'flag-outline';
            } else if (route.name === 'Calendar') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Timer') {
              iconName = focused ? 'time' : 'time-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.cardBackground,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        })}
      >
        <Tab.Screen name="Notes" component={NotesScreen} />
        <Tab.Screen name="Goals" component={GoalsScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Timer" component={TimerScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}