import { Persona } from "../entities/Persona";


export interface IPersonaRepository {
     getListadoCompletoPersonas(): Persona[];
}
