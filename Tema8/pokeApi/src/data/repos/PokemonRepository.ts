// src/data/repositories/PokemonRepository.ts

import { injectable } from 'inversify';
import { Pokemon } from '../../domain/entities/Pokemon';
import { PokemonApiResponse } from '../models/PokemonApiResponse';
import { IPokemonRepository } from '../../domain/repos/IPokemonRepository';

@injectable()
export class PokemonRepository implements IPokemonRepository {
  private readonly baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  async fetchPokemonList(limit: number, offset: number): Promise<Pokemon[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}?limit=${limit}&offset=${offset}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: PokemonApiResponse = await response.json();
      
      return data.results.map(
        (result) => new Pokemon(result.name, result.url)
      );
    } catch (error) {
      console.error('Error fetching pokemon list:', error);
      throw error;
    }
  }
}