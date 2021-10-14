import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import PointGraph from "../components/PointGraph"
import { MusclePicker } from '../components/MusclePicker';
import ExerciseProgressChart from '../components/ExercisePieChart';
import { TextStyles } from '../constants/FontStyle';
import { ScrollView } from 'react-native-gesture-handler';
import ExcerciseStackedBarChart from '../components/StackedBarChart';
import { Picker } from "@react-native-picker/picker";
import ChartConfig from '../constants/ChartConfig';
import { LineChart } from "react-native-chart-kit";

export default function ProgressScreen({ route, navigation }: RootTabScreenProps<'ProgressTab'>) {
  //const { userid, id, type } = route.params;
  const [selectedMuscle, setSelectedMuscle] = useState();
  const [avgMuscleData, setavgMuscleData] = useState([]);
  const [success, setsuccess] = useState(Boolean);
  const [isLoading, setLoading] = useState(true);
  let id=1;
  const back = async () => {
    // if (userid == id) {
    //   navigation.navigate('AthleteTab', { userid: userid, id: id, type: type })
    // }
    // else {
    //   navigation.navigate('SingleClientTab', { userid: userid, id: id, type: type })
    // }

  }
  console.log("1");
  const getAvgMuscleData = async () => {
    console.log("2");
    try {
      const response = await fetch(
        'http://localhost:5000/sessions/average_muscle_usage_progress', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          athlete_id: "1",
          no_of_sessions: "5"
        })
      }
      )
      const json = await response.json();
      console.log("3");
      console.log(json);
      setavgMuscleData(json);
      setsuccess(true);
    } catch (error) {
      console.error(error);
      setsuccess(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
      getAvgMuscleData
  });


  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={back}>
        <Text style={styles.back_button}>back</Text>
      </TouchableOpacity>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Picker
        selectedValue={selectedMuscle}
        onValueChange={(itemValue, itemIndex) => setSelectedMuscle(itemValue)}>
        <Picker.Item label="Left hamstring" value="left hamstring" />
        <Picker.Item label="Right hamstring" value="right hamstring" />
        <Picker.Item label="Left quad" value="left quad" />
        <Picker.Item label="Right quad" value="right quad" />
      </Picker>

      <ScrollView>
        {/* <PointGraph muscle="None" /> */}
        <View>
            <LineChart
                data={{
                    labels: ["1", "2", "3", "4", "5"],
                    datasets: [
                        {
                            data: [
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

