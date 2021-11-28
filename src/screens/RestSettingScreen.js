import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from 'tailwind-rn';

import Header from '@/components/Header';

const RestSettingScreen = () => {
  return (
    <SafeAreaView style={tw('flex-1')}>
      <View style={tw('flex-1')}>
        <Header
          title="Rest Time Setting"
        />
        <View style={tw('flex-1 items-center justify-center')}>
          <Text>RestSettingScreen</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RestSettingScreen;
