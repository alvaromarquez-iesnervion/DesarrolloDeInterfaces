import 'reflect-metadata'; // Necesario para que Inversify no falle
import React from 'react';
// Asegúrate de corregir la ruta de importación según el paso 2
import PokemonListScreen from '../src/presentation/views/PokemonListScreen'; 

export default function Home() {
  // Ya NO necesitamos recuperar el viewModel aquí.
  // La pantalla PokemonListScreen se encarga de todo internamente.
  return <PokemonListScreen />;
}