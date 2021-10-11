import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { 
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function ListViewScreen({ navigation }: RootTabScreenProps<'ListViewTab'>) {
    const [firstname] = useState("");

  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo.png')}
        />
     </View>
     <View style={styles.subContainer}>
       <Text style={styles.heading_text}>
         welcome back,
         #api-username#
       </Text>
     </View>
     <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
     <FlatList
        style={styles.flatList}
        horizontal={true}
        data={CLIENTDATA}
        ListHeaderComponent={
          <Text style={styles.heading_text}>
            clients
          </Text>
        }
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.name}</Text>
        )}
        keyExtractor={item => item.id}
      />
      <FlatList
        style={styles.flatList}
        horizontal={true}
        data={SESSIONDATA}
        ListHeaderComponent={
          <Text style={styles.heading_text}>
            sessions
          </Text>
        }
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.datetime}</Text>
        )}
        keyExtractor={item => item.id}
      />
      <Button
        style={styles.listItem}
        title="new session"
        onPress={() => Alert.alert('new session button pressed')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  listItem: {
    backgroundColor: "#f36d21",
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  

  mainContainer: {
    flex: 1,
    backgroundColor: '#1D2121',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    backgroundColor: '#1D2121',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "80%",
  },
  subContainer: {
    backgroundColor: '#434747',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: "7%",
    paddingBottom: "5%",
    paddingTop: "5%",
    width: "80%",
    borderRadius: 10,
  },
  logo: {
    maxWidth:"100%",
    maxHeight:"40%",
    width: 225,
    height: 125,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  heading_text: {
    color:"white",
    fontSize: 35,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  label_text: {
    color:"#E6C59E",
    padding: 10
  },
  info_text: {
    color:"#E6C59E",
  },
  inputView: {
    backgroundColor: "#1D2121",
    borderRadius: 10,
    width: "90%",
    height: 45,
  },
  flatList: {
    flexGrow: 0,
    flexDirection: "row",
    
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
  },
  {
    id: 21,
    name: 'jane doe',
  },
  {
    id: 22,
    name: 'john smith',
  },
  {
    id: 23,
    name: 'joe bloggs',
  },
  {
    id: 31,
    name: 'jane doe',
  },
  {
    id: 32,
    name: 'john smith',
  },
  {
    id: 33,
    name: 'joe bloggs',
  },
  {
    id: 41,
    name: 'jane doe',
  },
  {
    id: 42,
    name: 'john smith',
  },
  {
    id: 43,
    name: 'joe bloggs',
  },
  {
    id: 51,
    name: 'jane doe',
  },
  {
    id: 52,
    name: 'john smith',
  },
  {
    id: 53,
    name: 'joe bloggs',
  },
  {
    id: 61,
    name: 'jane doe',
  },
  {
    id: 62,
    name: 'john smith',
  },
  {
    id: 63,
    name: 'joe bloggs',
  },
  {
    id: 71,
    name: 'jane doe',
  },
  {
    id: 72,
    name: 'john smith',
  },
  {
    id: 73,
    name: 'joe bloggs',
  },
  {
    id: 81,
    name: 'jane doe',
  },
  {
    id: 82,
    name: 'john smith',
  },
  {
    id: 83,
    name: 'joe bloggs',
  },
  {
    id: 91,
    name: 'jane doe',
  },
  {
    id: 92,
    name: 'john smith',
  },
  {
    id: 93,
    name: 'joe bloggs',
  },
  {
    id: 101,
    name: 'jane doe',
  },
  {
    id: 102,
    name: 'john smith',
  },
  {
    id: 103,
    name: 'joe bloggs',
  },

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