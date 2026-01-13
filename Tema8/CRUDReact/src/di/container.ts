import "reflect-metadata"; // Importante: debe ser la primera línea
import { Container } from "inversify";
import { TYPES } from "./types";

// Interfaces
import { IApiConnection } from "../domain/interfaces/api/IApiConnection";
import { IPersonaRepository } from "../domain/interfaces/repos/IPersonaRepository";
import { IDepartamentoRepository } from "../domain/interfaces/repos/IDepartamentoRepository";
import { IPersonaUseCase } from "../domain/interfaces/usecases/IPersonaUseCase";
import { IDepartamentoUseCase } from "../domain/interfaces/usecases/IDepartamentoUseCase";

// Implementations
import { ApiConnectionAzure } from "../data/api/ApiConnectionAzure";
import { PersonaRepository } from "../data/repos/PersonaRepository";
import { DepartamentoRepository } from "../data/repos/DepartamentoRepository";
import { PersonaUseCase } from "../domain/usecases/PersonaUseCase";
import { DepartamentoUseCase } from "../domain/usecases/DepartamentoUseCase";

// ViewModels
import { PersonaViewModel } from "../presentation/vms/PersonaViewModel";
import { DepartamentoViewModel } from "../presentation/vms/DepartamentoViewModel";

const container = new Container();

// 1. Data Layer
container.bind<IApiConnection>(TYPES.ApiConnection).to(ApiConnectionAzure).inSingletonScope();
container.bind<IPersonaRepository>(TYPES.PersonaRepository).to(PersonaRepository);
container.bind<IDepartamentoRepository>(TYPES.DepartamentoRepository).to(DepartamentoRepository);

// 2. Domain Layer
container.bind<IPersonaUseCase>(TYPES.PersonaUseCase).to(PersonaUseCase);
container.bind<IDepartamentoUseCase>(TYPES.DepartamentoUseCase).to(DepartamentoUseCase);

// 3. Presentation Layer (ViewModels as Singletons)
container.bind<PersonaViewModel>(TYPES.PersonaViewModel).to(PersonaViewModel).inSingletonScope();
container.bind<DepartamentoViewModel>(TYPES.DepartamentoViewModel).to(DepartamentoViewModel).inSingletonScope();

export { container };