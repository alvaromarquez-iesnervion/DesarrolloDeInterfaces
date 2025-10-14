import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, Pressable } from "react-native";
import { PersonaViewModel } from "../viewModels/PersonaViewModel";
import Persona from "../models/entities/PersonaModel";

export const PersonaListView = () => {
  const vm =  new PersonaViewModel(); //instancia del ViewModel
  const personas : Persona[] = vm.getPersonas(); //estado local para almacenar las personas
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Lista de Personas</Text>
      <FlatList
        data={personas}
        keyExtractor={(item) => item.Id().toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable style={styles.button}
            onPress={() => { vm.selectedPersona = item; }}>
              {item.getFullName()}
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F9FC", paddingVertical: 20 },
  item: {
    backgroundColor: "#fff",
    padding: 18,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E6ED",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: { fontSize: 18, color: "#1E2A38", fontWeight: "500", letterSpacing: 0.3 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#2C3E50",
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
  },
});
