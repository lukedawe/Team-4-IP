import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Card, ListItem, Icon, Button } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function ListViewScreen({ route, navigation }: RootTabScreenProps<'ListViewTab'>) {
  const { id, type } = route.params;
  const [userName, setuserName] = useState("");
  const [success, setsuccess] = useState(Boolean);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {

    if (!success) {
      clientData();
      getuserName();
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
          user_type: "personal trainer"
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

  const clientData = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/users/pt_get_clients', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pt_id: id
        })

      }
      )
      const json = await response.json();
      console.log(json);
      console.log(json.clients);
      setData(json.clients);
      setsuccess(true);
    } catch (error) {
      console.error(error);
      setsuccess(false);
    } finally {
      setLoading(false);
    }
  }


  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('LogInTab')}>
          <Text style={styles.back_button}>sign out</Text>
        </TouchableOpacity>
        <Text style={styles.heading_text}>
          welcome back {userName}
        </Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.subContainer}>
        <Text style={styles.sub_text}>
          your clients
        </Text>
        <View style={styles.session_card_container}>
          {isLoading ? <ActivityIndicator /> : (
            data.map((data, key) => {
              return (
                <Card containerStyle={styles.card}>
                  <Card.Title style={styles.card_title}>Client Name: {data.name}</Card.Title>

                  <Card.Divider />
                  <Text style={styles.card_content}>
                    ID: {data.id}
                  </Text>

                  <Text style={styles.card_content}>
                    email: {data.email}
                  </Text>

                  <Button onPress={() => navigation.navigate('SingleClientTab', { userid: id, id: data.id, type: "personal trainer" })}
                    buttonStyle={styles.button_style}
                    title='select client'
                  />
                </Card>
              )
            })
          )}
        </View>
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
    flex: 1,
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
  back_button: {
    height: 30,
    justifyContent: 'flex-start',
    color: "#f36d21",
  },
  info_text: {
    color: "#E6C59E",
  },
});