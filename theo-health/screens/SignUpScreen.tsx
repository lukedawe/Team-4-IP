import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

//screen to create an account
export default function SignUpScreen({ navigation }: RootTabScreenProps<'SignUpTab'>) {
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, seterrorMessage] = useState("");

    //sends the users input to the api to try and create an account
    const submit = async () => {
      try {
        if (email=="" || password=="" || name==""){
          throw Error;
        }
          const response = await fetch(
              'http://localhost:5000/users/add_user ', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  user_type: "athlete", 
                  name: name, 
                  email: email, 
                  password: password 
              })
          }
          )
          const json = await response.json();
          navigation.navigate('LogInTab');
      } catch (error) {
          console.error(error);
          seterrorMessage("An error occured while signing up");
      }
  }

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
          sign up
        </Text>

        <Text style={styles.label_text}>
          name
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="name"
            placeholderTextColor="#434747"
            onChangeText={(name) => setname(name)}
            value={name}
          />
        </View>

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

        <Text style={styles.error_text}>
          {errorMessage}
        </Text>

        <TouchableOpacity style={styles.signUpBtn} onPress={submit}>
          <Text>sign up</Text>
        </TouchableOpacity>

        <Text style={styles.info_text}>
          already have an account?
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('LogInTab')}>
          <Text style={styles.log_in_button}>log in</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  signUpBtn: {
    width: "25%",
    borderRadius: 10,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#f36d21",
  },
  log_in_button: {
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
  error_text: {
    color:"red",
    paddingTop: 10
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
