


import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";
import { IRepositoryPersonas, PersonasRepository } from "../Models/Data/personaRepository";
import { PeopleListVM } from "../ViewModels/PeopleListVM";

const container = new Container();


// Vinculamos la interfaz con su implementación concreta
container.bind<IRepositoryPersonas>(TYPES.IRepositoryPersonas).to(PersonasRepository);
container.bind<PeopleListVM>(TYPES.IndexVM).to(PeopleListVM);
export { container };