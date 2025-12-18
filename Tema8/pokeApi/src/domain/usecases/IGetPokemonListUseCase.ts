// src/domain/usecases/IGetPokemonListUseCase.ts

import { Pokemon } from '../entities/Pokemon';

export interface IGetPokemonListUseCase {
  execute(limit: number, offset: number): Promise<Pokemon[]>;
}