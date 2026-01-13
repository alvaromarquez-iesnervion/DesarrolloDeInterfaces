import { TYPES } from "@/src/di/types";
import { Persona } from "../../domain/entities/Persona";
import { IApiConnection } from "../../domain/interfaces/api/IApiConnection";
import { IPersonaRepository } from "../../domain/interfaces/repos/IPersonaRepository";
import { PersonaMapper } from "../mappers/PersonaMapper";
import { inject } from "inversify";

export class PersonaRepository implements IPersonaRepository {
  constructor(
        @inject(TYPES.ApiConnection) private apiConnection: IApiConnection
    ) {}
  async getAllPersonas(): Promise<Persona[]> {
    const response = await fetch(this.apiConnection.getPersonasUrl());
    if (!response.ok) throw new Error("Error fetching personas");
    const data = await response.json();
    // Mapeamos los datos crudos a Entidades
    return data.map((item: any) => PersonaMapper.fromApiToEntity(item));
  }

  async getPersonaById(id: number): Promise<Persona> {
    const response = await fetch(`${this.apiConnection.getPersonasUrl()}/${id}`);
    if (!response.ok) throw new Error("Error fetching persona");
    const data = await response.json();
    return PersonaMapper.fromApiToEntity(data);
  }

  async createPersona(persona: Persona): Promise<number> {
    // Aquí normalmente se enviaría solo el objeto plano, usamos el mapper si es necesario
    const body = JSON.stringify({
        ...persona,
        fechaNacimiento: persona.fechaNacimiento.toISOString()
    });
    
    const response = await fetch(this.apiConnection.getPersonasUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
    if (!response.ok) throw new Error("Error creating persona");
    return response.status;
  }

  async updatePersona(id: number, persona: Persona): Promise<number> {
    const body = JSON.stringify({
        ...persona,
        fechaNacimiento: persona.fechaNacimiento.toISOString()
    });

    const response = await fetch(`${this.apiConnection.getPersonasUrl()}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
    if (!response.ok) throw new Error("Error updating persona");
    return response.status;
  }

  async deletePersona(id: number): Promise<number> {
    const response = await fetch(`${this.apiConnection.getPersonasUrl()}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error deleting persona");
    return response.status;
  }
}