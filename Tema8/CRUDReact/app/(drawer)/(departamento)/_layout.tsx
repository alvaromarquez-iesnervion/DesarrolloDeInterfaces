import { Stack } from 'expo-router';
import React from 'react';

export default function DepartamentoLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ title: 'Listado Departamentos', headerShown: false }} 
      />
      <Stack.Screen 
        name="editarCrearDepartamento" 
        options={{ title: 'Detalle Departamento' }} 
      />
    </Stack>
  );
}