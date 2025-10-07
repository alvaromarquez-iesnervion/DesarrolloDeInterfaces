import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";



const Index = () => {


  const [count, setCount] = useState(0);
  const [clicks, setClics] = useState(0);
  
  const handleIncrement = () => {
    setCount(count + 1);
    setClics(clicks+1);
    if (clicks % 10 == 0 && clicks != 0){
      alert(`Has pulsado ${clicks} veces`)
    }
  };
  
  const handleDecrement = () => {
    setCount(count - 1);
    setClics(clicks+1);

    if (clicks % 10 == 0 && clicks != 0){
      alert(`Has pulsado ${clicks} veces`)
    }
  };

  



  return (
   <View style={styles.container}>
      
      <Text style={styles.title}>
        Contador: {count}
      </Text>
      <Pressable onPress={handleIncrement} style={styles.button}>
        <Text style={styles.buttonText}>Incrementar</Text>
        <Ionicons name="arrow-up" size={24} color="white" />
      </Pressable>

      <Pressable onPress={handleDecrement} style={styles.button}>
        <Text style={styles.buttonText}>Decrementar</Text>
        <Ionicons name="arrow-down" size={24} color="white" />
      </Pressable>
     
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 8,
  },
});


export default Index;

