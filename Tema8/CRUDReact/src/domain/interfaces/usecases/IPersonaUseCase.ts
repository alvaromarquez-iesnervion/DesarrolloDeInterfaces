import { Persona } from "../../entities/Persona";

export interface IPersonaUseCase {
  getPersonas(): Promise<Persona[]>;
  getPersonaById(id: number): Promise<Persona>;
  createPersona(persona: Persona): Promise<number>;
  updatePersona(id: number, persona: Persona): Promise<number>;
  deletePersona(id: number): Promise<number>;
}