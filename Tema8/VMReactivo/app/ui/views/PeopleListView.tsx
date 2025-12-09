import { container } from "@/app/core/container";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PeopleListVM } from "../VMs/PeopleListVM";
import { TYPES } from "@/app/core/types";
import { Persona } from "@/app/domain/entities/Persona";



const viewModel = container.get<PeopleListVM>(TYPES.IndexVM)


export default function PeopleList() {
 
 
const renderItem = ({ item }: { item: Persona }) => (
   <Pressable
    onPress={()=>{viewModel.personaSeleccionada=item}}>
      <Text style={styles.itemText}>{item.nombre} {item.apellidos}</Text>
    </Pressable>
  );


 


    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Listado de Personas</Text>
        <Text style={styles.titulo}>Persona seleccionada: {viewModel.personaSeleccionada.nombre} {viewModel.personaSeleccionada.apellidos}</Text>
       
        <FlatList
          data={viewModel.personasList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => (
            <Text style={styles.textoVacio}>No hay personas registradas</Text>
    )}
        />
       
      </SafeAreaView>
    );
  }




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemPresionado: {
    backgroundColor: "#D0E8FF",
  },
  itemText: {
    fontSize: 16,
  },
  separator: {
    height: 10,
  },
  input: {
    width:"80%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textoVacio: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});


