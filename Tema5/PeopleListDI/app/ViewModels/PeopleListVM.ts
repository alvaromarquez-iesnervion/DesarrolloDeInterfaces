
import { inject, injectable } from "inversify";
import { IRepositoryPersonas } from "../Models/Data/personaRepository";
import { Persona } from "../Models/Entities/Persona";
import { TYPES } from "../Core/types";


export class PeopleListVM {

    private _personasList: Persona[] = [];
    private _personaSeleccionada: Persona;
   
    constructor(
        @inject(TYPES.IRepositoryPersonas)
        private RepositoryPersonas: IRepositoryPersonas
    ) {
        this._personaSeleccionada = new Persona(0, '', '');
        this._personasList = this.RepositoryPersonas.getListadoCompletoPersonas();
    }
    public get personasList(): Persona[] {
        return this._personasList;
    }
    public get personaSeleccionada(): Persona {
        return this._personaSeleccionada;
    }
    public set personaSeleccionada(value: Persona) {
        this._personaSeleccionada = value; 
    }
  }
