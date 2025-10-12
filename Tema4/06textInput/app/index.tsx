import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function Index() {

  const [text, setText] = React.useState("");

  return (
    <View
      style={styles.container}> 
      <TextInput 
      style={styles.input}
      placeholder="Escribe algo aquí"
      onChangeText={setText}
      />
      <Text>Has escrito: {text}</Text>
    </View>
  );


}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      width: "80%",
      marginBottom: 20,
      paddingHorizontal: 10,
    },
  });
  