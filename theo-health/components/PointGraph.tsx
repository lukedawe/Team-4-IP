import { Dimensions, Text, StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import * as React from 'react';
import { View } from '../components/Themed';
import ChartConfig from '../constants/ChartConfig';

import { Picker } from "@react-native-picker/picker";
import { setSelectedMuscle } from "../constants/MuscleSelection";
import { useState } from 'react';
import { MusclePicker } from './MusclePicker';

// export { setSelectedMuscle } 


function getExerciseData(session_id: number, order_in_session: number) {
    const exerciseData = async () => {
        try {
            const response = await fetch(
                'http://localhost:5000/exercise_data/get_data', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    session_id: session_id,
                    order_in_session: order_in_session
                })
            }
            );
            const json = await response.json();
            return json.movies;
        } catch (error) {
            console.error(error);
        }
    };

    return exerciseData;
}


export default function PointGraph({ muscle }: { muscle: string }) {
    const [selectedMuscle, setSelectedMuscle] = useState();



    return (
        <View>


            <Text style={styles.titleText} >
                {'This year'}
                {"\n"}
                {"\n"}
            </Text>

            <Text style={styles.baseText}>{getExerciseData(6,1)}</Text>

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