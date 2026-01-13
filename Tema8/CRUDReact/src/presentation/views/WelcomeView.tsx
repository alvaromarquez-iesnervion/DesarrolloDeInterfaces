import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export const WelcomeView = () => {
    const router = useRouter();

    const handleEntrar = () => {
        // Navegamos hacia el grupo del drawer, específicamente a la pantalla de personas
        router.replace('/(drawer)/(persona)');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a la Gestión de Personal</Text>
            <Text style={styles.subtitle}>Ejercicio React Native + Clean Arch + MVVM</Text>
            
            <View style={styles.buttonContainer}>
                <Button title="Entrar a la Aplicación" onPress={handleEntrar} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    subtitle: { fontSize: 16, color: 'gray', marginBottom: 40 },
    buttonContainer: { width: '100%', maxWidth: 300 }
});