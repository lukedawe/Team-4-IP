import React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'



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
                data.map((data, key) =>{
                    return(
                        <Card>
                        <Card.Title>Session ID: {data.id}</Card.Title>
                        <Card.Divider/>
                            <Card.Image source={require('../assets/images/green_background.png')}>
                                <Text>
                                    Date: {data.date}
                                </Text>
    
                                <Text>
                                    Comment: {data.comment}
                                </Text>
                            </Card.Image>
    
                    </Card>
                    )
                })
                
            )}
        </View>
    );
};




/* --- WORKS FOR SIMPLE LISTING ALL DATA ---
                <FlatList
                    data={data}

                    keyExtractor={({ id }, index) => id}

                    renderItem={({ item }) => (
                        <Text>
                            Session ID: {item.id}{"\n"}
                            Session date: {item.date}{"\n"}
                            Session Comment: {item.comment}{"\n"}{"\n"}
                        </Text>
                    )}
                />
*/


/* --- CARD FORMAT WHICH SHOULD WORK ---
                <Card>
                    <Card.Title>Session ID: {data.id}</Card.Title>
                    <Card.Divider/>
                        <Card.Image source={require('../assets/images/green_background.png')}>
                            <Text>
                                Date: {data.date}
                            </Text>

                            <Text>
                                Comment: {data.comment}
                            </Text>
                        </Card.Image>

                </Card>
*/