import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [isLoading, setIsLoading] = useState(false); // controla si se muestra el spinner
  const [loaded, setLoaded] = useState(false);       // controla si debe mostrarse el texto final

  const handleReload = () => {
    setLoaded(false);      // oculta el texto "Cargado con éxito"
    setIsLoading(true);    // muestra el ActivityIndicator

    // Simula una carga de 2 segundos
    setTimeout(() => {
      setIsLoading(false); // oculta el spinner
      setLoaded(true);     // muestra el texto final
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.boton, isLoading && { opacity: 0.7 }]}
        onPress={handleReload}
        disabled={isLoading} // desactiva el botón mientras carga
      >
        <Ionicons name="reload" size={24} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.textoBoton}>Recargar</Text>
      </Pressable>

      {/* Spinner (solo visible mientras isLoading es true) */}
      {isLoading && <ActivityIndicator size="large" color="#4A90E2" />}

      {/* Texto de éxito (solo visible cuando loaded es true) */}
      {loaded && !isLoading && (
        <Text style={styles.mensaje}> Cargado con éxito</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", gap: 20 },
  boton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  textoBoton: { color: "#fff", fontSize: 18, fontWeight: "600" },
  mensaje: { fontSize: 20, color: "#2C3E50", fontWeight: "500" },
});
