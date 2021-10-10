import { Dimensions, Text, StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import * as React from 'react';
import { View } from '../components/Themed';
import ChartConfig from '../constants/ChartConfig';

import { Picker } from "@react-native-picker/picker";
import { setSelectedMuscle } from "../constants/MuscleSelection";
import { useState } from 'react';
import { MusclePicker } from './MusclePicker';
import GetExerciseData from './GetExerciseData';

// export { setSelectedMuscle } 


export default function PointGraph({ muscle }: { muscle: string }) {
    const [selectedMuscle, setSelectedMuscle] = useState();



    return (
        <View>

            <GetExerciseData/>

            <LineChart
                data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
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
    );
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Cochin"
    },
    titleText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    }
});