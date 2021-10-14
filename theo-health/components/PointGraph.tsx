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
import { json } from 'stream/consumers';
import { useEffect } from 'react';
import { RootTabScreenProps } from '../types';

// export { setSelectedMuscle } 


export default function PointGraph(id: number) {
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
                'http://localhost:5000/sessions/total_muscle_activation', {
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
        }
    });


    // const exerciseData = async () => {
    //     try {
    //         const response = await fetch(
    //             'http://localhost:5000/sessions/total_muscle_activation', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 "session_id": id
    //             })
    //         }
    //         )
    //         const json = await response.json();
    //         console.log(json);
    //         setData(json);
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // useEffect(() => {
    //     exerciseData();
    // }, []);


    return (
        <View>
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
