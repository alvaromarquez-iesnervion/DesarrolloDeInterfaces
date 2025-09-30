import { Button } from "@react-navigation/elements";
import { Text, View } from "react-native";

function pulsar() {
  alert("Hola mundo");
}

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>HolaMundo</Text>
      <Button onPress={() => alert("Hola mundo")}> Pulsar con funcion anónima </Button>
      
      <Button onPress={pulsar}> Pulsar con funcion </Button>
    
    </View>
  );
}
