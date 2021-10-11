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
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.name}</Text>
        )}
        keyExtractor={item => item.id}
      />
      <FlatList
        style={styles.flatList}
        horizontal={true}
        data={SESSIONDATA}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.datetime}</Text>
        )}
        keyExtractor={item => item.id}
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
  list: {
    flex: 3,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  listItem: {
    backgroundColor: '#ff0000',
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 10,
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
    justifyContent: 'center',
    width: "80%",
  },
  subContainer: {
    backgroundColor: '#434747',
    alignItems: 'flex-start',
    justifyContent: 'center',
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
  loginBtn: {
    width: "25%",
    borderRadius: 10,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#f36d21",
  },
  sign_up_button: {
    height: 30,
    justifyContent: 'flex-start',
    color: "#f36d21",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 10,
    color: "white"
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