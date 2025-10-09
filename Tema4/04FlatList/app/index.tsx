import { Text, View, FlatList, StyleSheet } from "react-native";

const usuarios = [
  { id: 1, nombre: "Fernando Galiana" },
  { id: 2, nombre: "Juan Perez" },
  { id: 3, nombre: "Maria Gomez" },
  { id: 4, nombre: "Ana Lopez" },
  { id: 5, nombre: "Luis Martinez" },
  { id: 6, nombre: "Sofia Rodriguez" },
  { id: 7, nombre: "Carlos Sanchez" },
  { id: 8, nombre: "Laura Fernandez" },
  { id: 9, nombre: "Jorge Ramirez" },
  { id: 10, nombre: "Marta Torres" },
  { id: 11, nombre: "Diego Flores" },
  { id: 12, nombre: "Elena Morales" },
  { id: 13, nombre: "Pablo Jimenez" },
  { id: 14, nombre: "Carmen Ruiz" },
  { id: 15, nombre: "Rafael Diaz" },
  { id: 16, nombre: "Isabel Castillo" },
  { id: 17, nombre: "Andres Vega" },
  { id: 18, nombre: "Natalia Silva" },
  { id: 19, nombre: "Sergio Cruz" },
  { id: 20, nombre: "Patricia Ortiz" },
  { id: 21, nombre: "Victor Romero" },
  { id: 22, nombre: "Silvia Herrera" },
  { id: 23, nombre: "Alberto Medina" },
  { id: 24, nombre: "Gloria Soto" },
  { id: 25, nombre: "Javier Castro" },
  { id: 26, nombre: "Rosa Delgado" },
  { id: 27, nombre: "Felipe Moreno" },
];


export default function Index() {
  return (
    <FlatList
      data={usuarios}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item.nombre}</Text>
        </View>
      )}
      
    />
  );
}

const styles = StyleSheet.create({

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },

  text:{
    fontSize: 18,
     
  },

})


