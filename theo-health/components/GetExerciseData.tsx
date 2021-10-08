import { useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';
import React from 'react';

export default function GetExerciseData(session_id: number, order_in_session: number) {
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
                    session_id: 1,
                    order_in_session: 6
                })
            }
            )
            const json = await response.json();
            setData(json.movies);
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