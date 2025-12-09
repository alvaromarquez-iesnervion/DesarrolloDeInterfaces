import { Persona } from "../entities/Persona";


export interface IPersonaRepositoryUseCase{

    getPersonas(): Persona[];
}