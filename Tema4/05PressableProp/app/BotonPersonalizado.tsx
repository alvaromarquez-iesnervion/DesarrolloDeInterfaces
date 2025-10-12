import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

type Props = {
    texto: string;
    onPress: () => void;
};


export const BotonPersonalizado = ({ texto, onPress }: Props) => {
  return (
    <Pressable style={styles.boton} onPress={onPress}>
      <Text style={styles.texto}>{texto}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  texto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});