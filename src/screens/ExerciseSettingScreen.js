import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '@/components/Header';
import tw from 'tailwind-rn';

const ExerciseSettingScreen = ({ route }) => {
  const [exerciseTimes, setExerciseTimes] = useState(null);

  const navigation = useNavigation();
  const myInput = useRef('myInput');

  useEffect(() => {
    myInput.current.focus();
    if (route.params && !exerciseTimes) {
      setExerciseTimes(route.params.value);
      console.log('hi');
    }
  }, []);

  return (
    <SafeAreaView style={tw('flex-1')}>
      <View style={tw('flex-1')}>
        <Header
          title="Exercise Time Setting"
        />
        <View style={tw('flex-1 items-center justify-center')}>
          <View style={tw('flex-1 items-center justify-center')}>
            <View>
              <TextInput
                ref={myInput}
                placeholder="每組鍛煉秒數"
                style={tw('text-2xl')}
                value={exerciseTimes}
                onChangeText={(textValue) => { setExerciseTimes(textValue); }}
                onSubmitEditing={() => navigation.navigate({ name: 'Home', params: { exerciseTimes } })}
              />
            </View>
            <TouchableOpacity style={tw('mt-8 rounded  bg-indigo-500')} onPress={() => navigation.navigate({ name: 'Home', params: { exerciseTimes } })}>
              <Text style={tw('px-3 py-2 text-white')}>確認</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExerciseSettingScreen;
