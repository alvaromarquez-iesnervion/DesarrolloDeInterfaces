// src/domain/repositories/IPokemonRepository.ts

import { Pokemon } from '../entities/Pokemon';

export interface IPokemonRepository {
  fetchPokemonList(limit: number, offset: number): Promise<Pokemon[]>;
}