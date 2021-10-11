import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function SingleClientScreen({ navigation }: RootTabScreenProps<'SingleClientTab'>) {
  const firstname = useState("");
  const lastname = useState("");
  const leftquad = useState("");
  const rightquad = useState("");
  const leftham = useState("");
  const rightham = useState("");
  const emailpref = useState("");
  const phonepref = useState("");
  const smspref = useState("");
  const email = useState("");
  const phoneno = useState("");
  const back = () => {

  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo.png')}
        />
      </View>
      <TouchableOpacity style={styles.title} onPress={back}>
          <Text>back</Text>
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <Text style={styles.heading_text}>
         #api-client-firstname#
         #api-client-lastname#
        </Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.subContainer}>
        <Text style={styles.heading_text}>
          muscle health
        </Text>
        <View>
          <View style={styles.musclegroup}>
            <Image
            style={styles.muscleimg}
            source={require('../assets/images/icon.png')}
            />
            <View>
              <Text style={styles.heading_text}>
                Quadriceps
              </Text>
              <Text style={styles.TextInput}>
                left - poor  right - good
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.musclegroup}>
            <Image
            style={styles.muscleimg}
            source={require('../assets/images/icon.png')}
            />
            <Text style={styles.heading_text}>
              Hamstrings
            </Text>
            <Text style={styles.TextInput}>
                left - poor  right - good
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.heading_text}>
          recent sessions
        </Text>
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
      </View>
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
  muscleimg: {
    maxWidth:"100%",
    maxHeight:"100%",
    width: 225,
    height: 125,
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
  musclegroup: {
    flexDirection: "row",
  },
  flatList: {
    flexGrow: 0,
    flexDirection: "row",
  },
});

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