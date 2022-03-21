import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from 'tailwind-rn';
import InformationCircle from '@/assets/svgs/InformationCircle.svg';
import CountDown from '../components/CountDown';

const HomeScreen = ({ navigation, route }) => {
  const flatList = [
    {
      name: '每組鍛煉時間',
      value: '1',
      componentName: 'Exercise',
    },
    {
      name: '組間休息時間',
      value: '1',
      componentName: 'Rest',
    },
    {
      name: '重複次數',
      value: '1',
      componentName: 'Repeat',
    },
  ];

  if (route.params) {
    console.log(route.params);
    flatList.map(item => {
      if (item.componentName === 'Repeat' && route.params.repeatTimes) {
        item.value = route.params.repeatTimes;
      }

      if (item.componentName === 'Exercise' && route.params.exerciseTimes) {
        item.value = route.params.exerciseTimes;
      }

      if (item.componentName === 'Rest' && route.params.restTimes) {
        item.value = route.params.restTimes;
      }
    });
  }

  function totalExerciseTimeFn () {
    // 1min = 60s
    // 1h = 60min = 3600s
    // 1d = 24h = 1440min = 86400
    // 8000s -> 2h + 13min + 20s
    const hours = Math.floor(Number(flatList[0].value * flatList[2].value) / 3600).toString().padStart(2, '0');
    const mins = Math.floor((Number(flatList[0].value * flatList[2].value) % 3600 / 60)).toString().padStart(2, '0');
    const second = Math.floor((Number(flatList[0].value * flatList[2].value) % 3600 % 60));
    return hours + ':' + mins + ':' + second;
  }

  function totalRestTimeFn () {
    // 1min = 60s
    // 1h = 60min = 3600s
    // 1d = 24h = 1440min = 86400
    // 8000s -> 2h + 13min + 20s
    const hours = Math.floor(Number(flatList[1].value * flatList[2].value) / 3600).toString().padStart(2, '0');
    const mins = Math.floor((Number(flatList[1].value * flatList[2].value) % 3600 / 60)).toString().padStart(2, '0');
    const second = Math.floor((Number(flatList[1].value * flatList[2].value) % 3600 % 60));
    return hours + ':' + mins + ':' + second;
  }

  function start () {
    console.log(flatList);
  }

  return (
    <SafeAreaView style={tw('flex-1 bg-gray-800')}>
      <View style={tw('relative items-center text-white')}>
        <Text style={tw('text-lg text-white')}>計時器</Text>
        <View style={tw('absolute top-0 right-0 mr-4')}>
          <TouchableOpacity onPress={() => navigation.navigate({ name: 'Guide' })}>
            <InformationCircle style={tw('w-7 h-7 text-white')} />
          </TouchableOpacity>
        </View>
      </View>

      {/* <CountDown style={tw('flex-1 bg-black')} /> */}

      <View style={tw('mt-4 px-4')}>
        {
          flatList.map((item, index) => {
            return (
              <View key={index} style={tw('mb-4')}>
                <TouchableOpacity style={tw('flex-row justify-between px-4 py-5 rounded bg-indigo-500')} onPress={() => navigation.navigate({ name: item.componentName, params: { value: item.value } })}>
                  <Text style={tw('text-xl text-white')}>{item.name}</Text>
                  <Text style={tw('text-xl text-white')}>{item.componentName === 'Repeat' ? 'X' + item.value : item.value + 's'}</Text>
                </TouchableOpacity>
              </View>
            );
          })
        }

        <View style={tw('mt-4 flex-row -mx-2')}>
          <View style={tw('w-1/2 px-2')}>
            <View style={tw('py-2 items-center rounded bg-green-500')}>
              <Text style={tw('text-lg text-white')}>總鍛煉時間</Text>
              <Text style={tw('text-2xl text-white')}>{totalExerciseTimeFn()}</Text>
            </View>
          </View>
          <View style={tw('w-1/2 px-2')}>
            <View style={tw('py-2 items-center rounded bg-green-500')}>
              <Text style={tw('text-lg text-white')}>總休息時間</Text>
              <Text style={tw('text-2xl text-white')}>{totalRestTimeFn()}</Text>
            </View>
          </View>
        </View>

        <View style={tw('mt-8 items-center')}>
          <TouchableOpacity style={tw('w-28 h-28 items-center justify-center rounded-full bg-red-500')} onPress={() => start()}>
            <Text style={tw('text-3xl text-white')}>開始</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
