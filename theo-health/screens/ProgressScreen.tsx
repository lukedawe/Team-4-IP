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
        <PointGraph muscle="None" />
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

