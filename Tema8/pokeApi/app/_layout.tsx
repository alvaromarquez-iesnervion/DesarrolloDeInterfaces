import 'reflect-metadata'; // Importante: Debe ser la primera línea
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Slot } from 'expo-router'; // <--- Esto renderiza tus pantallas hijas

export default function Layout() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Slot es donde se pintará index.tsx o cualquier otra página */}
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});