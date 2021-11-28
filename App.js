import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from '@/navs/StackNav';

export default function App () {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}
