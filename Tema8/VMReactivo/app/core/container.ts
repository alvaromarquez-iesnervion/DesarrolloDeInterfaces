import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";
import { PersonasRepository } from "../data/repos/PersonaRepository";
import { PeopleListVM } from "../ui/VMs/PeopleListVM";
import { IPersonaRepository } from "../domain/repos/IPersonaRepository";
import { PersonaRepositoryUseCase } from "../domain/useCases/PersonaRepositoryUseCase";
import { IPersonaRepositoryUseCase } from "../domain/interfaces/IPersonaRepositoryUseCase";


const container = new Container();


container.bind<IPersonaRepository>(TYPES.IPersonaRepository).to(PersonasRepository);
container.bind<PeopleListVM>(TYPES.IndexVM).to(PeopleListVM);
container.bind<IPersonaRepositoryUseCase>(TYPES.IPersonaRepositoryUseCase).to(PersonaRepositoryUseCase);
export { container };
