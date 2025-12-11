import { Persona } from "../entities/Persona";


export interface IPersonaRepositoryUseCase{

    getPersonas(): Promise<Persona[]>;
}