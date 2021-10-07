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
    <View style={containerStyle.container}>
      <div className="sessions-container"></div>
          {importedData.sessions.map((data, key) => {
            return (
              <div key={key}>
                <Card>
                  <Card.Title>Session ID: {data.id}</Card.Title>
                  <Card.Divider/>
                  <Card.Image source={require('../assets/images/green_background.png')}>
                    
                    <Text style={textStyle.defaultText}>
                      Date: {data.date}
                    </Text>

                    <Text style={textStyle.defaultText}>
                      Comment: {data.comment}
                    </Text>

                    <Button
                      icon={<Icon name='code' color='#ffffff' />}
                      buttonStyle={{marginLeft: 10, marginRight: 10, marginBottom: 10}}
                      title='OPEN' />
                  
                  </Card.Image>
                </Card>
              </div>
            );
          })}
    </View>
  );
}


const containerStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '50%',
    right: '50%',
    top: '5%',
    flexDirection: 'row',

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


const textStyle = StyleSheet.create({
  defaultText:{
    paddingLeft: 5,
    paddingBottom: 10,
    color: 'white',
    fontWeight: 'normal',
  }

});
  