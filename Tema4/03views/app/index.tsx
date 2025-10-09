import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  
  
  
  return (
    <SafeAreaView>

      <View style={styles.header}>
        <Text style={styles.texto}>Header</Text>
      </View>
      
      <View style={styles.content}>
      <View style={styles.left}></View>
      <View style={styles.center}>
        <Text style={styles.texto}>Content</Text>
      </View>
      <View style={styles.right}></View>
        
      </View>

      <View style= {styles.footer}>
        <Text style={styles.texto}>footer</Text>
      </View>
      
    </SafeAreaView> 

  );


}

const styles=StyleSheet.create({
    container: {
    flex: 1,                    
    backgroundColor: "#fff",
    },

    header:{
      flex: 80,
      backgroundColor: "#ff0000ff"
    },
    content:{
      flex: 1,
      backgroundColor: "#0066ffff"
    },
    left:{
      

    },
    right:{
      

    },

    center:{
      flex:1,

    },
    footer:{
      flex: 80,
      backgroundColor: "#00ffb3ff"
    },
    texto:{
      justifyContent: "center"
    }

  })