import { Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import * as React from 'react';
import { View } from '../components/Themed';
import ChartConfig from '../constants/ChartConfig';

export default function PointGraph() {
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
        </View>
    );
}
