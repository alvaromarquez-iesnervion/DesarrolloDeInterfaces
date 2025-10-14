import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function Index() {
  
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
  return (
    <View>
      <Switch style={styles.switchStyle}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style={styles.text}>El switch está {isEnabled ? "ON" : "OFF"}</Text>
    </View>
  );
}

const styles=StyleSheet.create({
  switchStyle: {
    alignSelf: 'center',
    marginTop: 50
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20
  } 
})