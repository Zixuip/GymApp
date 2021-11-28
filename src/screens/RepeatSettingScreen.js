import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from 'tailwind-rn';

import Header from '@/components/Header';

const RepeatSettingScreen = () => {
  const [repeatTimes, setRepeatTimes] = useState(null);

  const navigation = useNavigation();
  const myInput = useRef('myInput');
  useEffect(() => {
    myInput.current.focus();
  });

  return (
    <SafeAreaView style={tw('flex-1')}>
      <View style={tw('flex-1')}>
        <Header
          title="Repeat Time Setting"
        />
        <View style={tw('flex-1 items-center justify-center')}>
          <View>
            <TextInput
              ref={myInput}
              placeholder="每組重複次數"
              style={tw('text-2xl')}
              onChangeText={(textValue) => { setRepeatTimes(textValue); }}
            />
          </View>
          <TouchableOpacity style={tw('mt-8 rounded  bg-indigo-500')} onPress={() => navigation.navigate({ name: 'Home', params: { repeatTimes: repeatTimes } })}>
            <Text style={tw('px-3 py-2 text-white')}>確認</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RepeatSettingScreen;
