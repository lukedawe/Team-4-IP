import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Tab One hi</Text>
    //   <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    //   <View style={styles.container}>
        
    //   <Text>Open up App.js to start working on your app!</Text>
    // </View>
    //   {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    // </View>
    <View style={styles.container}>
      <View style={styles.container2}>
        {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
  
        <StatusBar style="auto" />

        <Text style={styles.heading_text}>
          log in
        </Text>

        <Text style={styles.label_text}>
          email
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="email"
            placeholderTextColor="#434747"
          />
        </View>
  
        <Text style={styles.label_text}>
          password
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="password"
            placeholderTextColor="#434747"
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn}>
          <Text>log in</Text>
        </TouchableOpacity>

        <Text style={styles.info_text}>
          don't have an account?
        </Text>

        <TouchableOpacity>
          <Text style={styles.sign_up_button}>sign up</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D2121',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    backgroundColor: '#434747',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: "7%",
    paddingBottom: "5%",
    paddingTop: "5%",
    width: "80%",
    //height: "50%",
    borderRadius: 10,
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
    //paddingLeft: 10,
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
    //marginLeft: 10,
  },
  inputView: {
    backgroundColor: "#1D2121",
    borderRadius: 10,
    width: "90%",
    height: 45,
  },
});
