import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  
  
  return (
    <View style={styles.card}>
      <Image style= {styles.avatar} source={require('../assets/images/984e98cd33b79df24f066436fb3f415d.jpg')} />
      <Text style={styles.text}>Fernando Galiana</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    margin:20,
    backgroundColor: '#fff', 
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 350,
    borderRadius: 10,         
    borderColor: '#000',      
    borderWidth: 2
  
},

  text:{
    fontWeight: "bold",
    fontSize: 25,
     
  },

  avatar: {
  width: 200,
  height: 200,
  borderRadius: 100,
  paddingVertical: 10, 
}

})
