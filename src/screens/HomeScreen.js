import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from 'tailwind-rn';
import InformationCircle from '@/assets/svgs/InformationCircle.svg';
import CountDown from '../components/CountDown';

const HomeScreen = ({ navigation, route }) => {
  const flatList = [
    {
      name: 'Exercise',
      content: '00:00',
      componentName: 'Exercise',
    },
    {
      name: 'Rest',
      content: '00:00',
      componentName: 'Rest',
    },
    {
      name: 'Repeat',
      content: '1',
      componentName: 'Repeat',
    },
  ];

  if (route.params) {
    flatList.map(item => {
      if (item.name === 'Repeat') {
        item.content = route.params.repeatTimes;
      }
    });
  }


  return (
    <SafeAreaView style={tw('flex-1 bg-gray-800')}>
      <View style={tw('relative items-center')}>
        <Text style={tw('text-lg')}>計時器</Text>
        <View style={tw('absolute top-0 right-0 mr-4')}>
          <TouchableOpacity onPress={() => navigation.navigate({ name: 'Guide' })}>
            <InformationCircle style={tw('w-7 h-7 text-black')} />
          </TouchableOpacity>
        </View>
      </View>

      <CountDown style={tw('flex-1 bg-black')} />

      {/* <View style={tw('mt-4 px-4')}>
        {
          flatList.map((item, index) => {
            return (
              <View key={index} style={tw('mb-4')}>
                <TouchableOpacity style={tw('flex-row justify-between px-4 py-5 rounded bg-indigo-500')} onPress={() => navigation.navigate({ name: item.componentName })}>
                  <Text style={tw('text-xl text-white')}>{item.name}</Text>
                  <Text style={tw('text-xl text-white')}>{item.name === 'Repeat' ? 'X' + item.content : item.content}</Text>
                </TouchableOpacity>
              </View>
            );
          })
        }

        <View style={tw('mt-4 flex-row -mx-2')}>
          <View style={tw('w-1/2 px-2')}>
            <View style={tw('py-2 items-center rounded bg-green-500')}>
              <Text style={tw('text-lg text-white')}>總鍛煉時間</Text>
              <Text style={tw('text-2xl text-white')}>00:00</Text>
            </View>
          </View>
          <View style={tw('w-1/2 px-2')}>
            <View style={tw('py-2 items-center rounded bg-green-500')}>
              <Text style={tw('text-lg text-white')}>總休息時間</Text>
              <Text style={tw('text-2xl text-white')}>00:00</Text>
            </View>
          </View>
        </View>

        <View style={tw('mt-8 items-center')}>
          <TouchableOpacity style={tw('w-28 h-28 items-center justify-center rounded-full bg-red-500')}>
            <Text style={tw('text-3xl text-white')}>開始</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
