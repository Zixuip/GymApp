import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from 'tailwind-rn';

import Header from '@/components/Header';

const GuideScreen = ({ navigation }) => {
  const flatList = [
    {
      name: '鍛煉',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet explicabo magnam cum totam dignissimos esse libero aperiam, molestiae, animi id repellendus dicta ipsum odit inventore. Ratione quibusdam numquam illum. Nesciunt.',
    },
    {
      name: '休息',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet explicabo magnam cum totam dignissimos esse libero aperiam, molestiae, animi id repellendus dicta ipsum odit inventore. Ratione quibusdam numquam illum. Nesciunt.',
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <View style={tw('mb-4 pb-4 flex-row items-center border-b border-gray-300')}>
        <View style={tw('w-12 h-12 mr-6 bg-black')} />
        <View>
          <Text style={tw('text-xl')}>{item.name}</Text>
          <Text style={tw('w-1/5')}>{item.content}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={tw('flex-1')}>
      <View style={tw('flex-1')}>
        <Header
          navigation={navigation}
          title="快速開始"
        />
        <FlatList
          data={flatList}
          renderItem={renderItem}
          keyExtractor={(_, index) => index}
          style={tw('flex-1 mt-4 px-4')}
        />
      </View>
    </SafeAreaView>
  );
};

export default GuideScreen;
