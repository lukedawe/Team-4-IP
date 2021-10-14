import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import PointGraph from "../components/PointGraph"
import { MusclePicker } from '../components/MusclePicker';
import ExerciseProgressChart from '../components/ExercisePieChart';
import { TextStyles } from '../constants/FontStyle';
import { ScrollView } from 'react-native-gesture-handler';
import ExcerciseStackedBarChart from '../components/StackedBarChart';
import { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import ChartConfig from '../constants/ChartConfig';

export default function ProgressScreen({ route, navigation }: RootTabScreenProps<'ProgressTab'>) {
  const id = 23;
  const [selectedMuscle, setSelectedMuscle] = useState();

  // variables for the user sessions
  const [_isLoading, _setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [success, setsuccess] = useState(Boolean);
  // variables for the user's session data
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  // get the recent user sessions
  const SessionData = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/sessions/average_muscle_usage_progress', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "athlete_id": id,
          "no_of_sessions": 5
        })
      }
      )
      const json = await response.json();
      setSessions(json)
      console.log(json);
      setsuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      _setLoading(false);
    }
  }

  useEffect(() => {
    if (!success) {
      SessionData();
      //   getuserName();
      console.log(data.sessions)
    }
  });


  // const muscle_activation = () => {
  //   data.map((data2, key) => {
  //     exerciseData(data2.id);
  //   }

  // }


export default function ProgressScreen({ route, navigation }: RootTabScreenProps<'ProgressTab'>) {
  console.log("hello?")
  const { userid, id, type } = route.params;
  const back = async () => {
    if (userid == id) {
      navigation.navigate('AthleteTab', { userid: userid, id: id, type: type })
    }
    else {
      navigation.navigate('SingleClientTab', { userid: userid, id: id, type: type })
    }
    
  }
  useEffect(() => {
  });

  console.log("hi")
  return (

    <View style={styles.container}>
      <TouchableOpacity
        onPress={back}>
        <Text style={styles.back_button}>back</Text>
      </TouchableOpacity>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <MusclePicker /> */}
      <Text style={TextStyles.titleText} >
        {'This year'}
        {"\n"}
        {"\n"}
      </Text>
      <ScrollView>
        <View>
          <Text>
            This is the data {data}
          </Text>
          <LineChart
            data={{
              labels: [" ", " ", " ", " ", " "],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                  ]
                }
              ]
            }}
            width={Dimensions.get("window").width - (Dimensions.get("window").width / 10)} // from react-native
            height={220}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={ChartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />

          {/* <MusclePicker/> */}
        </View>
        <ExerciseProgressChart />
        <ExcerciseStackedBarChart />
      </ScrollView>
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
  back_button: {
    height: 30,
    justifyContent: 'flex-start',
    color: "#f36d21",
  },
});

