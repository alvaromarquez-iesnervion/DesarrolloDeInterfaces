import { inject, injectable } from 'inversify';
import { makeObservable, observable, action, computed } from 'mobx';
import { IGetPokemonListUseCase } from '../../domain/usecases/IGetPokemonListUseCase';
import { Pokemon } from '../../domain/entities/Pokemon';
import { TYPES } from '../../di/types';

@injectable()
export class PokemonListViewModel {
  // Propiedades observables
  @observable private pokemonList: Pokemon[] = [];
  @observable private offset: number = 0;
  @observable private readonly limit: number = 20;
  @observable private isLoading: boolean = false;
  @observable private error: string | null = null;

  constructor(
    @inject(TYPES.IGetPokemonListUseCase)
    private readonly getPokemonListUseCase: IGetPokemonListUseCase
  ) {
    makeObservable(this);
  }

  @action
  async loadMorePokemon(): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      const newPokemon = await this.getPokemonListUseCase.execute(
        this.limit,
        this.offset
      );
      
      // --- CAMBIO PARA PAGINACIÓN ---
      // En lugar de hacer [...anterior, ...nuevos], 
      // reemplazamos la lista completa con los nuevos.
      this.pokemonList = newPokemon; 
      
      // Aumentamos el offset para la siguiente vez
      this.offset += this.limit;

    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Error desconocido';
      console.error('Error loading pokemon:', err);
    } finally {
      this.isLoading = false;
    }
  }

  // Getters computados
  @computed
  get getPokemonList(): Pokemon[] {
    return this.pokemonList;
  }

  @computed
  get getIsLoading(): boolean {
    return this.isLoading;
  }

  @computed
  get getError(): string | null {
    return this.error;
  }
}