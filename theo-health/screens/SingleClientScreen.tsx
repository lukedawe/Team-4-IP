import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Navigation from '../navigation';
import useColorScheme from '../hooks/useColorScheme';
import GetAllUserSessions from "../components/GetAllUserSessions";
import { ScrollView } from "react-native-gesture-handler";
import { Card, ListItem, Icon, Button } from 'react-native-elements'

export default function SingleClientScreen({ route, navigation }: RootTabScreenProps<'SingleClientTab'>) {
  const { id, type } = route.params;
  const name = useState("");
  // const leftquad = useState("");
  // const rightquad = useState("");
  // const leftham = useState("");
  // const rightham = useState("");
  // const emailpref = useState("");
  // const phonepref = useState("");
  // const smspref = useState("");
  // const email = useState("");
  // const phoneno = useState("");
  const colorScheme = useColorScheme();
  const [userName, setuserName] = useState("");
  const [success, setsuccess] = useState(Boolean);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const back = () => {

  };
  useEffect(() => {
    
    if (!success) {
      sessionData();
      getuserName();
    }
    else {

    }
  });

  const getuserName = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/users/get_user_name', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          user_type: "athlete"
        })
      }
      )
      const json = await response.json();
      console.log(json);
      setuserName(json.user_name);
      setsuccess(true);
    } catch (error) {
      console.error(error);
      setsuccess(false)
    } finally {
      setLoading(false);
    }
  }

  const sessionData = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/sessions/get_user_sessions', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          athlete_id: id
        })
        
      }
      )
      const json = await response.json();
      setData(json.sessions);
      setsuccess(true);
    } catch (error) {
      console.error(error);
      setsuccess(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaProvider>
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading_text}>
            welcome back {userName}
          </Text>
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View style={styles.subContainer}>

          <Text style={styles.heading_text}>
            recent sessions
          </Text>
          <View style={styles.session_card_container}>
            {isLoading ? <ActivityIndicator /> : (
              data.map((data, key) => {
                return (
                  <Card containerStyle={styles.card}>
                    <Card.Title style={styles.card_title}>Session ID: {data.id}</Card.Title>

                    <Card.Divider />
                    <Text style={styles.card_content}>
                      Date: {data.date}
                    </Text>

                    <Text style={styles.card_content}>
                      Comment: {data.comment}
                    </Text>

                    <Button onPress={() => navigation.navigate('HeatmapTab', {data.id})}
                      icon={<Icon name='code' color='#ffffff' />}
                      buttonStyle={styles.button_style }
                      title='VIEW NOW'
                    />
                  </Card>
                )
              })
            )}
          </View>

        </View>

      </View>
      {/* <Navigation colorScheme={colorScheme}/> */}
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
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
  session_card_container: {
    //flexDirection: 'column',
    alignContent: "center",
    backgroundColor: "#434747"
  },
  card: {
    borderColor: '#f36d21',
    backgroundColor: '#f36d21',
    borderRadius: 10,
    //width: screen.width * 0.15,

  },
  card_title: {
    color: '#FFFFFF',

  },
  card_content: {
    fontSize: 16,

    //paddingLeft: 5,
    paddingRight: 5,

    color: '#FFFFFF',
    textAlign: 'left',
    //flexWrap: 'wrap',

  },
  button_style: {
    borderRadius: 10,
    backgroundColor: '#0297a2',

    marginLeft: 0,
    marginTop: 10,
    marginRight: 0,
    marginBottom: 0
  },
  mainContainer: {
    //flex: 1,
    backgroundColor: '#1D2121',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingContainer: {
    backgroundColor: '#1D2121',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: "5%",
    width: "80%",
  },
  subContainer: {
    backgroundColor: '#434747',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingLeft: "7%",
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
  muscleimg: {
    maxWidth: "100%",
    maxHeight: "100%",
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
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  label_text: {
    color: "#E6C59E",
    padding: 10
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
  musclegroup: {
    flexDirection: "row",
  },
  flatList: {
    flexGrow: 0,
    flexDirection: "row",
  },
  listItem: {
    backgroundColor: "#f36d21",
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 5,
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