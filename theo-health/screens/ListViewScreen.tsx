import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ListViewScreen() {
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  )
  return (
    <View style={styles.container}>
      <Text style={styles.title}>welcome back,</Text>
      <Text style={styles.title}>api-username</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/ListViewScreen.tsx" />
      <FlatList
        horizontal={true}
        data={CLIENTDATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
)

const ClientHeader = {
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
  list: {
    flex: 3,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  item: {
    backgroundColor: '#ff0000',
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  titletext: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

/**
 * This is just sample data to use with the lists
 */
const CLIENTDATA = [
  {
    id: 1,
    name: 'jane doe',
  },
  {
    id: 2,
    name: 'john smith',
  },
  {
    id: 3,
    name: 'joe bloggs',
  }
]

const SESSIONDATA = [
  {
    id: 1,
    datetime: 'session 1',
  },
  {
    id: 2,
    datetime: 'session 2',
  },
  {
    id: 3,
    datetime: 'session 3',
  },
]