import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { 
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function ListViewScreen({ navigation }: RootTabScreenProps<'ListViewTab'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>welcome back,</Text>
      <Text style={styles.title}>api-username</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/ListViewScreen.tsx" />
      <FlatList
        style={{
          flexGrow: 0,
        }}
        horizontal={true}
        data={CLIENTDATA}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}</Text>
        )}
        keyExtractor={item => item.id}
      />
      <FlatList
        style={{
          flexGrow: 0,
        }}
        horizontal={true}
        data={SESSIONDATA}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.datetime}</Text>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
  list: {
    flex: 3,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  item: {
    backgroundColor: '#ff0000',
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  titletext: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

/**
 * This is just sample data to use with the lists
 */
const CLIENTDATA = [
  {
    id: 1,
    name: 'jane doe',
  },
  {
    id: 2,
    name: 'john smith',
  },
  {
    id: 3,
    name: 'joe bloggs',
  }
]

const SESSIONDATA = [
  {
    id: 1,
    datetime: 'session 1',
  },
  {
    id: 2,
    datetime: 'session 2',
  },
  {
    id: 3,
    datetime: 'session 3',
  },
]