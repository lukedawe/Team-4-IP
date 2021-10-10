import { useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';
import React from 'react';

export default function GetExerciseData() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

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
                    session_id: 6,
                    order_in_session: 1
                })
            }
            )
            const json = await response.json();
            console.log(json);
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        exerciseData();
    }, []);

    return (
        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <Text>{item.id}, {item.date}</Text>
                    )}
                />
            )}
        </View>
    );
};