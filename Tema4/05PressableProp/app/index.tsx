import { Alert, Pressable, Text, View, StyleSheet} from "react-native";
import { BotonPersonalizado } from "./BotonPersonalizado";



export default function Index() {
  return (
    <View style={styles.container}>
      <BotonPersonalizado
        texto="Boton 1"
        onPress={() => Alert.alert("¡Botón 1 presionado!")}
      /> 
      <BotonPersonalizado
        texto="Boton 2"
        onPress={() => Alert.alert("¡Botón 2 presionado!")}
        />

      <BotonPersonalizado
        texto="Boton 3"
        onPress={() => Alert.alert("¡Botón 3 presionado!")}
      />
      <BotonPersonalizado
        texto="Boton 4"
        onPress={() => Alert.alert("¡Botón 4 presionado!")}
      />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});  