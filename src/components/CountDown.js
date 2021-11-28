import React, { useRef, useState } from 'react';
import { View, Dimensions, TouchableOpacity, Animated, StyleSheet, Text } from 'react-native';

import tw from 'tailwind-rn';

const CountDown = () => {
  const { width: devicesWidth, height: devicesHeight } = Dimensions.get('window');
  const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
  const ITEM_SIZE = devicesWidth * 0.38;
  const ITEM_SPACING = (devicesWidth - ITEM_SIZE) / 2;


  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [duration, setDuration] = useState(timers[0]);
  const timerAnimation = useRef(new Animated.Value(devicesHeight)).current;
  const animation = React.useCallback(() => {

    Animated.sequence([
      Animated.timing(timerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(timerAnimation, {
        toValue: devicesHeight,
        duration: duration * 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {

    });
  }, [duration]);

  const colors = {
    black: '#323F4E',
    red: '#F76A6A',
    text: '#ffffff',
  };

  return (
    <View style={tw('flex-1')}>
      <Animated.View
        style={[StyleSheet.absoluteFillObject, {
          width: devicesWidth,
          height: devicesHeight,
          backgroundColor: colors.red,
          transform: [{
            translateY: timerAnimation,
          }],
        }]}
      />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          tw('items-center justify-end'),
        ]}
      >
        <TouchableOpacity onPress={animation}>
          <View style={tw('w-12 h-12 rounded-full bg-red-500')} />
        </TouchableOpacity>
      </Animated.View>
      <View
        style={[
          { top: devicesHeight / 3 },
          tw('absolute '),
        ]}
      >
        <Text>{duration}</Text>
        <Animated.FlatList
          data={timers}
          keyExtractor={item => item.toString()}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_SIZE}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal: ITEM_SPACING,
          }}
          style={[{ flexGrow: 0 }]}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={event => {
            const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_SIZE);
            setDuration(timers[index]);
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ];

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
            });

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.7, 1, 0.7],
            });
            return (
              <View style={[{ width: ITEM_SIZE }, tw('items-center justify-center')]}>
                <Animated.Text
                  style={[
                    tw('font-bold text-white'),
                    {
                      fontSize: 100,
                      opacity,
                      transform: [{ scale }],
                    },
                  ]}
                >
                  {item}
                </Animated.Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default CountDown;
