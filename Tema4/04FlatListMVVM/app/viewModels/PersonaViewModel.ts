import { RepositoryPersona } from "../models/data/RepositoryPersona";
import Persona from  "../models/entities/PersonaModel";

export class PersonaViewModel {

  //atributos
  private _personas: Persona[];
  private _selectedPersona: Persona | null = null;

  //constructor
  constructor() {
    this._personas = RepositoryPersona.getPersonas();
  }

  //metodos
  public getPersonas(): Persona[] {
    return this._personas;
  }

  public get selectedPersona(): Persona | null {
    return this._selectedPersona;
  }
  public set selectedPersona(persona: Persona) {
    this._selectedPersona = persona;
    this.alertPersonaDetails();
  }

  private alertPersonaDetails() {
    alert(`Detalles de ${this._selectedPersona?.getFullName()}\nID: ${this._selectedPersona?.Id()}`);
  }

}

