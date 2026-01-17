import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { container } from "../Core/container";
import { Persona } from "../Models/Entities/Persona";
import { TYPES } from "../Core/types";
import { PeopleListVM } from "../ViewModels/PeopleListVM";


export default function PeopleList() {
 
 
const viewModel = container.get<PeopleListVM>(TYPES.IndexVM)


const renderItem = ({ item }: { item: Persona }) => (
   
      <View style={styles.itemContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.Nombre.charAt(0).toUpperCase()}{item.Apellidos.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{item.Nombre} {item.Apellidos}</Text>
          <Text style={styles.idText}>ID: {item.Id}</Text>
        </View>
      </View>
   
  );


 
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Listado de Personas</Text>
       
        <FlatList
          data={viewModel.personasList}
          renderItem={renderItem}
          keyExtractor={(item) => item.Id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
            <Text style={styles.textoVacio}>No hay personas registradas</Text>
            </View>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  idText: {
    fontSize: 14,
    color: "#666",
  },
  separator: {
    height: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  textoVacio: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
    fontStyle: "italic",
  },
});

