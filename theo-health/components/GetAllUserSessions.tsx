import { warmUpAsync } from 'expo-web-browser';
import React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { ScrollView } from "react-native-gesture-handler";

let athlete_id = 6;

export default function GetAllUserSessions() {
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
                    athlete_id: athlete_id
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

        <View style={styles.session_card_container}>
            
                {isLoading ? <ActivityIndicator /> : (
                    data.map((data, key) => {
                        return (

                            <Card containerStyle={styles.card}>
                                <Card.Title style={styles.card_title}>Session ID: {data.id}</Card.Title>

                                <Card.Divider />
                                <Text style={styles.card_content}>
                                    Date: {data.date}
                                </Text>

                                <Text style={styles.card_content}>
                                    Comment: {data.comment}
                                </Text>

                                <Button
                                    icon={<Icon name='code' color='#ffffff' />}
                                    buttonStyle={styles.button_style}
                                    title='VIEW NOW'
                                />
                            </Card>

                        )
                    })

                )}

            
        </View>

    );
};

const setAthleteID = (id: any) => {
    athlete_id = id;
    console.log(athlete_id);
}

const styles = StyleSheet.create({
    session_card_container: {
        //flexDirection: 'column',
        alignContent: "center",
    },
    card: {
        borderColor: '#f36d21',
        backgroundColor: '#f36d21',
        borderRadius: 10,
        //width: screen.width * 0.15,

    },
    card_title: {
        color: '#FFFFFF',

    },
    card_content: {
        fontSize: 16,

        //paddingLeft: 5,
        paddingRight: 5,

        color: '#FFFFFF',
        textAlign: 'left',
        //flexWrap: 'wrap',

    },
    button_style: {
        borderRadius: 10,
        backgroundColor: '#0297a2',

        marginLeft: 0,
        marginTop: 10,
        marginRight: 0,
        marginBottom: 0
    }
});


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