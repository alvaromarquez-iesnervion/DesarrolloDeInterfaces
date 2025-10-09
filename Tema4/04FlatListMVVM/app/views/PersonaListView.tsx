import React from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { PersonaViewModel } from "../viewModels/PersonaViewModel";

export const PersonaListView = () => {
  const vm = new PersonaViewModel();
  const personas = vm.getPersonas();

  return (
    <FlatList
      data={personas}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item.nombre}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
  },
});
