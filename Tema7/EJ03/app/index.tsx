import { Text, View, FlatList, StyleSheet } from "react-native";
import { useRef } from "react";
import React from "react";


// Genera 500 usuarios con un nombre genérico
const usuarios = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,
  nombre: `Usuario ${i + 1}`,
}));


export default function Index() {
  const [showButton, setShowButton] = React.useState(false);
  const scrollRef = useRef(null);

  const handleScrollToTop = (event) => {
    const y = event.nativeEvent.contentOffset.y;

    if (y > 300 && !showButton) {
      setShowButton(true);
    } else if (y <= 300 && showButton) {
      setShowButton(false);
    }
  };

   const scrollToTop = () => {
    scrollRef.current?.
  };

  return (
    <FlatList
    ref={scrollRef}
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
