import * as React from 'react';

import { View } from 'react-native';
import HeatmapThing from "../components/HeatmapComponent";
import {Text} from "react-native";
import {GLView} from "expo-gl";



export default function HeatmapScreen()
{
  return (
      <View style={{height:100}}>
          <HeatmapThing/>
          <Text>fdsf</Text>
      </View>
  );
}