import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.texto}>Header</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.left} />
        <View style={styles.center}>
          <Text style={styles.texto}>Content</Text>
        </View>
        <View style={styles.right} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.texto}>Footer</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  header: {
    backgroundColor: "aqua",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "gray",
  },
  left: {
    width: 40,
    backgroundColor: "blue",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    width: 40,
    backgroundColor: "green",
  },
  footer: {
    backgroundColor: "pink",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    color: "blue",
    fontWeight: "bold",
  },
});
