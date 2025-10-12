import { RepositoryPersona } from "../models/data/RepositoryPersona";
import Persona from  "../models/entities/PersonaModel";

export class PersonaViewModel {

  private personas: Persona[];

  constructor() {
    this.personas = RepositoryPersona.getPersonas();
  }

  public getPersonas(): Persona[] {
    return this.personas;
  }

  
}

