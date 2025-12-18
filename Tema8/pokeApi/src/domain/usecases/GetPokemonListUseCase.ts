// src/domain/usecases/GetPokemonListUseCase.ts

import { inject, injectable } from 'inversify';
import { Pokemon } from '../entities/Pokemon';
import { IPokemonRepository } from '../repos/IPokemonRepository';
import { IGetPokemonListUseCase } from './IGetPokemonListUseCase';
import { TYPES } from '../../di/types';

@injectable()
export class GetPokemonListUseCase implements IGetPokemonListUseCase {
  constructor(
    @inject(TYPES.IPokemonRepository)
    private readonly pokemonRepository: IPokemonRepository
  ) {}

  async execute(limit: number, offset: number): Promise<Pokemon[]> {
    return await this.pokemonRepository.fetchPokemonList(limit, offset);
  }
}