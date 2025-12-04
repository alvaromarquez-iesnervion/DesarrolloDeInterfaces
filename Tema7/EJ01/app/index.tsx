import React from "react";
import { View, StyleSheet } from "react-native";
import TemporizadorCuentaAtras from "./components/cuentaRegresiva";
export default function App() {
  return (
    <View style={styles.container}>
      <TemporizadorCuentaAtras /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});
