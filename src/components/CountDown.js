import * as React from 'react';
import {
  Vibration,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  StyleSheet,
  TextInput,
} from 'react-native';

import tw from 'tailwind-rn';

const CountDown = () => {
  const { width: devicesWidth, height: devicesHeight } = Dimensions.get('window');
  const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
  const ITEM_SIZE = devicesWidth * 0.38;
  const ITEM_SPACING = (devicesWidth - ITEM_SIZE) / 2;

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [duration, setDuration] = React.useState(timers[0]);
  const inputRef = React.useRef();
  const timerAnimation = React.useRef(new Animated.Value(devicesHeight)).current;
  const textInputAnimation = React.useRef(new Animated.Value(timers[0])).current;
  const buttonAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const listener = textInputAnimation.addListener(({ value }) => {
      inputRef?.current?.setNativeProps({
        text: Math.ceil(value).toString(),
      });
    });

    return () => {
      textInputAnimation.removeAllListeners(listener);
      textInputAnimation.removeAllListeners();
    };
  });

  const animation = React.useCallback(() => {
    textInputAnimation.setValue(duration);
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(timerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(textInputAnimation, {
          toValue: 0,
          duration: duration * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(timerAnimation, {
          toValue: devicesHeight,
          duration: duration * 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(400),
    ]).start(() => {
      Vibration.cancel();
      Vibration.vibrate();
      textInputAnimation.setValue(duration);
      // buttonAnimation.setValue(0);
      Animated.timing(buttonAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [duration]);

  const opacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const translateY = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const textOpacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const colors = {
    black: '#323F4E',
    red: '#F76A6A',
    text: '#ffffff',
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black,
    },
    roundButton: {
      width: 80,
      height: 80,
      borderRadius: 80,
      backgroundColor: colors.red,
    },
    text: {
      fontSize: ITEM_SIZE * 0.8,
      fontFamily: 'Menlo',
      color: colors.text,
      fontWeight: '900',
    },
  });

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
          {
            opacity,
            transform: [{
              translateY,
            }],
          },
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
        <Animated.View
          style={[
            tw('absolute items-center justify-center'),
            {
              width: ITEM_SIZE,
              alignSelf: 'center',
              opacity: textOpacity,
            },
          ]}
        >
          <TextInput
            ref={inputRef}
            style={styles.text}
            defaultValue={duration.toString()}
          />
        </Animated.View>
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
          style={[{ flexGrow: 0, opacity }]}
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

            return (
              <View style={[{ width: ITEM_SIZE }, tw('items-center justify-center')]}>
                <Animated.Text
                  style={[
                    styles.text,
                    {
                      opacity: scrollX.interpolate({
                        inputRange,
                        outputRange: [0.4, 1, 0.4],
                      }),
                      transform: [{
                        scale: scrollX.interpolate({
                          inputRange,
                          outputRange: [0.7, 1, 0.7],
                        }),
                      }],
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
