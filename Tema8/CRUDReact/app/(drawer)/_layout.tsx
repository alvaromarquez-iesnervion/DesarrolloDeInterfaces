import { Drawer } from 'expo-router/drawer';
import React from 'react';

// Aquí solo definimos el Drawer
export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen 
        name="(persona)" 
        options={{ drawerLabel: 'Gestión Personas', title: 'Personas' }} 
      />
      <Drawer.Screen 
        name="(departamento)" 
        options={{ drawerLabel: 'Gestión Departamentos', title: 'Departamentos' }} 
      />
    </Drawer>
  );
}