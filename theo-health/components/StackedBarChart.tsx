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
    labels: ["Test1", "Test2"],
    legend: ["L1", "L2", "L3"],
    data: [
        [60, 60, 60],
        [30, 30, 60]
    ],
    barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
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