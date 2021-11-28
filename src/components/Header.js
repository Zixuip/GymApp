import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import tw from 'tailwind-rn';
import ChevronLeft from '@/assets/svgs/ChevronLeft.svg';

const Header = ({ urlName, left, title, right }) => {
  const navigation = useNavigation();
  const Left = left;
  const Right = right;

  return (
    <View style={tw('relative flex-row items-center')} >
      <TouchableOpacity
        style={tw('ml-4 absolute top-0 justify-center items-center z-10')}
        onPress={() => urlName ? navigation.navigate({ name: urlName }) : navigation.goBack()}
      >
        {
          left ?
            <Left /> :
            <ChevronLeft style={tw('w-7 h-7 text-black')} />
        }
      </TouchableOpacity>
      <View style={tw('flex-auto items-center')}>
        <Text numberOfLines={1} style={tw('text-lg')}>
          {title ? title : 'New Screen'}
        </Text>
      </View>
      <View style={tw('mr-4')}>
        {
          right ?
            <Right /> : null
        }
      </View>
    </View>
  );
};

export default Header;
