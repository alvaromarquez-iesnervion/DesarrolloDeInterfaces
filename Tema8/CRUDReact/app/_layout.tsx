import 'reflect-metadata';
import { Slot } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
  // Slot renderiza la ruta actual (ya sea index, drawer, etc.)
  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
}