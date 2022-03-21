import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from 'tailwind-rn';

import Header from '@/components/Header';

const RestSettingScreen = ({ route }) => {
  const [restTimes, setRestTimes] = useState(null);

  const navigation = useNavigation();
  const myInput = useRef('myInput');

  useEffect(() => {
    myInput.current.focus();
    if (route.params && !restTimes) {
      setRestTimes(route.params.value);
      console.log('hi');
    }
  }, []);

  return (
    <SafeAreaView style={tw('flex-1')}>
      <View style={tw('flex-1')}>
        <Header
          title="Rest Time Setting"
        />
        <View style={tw('flex-1 items-center justify-center')}>
          <View style={tw('flex-1 items-center justify-center')}>
            <View>
              <TextInput
                ref={myInput}
                placeholder="每組休息秒數"
                style={tw('text-2xl')}
                value={restTimes}
                onChangeText={(textValue) => { setRestTimes(textValue); }}
                onSubmitEditing={() => navigation.navigate({ name: 'Home', params: { restTimes } })}
              />
            </View>
            <TouchableOpacity style={tw('mt-8 rounded  bg-indigo-500')} onPress={() => navigation.navigate({ name: 'Home', params: { restTimes } })}>
              <Text style={tw('px-3 py-2 text-white')}>確認</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RestSettingScreen;
