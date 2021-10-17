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
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, ActivityIndicator, } from 'react-native';
import ChartConfig from '../constants/ChartConfig';
import { Picker } from "@react-native-picker/picker";

//screen that displays graphs related to the users progress
export default function ProgressScreen({ route, navigation }: RootTabScreenProps<'ProgressTab'>) {
  const { userid, id, type } = route.params;
  const back = async () => {
    if (userid == id) {
      navigation.navigate('AthleteTab', { userid: userid, id: id, type: type })
    }
    else {
      navigation.navigate('SingleClientTab', { userid: userid, id: id, type: type })
    }
  }
  //const id = 23;
  const [selectedMuscle, setSelectedMuscle] = useState("");
  // variables for the user sessions
  const [isLoading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [success, setsuccess] = useState(Boolean);
  // variables for the user's session data
  const [avgMuscleData, setavgMuscleData] = useState([]);


  // get the recent user sessions
  const getAvgMuscleData = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/sessions/average_muscle_usage_progress', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          athlete_id: 2,
          no_of_sessions: 5
        })
      }
      )
      const json = await response.json();
      setavgMuscleData(json.sessions)
      console.log(json);
      setsuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!success) {
      getAvgMuscleData();
      //getuserName();
      console.log(avgMuscleData)
    }
  });


  // const muscle_activation = () => {
  //   data.map((data2, key) => {
  //     exerciseData(data2.id);
  //   }

  // }

  return (

    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity
          onPress={back}>
          <Text style={styles.back_button}>back</Text>
        </TouchableOpacity>
        <Text style={TextStyles.titleText} >
          progress
        </Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <MusclePicker /> */}

      <ScrollView>
        <Picker
          selectedValue={selectedMuscle}
          onValueChange={(itemValue, itemIndex) => setSelectedMuscle(itemValue)}>
          <Picker.Item label="Left hamstring" value="left hamstring" />
          <Picker.Item label="Right hamstring" value="right hamstring" />
          <Picker.Item label="Left quad" value="left quad" />
          <Picker.Item label="Right quad" value="right quad" />
        </Picker>
        <View>
          <Text>
            {/* This is the data {avgMuscleData} */}
          </Text>
          {isLoading ? <ActivityIndicator /> : (
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
                      Math.random() * 100
                      // avgMuscleData[0].selectedMuscle,
                      // avgMuscleData[1].selectedMuscle,
                      // avgMuscleData[2].selectedMuscle,
                      // avgMuscleData[3].selectedMuscle,
                      // avgMuscleData[4].selectedMuscle,
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
          )}
          {/* <MusclePicker/> */}
        </View>
        <ExerciseProgressChart />
        <ExcerciseStackedBarChart />

        <Text style={{paddingLeft: 5, paddingRight:10, paddingBottom: 20}}>
        {"\n"}
              Graph 1 : The line graph shows the average usage of muscles for the last 5 sessions {"\n"} {"\n"}
              Graph 2 : The doughnut chart shows the increase in usage for each muscle over your last 5 sessions {"\n"} {"\n"}
              Graph 3 : The bar chart shows the share of work that each muscle has done for each of your last two sessions

        </Text>
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft:20,
  },
  headingContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: "5%",
    width: "80%",
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

