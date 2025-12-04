import * as React from 'react';
import { View, Text, Button } from 'react-native';

const secondsLeft = ()=> {
    const [timeLeft, setTimeLeft] = React.useState(10);
    const [isRunning, setIsRunning] = React.useState(false);
    return(
        
        <View>
            <Text>{timeLeft} segundos</Text>
            <Button title={isRunning ? "Pausar" : "Iniciar"} onPress={()=>{
                setIsRunning(!isRunning);
            }}/>
        </View>
    );
};

export default secondsLeft;