import { useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';
import React from 'react';

export default function GetAllUserSessions(athlete_id: number) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const sessionData = async () => {
        try {
            const response = await fetch(
                'http://localhost:5000/sessions/get_user_sessions', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    athlete_id: 2
                })
            }
            )
            const json = await response.json();
            setData(json.sessions);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        sessionData();
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


/*

*/