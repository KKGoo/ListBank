
import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import List from './src/components/List';


function App(): JSX.Element {


  const isDarkMode = useColorScheme() === 'dark';


  return (
    <SafeAreaView style={styles.hero}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
        <List/>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  hero: {
    backgroundColor: 'white'
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default App;
