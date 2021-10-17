import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import SingleClientScreen from "../screens/SingleClientScreen";
import SignUpScreen from "../screens/SignUpScreen"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

let userData = undefined

//screen for the user to log into their account
export default function LogInScreen({ navigation }: RootTabScreenProps<'LogInTab'>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");
  const [success, setsuccess] = useState(Boolean);
  const [dataArray, setdataArray] = useState([]);

  useEffect(() => {
    if (success) {
      console.log(data)
      //split the data up
      if (data.message == 'Request returned nothing') {
        seterrorMessage("Incorrect email or password");
        setsuccess(false)
      }
      else {
        console.log(dataArray[0])
        console.log(dataArray[1])
        dataArray.push(data.id)
        dataArray.push(data.user_type)
        userData = data
        console.log(dataArray[0])
        console.log(dataArray[1])
        if (dataArray[1] == "athlete") {
          navigation.navigate('AthleteTab', { id: dataArray[0], type: dataArray[1] });
        }
        else {
          navigation.navigate('ListViewTab', { userid:dataArray[0], id: dataArray[0], type: dataArray[1] });
        }
        setsuccess(false)
        seterrorMessage("");
        dataArray.splice(0, dataArray.length);
      }
    }
  }
  );

  //send the users input data to the api to try and log in
  const submit = async () => {
    try {
      if (email == "" || password == "") {
        throw Error;
      }
      const response = await fetch(
        'http://localhost:5000/users/get_user_id ', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }
      )
      const json = await response.json();
      console.log(json);
      setData(json);
      setsuccess(true);

    } catch (error) {
      console.error(error);
      seterrorMessage("Incorrect email or password");
      setsuccess(false)
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

        <Text style={styles.error_text}>
          {errorMessage}
        </Text>

        <TouchableOpacity style={styles.loginBtn} onPress={submit}>
          <Text>log in</Text>
        </TouchableOpacity>

        <Text style={styles.info_text}>
          don't have an account?
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('SignUpTab')}>
          <Text style={styles.sign_up_button}>sign up</Text>
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
    maxWidth: "100%",
    maxHeight: "40%",
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
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  label_text: {
    color: "#E6C59E",
    padding: 10
  },
  error_text: {
    color: "red",
    paddingTop: 10
  },
  info_text: {
    color: "#E6C59E",
  },
  inputView: {
    backgroundColor: "#1D2121",
    borderRadius: 10,
    width: "90%",
    height: 45,
  },
});