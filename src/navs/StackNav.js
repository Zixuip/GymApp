import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ExerciseSettingScreen from '@/screens/ExerciseSettingScreen';
import HomeScreen from '@/screens/HomeScreen';
import GuideScreen from '@/screens/GuideScreen';
import RestSettingScreen from '@/screens/RestSettingScreen';
import RepeatSettingScreen from '@/screens/RepeatSettingScreen.js';

const StackNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }} >
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Guide" component={GuideScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Exercise" component={ExerciseSettingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Rest" component={RestSettingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Repeat" component={RepeatSettingScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StackNav;
