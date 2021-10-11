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
      <TouchableOpacity style={styles.loginBtn} onPress={back}>
          <Text>back</Text>
      </TouchableOpacity>
      <View style={styles.subContainer}>

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
            onChangeText={(email) => setEmail(email)}
            value={email}
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
            onChangeText={(password) => setPassword(password)}
            value={password}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={submit}>
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
});
