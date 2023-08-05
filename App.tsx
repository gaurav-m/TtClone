/**
 * Tik Tok Clone
 * As Described by Crossoveer at
 * https://www.figma.com/proto/Q6mHDKGcGAZtJAUAZ50pww/TeachTok-Assessment?page-id=0%3A1&type=design&node-id=1-3227&viewport=1049%2C687%2C0.21&scaling=contain&starting-point-node-id=1%3A3227&mode=design
 * 
 * by Gaurav Mittal
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppTabs from './src/components/AppMainTabs';
import Colors from './src/constants/Colors';

function App() {
  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar
        barStyle={'light-content'}
        hidden={false}
        animated={true}
        translucent={true}
        backgroundColor='transparent'
      />
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_SCREEN_DARK,
  },
});

export default App;
