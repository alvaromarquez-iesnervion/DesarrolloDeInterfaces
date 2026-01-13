import { Persona } from "../entities/Persona";
import { IPersonaRepository } from "../interfaces/repos/IPersonaRepository";
import { IPersonaUseCase } from "../interfaces/usecases/IPersonaUseCase";

export class PersonaUseCase implements IPersonaUseCase {
  constructor(private personaRepository: IPersonaRepository) {}

  async getPersonas(): Promise<Persona[]> {
    const personas = await this.personaRepository.getAllPersonas();
    
    // Regla: Viernes (5) y Sábados (6) solo mayores de 18
    const hoy = new Date().getDay();
    if (hoy === 5 || hoy === 6) {
      return personas.filter(p => p.edad > 18);
    }
    
    return personas;
  }

  getPersonaById(id: number): Promise<Persona> {
    return this.personaRepository.getPersonaById(id);
  }

  createPersona(persona: Persona): Promise<number> {
    return this.personaRepository.createPersona(persona);
  }

  updatePersona(id: number, persona: Persona): Promise<number> {
    return this.personaRepository.updatePersona(id, persona);
  }

  async deletePersona(id: number): Promise<number> {
    // Regla: Domingo (0) no permite eliminar
    const hoy = new Date().getDay();
    if (hoy === 0) {
      throw new Error("No está permitido eliminar personas los domingos.");
    }
    return this.personaRepository.deletePersona(id);
  }
}