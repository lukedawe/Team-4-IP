import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import EditScreenInfo from '../components/EditScreenInfo';
import SessionCards from '../components/SessionCards';
import getAllUserSessions from '../components/GetAllUserSessions';


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      
      <SessionCards/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});