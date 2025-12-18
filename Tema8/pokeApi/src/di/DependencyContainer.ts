// src/di/DependencyContainer.ts

import { Container } from 'inversify';
import { IGetPokemonListUseCase } from '../domain/usecases/IGetPokemonListUseCase';
import { GetPokemonListUseCase } from '../domain/usecases/GetPokemonListUseCase';
import { PokemonListViewModel } from '../presentation/viewmodels/PokemonListViewModel';
import { IPokemonRepository } from '../domain/repos/IPokemonRepository';
import { PokemonRepository } from '../data/repos/PokemonRepository';
import { TYPES } from './types';

const container = new Container();

// Repositories
container.bind<IPokemonRepository>(TYPES.IPokemonRepository).to(PokemonRepository);

// Use Cases
container.bind<IGetPokemonListUseCase>(TYPES.IGetPokemonListUseCase).to(GetPokemonListUseCase);

// ViewModels
container.bind<PokemonListViewModel>(TYPES.PokemonListViewModel).to(PokemonListViewModel);

export { container };