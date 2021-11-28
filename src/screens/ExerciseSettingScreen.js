import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '@/components/Header';
import tw from 'tailwind-rn';

const ExerciseSettingScreen = () => {
  return (
    <SafeAreaView style={tw('flex-1')}>
      <View style={tw('flex-1')}>
        <Header
          title="Exercise Time Setting"
        />
        <View style={tw('flex-1 items-center justify-center')}>
          <Text>ExerciseSettingScreen</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExerciseSettingScreen;
