import { Dimensions, Text, StyleSheet } from 'react-native';
import { StackedBarChart } from "react-native-chart-kit";
import * as React from 'react';
import { View } from '../components/Themed';
import ChartConfig from '../constants/ChartConfig';

import { Picker } from "@react-native-picker/picker";
import { setSelectedMuscle } from "../constants/MuscleSelection";
import { useState } from 'react';
import { MusclePicker } from './MusclePicker';
import GetExerciseData from './GetExerciseData';

// export { setSelectedMuscle } 

const data = {
    labels: ["S1", "S2", "S3", "S4", "S5",],
    legend: ["Right quad", "Left quad", "Right hamstring", "Left hamstring"],
    data: [
        [60, 60, 60, 40, 30],
        [30, 30, 60, 20, 40],
        [30, 10, 60, 40, 40],
        [30, 50, 70, 10, 10],
        [30, 10, 60, 70, 40],

    ],
    barColors: ["#dfe4ea", "#ced6e0", "#a4b0be", "#a5b0bc"]
};

export default function ExcerciseStackedBarChart() {
    return (
        <StackedBarChart
            style={{
                marginVertical: 8,
                borderRadius: 16
            }}
            data={data}
            width={Dimensions.get("window").width - (Dimensions.get("window").width / 10)}
            height={220}
            chartConfig={ChartConfig}
            hideLegend={false}
        />
    )
}