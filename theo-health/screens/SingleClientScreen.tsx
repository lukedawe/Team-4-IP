import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import useColorScheme from '../hooks/useColorScheme';
import { ScrollView } from "react-native-gesture-handler";
import { Card, ListItem, Icon, Button } from 'react-native-elements'

//screen for a selected client that shows their most recent sessions, their progress and an option to record live data
export default function SingleClientScreen({ route, navigation }: RootTabScreenProps<'SingleClientTab'>) {
  const { userid, id, type } = route.params;
  const colorScheme = useColorScheme();
  const [userName, setuserName] = useState("");
  const [success, setsuccess] = useState(Boolean);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {

    if (!success) {
      sessionData();
      getuserName();
    }
  });

  //gets the client's name from the database
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

  //gets the clients most recent sessions
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
          <TouchableOpacity onPress={() => navigation.navigate('ListViewTab', { id: userid, type: "personal trainer" })}>
            <Text style={styles.back_button}>back</Text>
          </TouchableOpacity>
          <Text style={styles.heading_text}>
            {userName}
          </Text>
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        {/* button to go to the record live session page */}
        <Button
          onPress={() => navigation.navigate('HeatmapRecordTab', {userid: userid, id: id, type:type, sessionid: 1})}
          buttonStyle={styles.progress_button}
          title='record live session'
        />
        {/* button to go to the progress tab */}
        <Button
          onPress={() => navigation.navigate('ProgressTab', { userid: userid, id: id, type: type })}
          buttonStyle={styles.progress_button}
          title='check progress'
        />
        <View style={styles.subContainer}>
          <Text style={styles.sub_text}>
            recent sessions
          </Text>
          {/* list of the clients most recent sessions */}
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

                    <Button onPress={() => navigation.navigate('HeatmapTab', {userid: userid, id: id, type:type, sessionid: data.id})}
                      buttonStyle={styles.button_style }
                      title='view session heatmap'
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
  progress_button: {
    borderRadius: 10,
    backgroundColor: '#f36d21',
    marginLeft: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 30,
    width: "100%",
    fontSize: 30,
  },
  mainContainer: {
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
    paddingBottom: "5%",
    paddingTop: "5%",
    width: "80%",
    borderRadius: 10,
  },
  back_button: {
    height: 30,
    justifyContent: 'flex-start',
    color: "#f36d21",
  },
  heading_text: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  sub_text: {
    color: "white",
    fontSize: 30,
    paddingBottom: 10,
    alignSelf: "flex-start",
    paddingLeft: "7%"
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