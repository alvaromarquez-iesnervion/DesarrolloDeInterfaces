import { Persona } from "../entities/Persona";


export interface IPersonaRepository {
     getListadoCompletoPersonas(): Promise<Persona[]>;
}
