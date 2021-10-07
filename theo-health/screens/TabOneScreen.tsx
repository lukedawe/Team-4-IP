import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

//Creates local object "data" based on JSON file
import * as importedData from '../example.json';


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


      <div className="stock-container">Hi and also Hello!</div>
        <div className="stock-container">
          {importedData.sessions.map((data, key) => {
            return (
              <div key={key}>
                {data.id +
                  " , " +
                  data.date +
                  " ," +
                  data.comment}
              </div>
            );
          })}
        </div>


    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color:'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

/*
      <Card>
        <Card.Title>Client X</Card.Title>
        <Card.Divider/>
        <Card.Image source={require('../assets/images/green_background.png')}>
          <Text style={{marginBottom: 10}}>
            Athlete info xxxxxxxxxxxxxxxxx
          </Text>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW' />
        </Card.Image>
      </Card>
*/
  