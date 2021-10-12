import { Dimensions, Text, StyleSheet } from 'react-native';
import { ProgressChart } from "react-native-chart-kit";
import * as React from 'react';
import { View } from '../components/Themed';
import ChartConfig from '../constants/ChartConfig';

import { Picker } from "@react-native-picker/picker";
import { setSelectedMuscle } from "../constants/MuscleSelection";
import { useState } from 'react';
import { MusclePicker } from './MusclePicker';
import GetExerciseData from './GetExerciseData';

// export { setSelectedMuscle } 


export default function ExerciseProgressChart() {
    return (<ProgressChart
        data={data}
        width={Dimensions.get("window").width - (Dimensions.get("window").width / 10)}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={ChartConfig}
        hideLegend={false}
        style={{
            marginVertical: 8,
            borderRadius: 16
        }}
    />)
}

// each value represents a goal ring in Progress chart
const data = {
    labels: ["Laft quad", "Right quad", "Left hamstring", "Right hamstring"], // optional
    data: [0.4, 0.6, 0.8, 0.9]
};
