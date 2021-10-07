import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { setSelectedMuscle } from "../constants/MuscleSelection";

export function MusclePicker() {

  const [selectedMuscle, setSelectedMuscle] = useState();

  return (
    <Picker
      selectedValue={selectedMuscle}
      onValueChange={ (itemValue, itemIndex) => setSelectedMuscle(itemValue) }>
      <Picker.Item label="Left hamstring" value="left hamstring" />
      <Picker.Item label="Right hamstring" value="right hamstring" />
      <Picker.Item label="Left quad" value="left quad" />
      <Picker.Item label="Right quad" value="right quad" />
    </Picker>
  );
}

// export { setSelectedMuscle } 
