import { Stack } from 'expo-router';
import React from 'react';

export default function PersonaStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Listado', headerShown: false }} />
      <Stack.Screen name="editarCrearPersona" options={{ title: 'Editor' }} />
    </Stack>
  );
}