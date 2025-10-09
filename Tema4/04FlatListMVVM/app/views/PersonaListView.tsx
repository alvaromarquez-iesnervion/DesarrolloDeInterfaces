import React from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { PersonaViewModel } from "../viewModels/PersonaViewModel";

export const PersonaListView = () => {
  const vm = new PersonaViewModel();
  const personas = vm.getPersonas();

  return (
  <View style={styles.container}>
    <Text style={styles.title}>📋 Lista de Personas</Text>
    <FlatList
      data={personas}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item.nombre}</Text>
        </View>
      )}
    />
  </View>
);

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC", // gris clarito elegante
    paddingVertical: 20,
  },

  item: {
    backgroundColor: "#ffffff", // blanco limpio
    padding: 18,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E6ED", // borde sutil
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // sombra para Android
  },

  text: {
    fontSize: 18,
    color: "#1E2A38", // gris azulado serio
    fontWeight: "500",
    letterSpacing: 0.3,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#2C3E50",
  },
});

