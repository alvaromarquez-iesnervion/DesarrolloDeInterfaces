import { RepositoryPersona } from "../models/data/RepositoryPersona";

export class PersonaViewModel {
  public getPersonas(): { id: number; nombre: string }[] {
    const personas = RepositoryPersona.getPersonas();
    return personas.map((p) => ({
      id: p.getId(),
      nombre: p.getFullName(),
    }));
  }
}

