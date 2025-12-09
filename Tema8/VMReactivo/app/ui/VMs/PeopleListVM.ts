import { TYPES } from "@/app/core/types";
import { Persona } from "@/app/domain/entities/Persona";
import { IRepositoryPersonas } from "@/app/domain/repos/IPersonaRepository";
import { inject } from "inversify";





export class PeopleListVM {


    private _personasList: Persona[] = [];
    private _personaSeleccionada: Persona;
   


    constructor(
        @inject(TYPES.IRepositoryPersonas)
        private RepositoryPersonas: IRepositoryPersonas
    ) {


       
        this._personaSeleccionada = this.personasList[0]


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
        alert(`Persona seleccionada en el VM: ${this._personaSeleccionada.nombre} ${this._personaSeleccionada.apellidos}`);
     
    }


  }




