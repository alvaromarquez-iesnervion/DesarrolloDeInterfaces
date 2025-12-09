import { TYPES } from "@/app/core/types";
import { Persona } from "@/app/domain/entities/Persona";
import { IPersonaRepositoryUseCase } from "@/app/domain/interfaces/IPersonaRepositoryUseCase";
import { IPersonaRepository } from "@/app/domain/repos/IPersonaRepository";
import { inject } from "inversify";
import {  makeAutoObservable } from "mobx";






export class PeopleListVM {


    private _personasList: Persona[] = [];
    private _personaSeleccionada: Persona;
   


    constructor(
    @inject(TYPES.IPersonaRepositoryUseCase)
    private usecase: IPersonaRepositoryUseCase
    ) {

    this._personasList = this.usecase.getPersonas();

    this._personaSeleccionada = this._personasList.length > 0
        ? this._personasList[0]
        : null as any;

    makeAutoObservable(this);   
    }



    public get personasList(): Persona[] {
        return this._personasList;
    }


    public get personaSeleccionada(): Persona {
        return this._personaSeleccionada;
    }


    public set personaSeleccionada(value: Persona) {
        this._personaSeleccionada = value;
        //alert(`Persona seleccionada en el VM: ${this._personaSeleccionada.nombre} ${this._personaSeleccionada.apellidos}`);
     
    }


  }




