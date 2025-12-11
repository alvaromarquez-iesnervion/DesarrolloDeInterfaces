import { TYPES } from "@/app/core/types";
import { Persona } from "@/app/domain/entities/Persona";
import { IPersonaRepositoryUseCase } from "@/app/domain/interfaces/IPersonaRepositoryUseCase";
import { inject } from "inversify";
import {  makeAutoObservable } from "mobx";


export class PeopleListVM {


    private _personasList: Persona[] = [];
    private _personaSeleccionada: Persona | null = null;
    private _isLoading: boolean = true;
    private _error: string | null = null;
   


    constructor(
    @inject(TYPES.IPersonaRepositoryUseCase)
    private usecase: IPersonaRepositoryUseCase
    ) {
        // Inicializamos makeAutoObservable antes de cargar datos
        // para que MobX pueda rastrear los cambios de estado
        makeAutoObservable(this);
        
        // Cargamos los datos de forma asincrónica sin bloquear el constructor
        this.cargarPersonas();
    }

    // Método asincrónico que obtiene las personas de la API
    // Maneja el estado de carga y los errores apropiadamente
    private async cargarPersonas(): Promise<void> {
        try {
            this._isLoading = true;
            this._error = null;
            
            // Esperamos a que la API devuelva los datos
            const personas = await this.usecase.getPersonas();
            
            // Asignamos los datos obtenidos
            this._personasList = personas;
            
            // Seleccionamos la primera persona si hay datos disponibles
            if (this._personasList.length > 0) {
                this._personaSeleccionada = this._personasList[0];
            }
        } catch (error) {
            // Capturamos y almacenamos el error para que la UI pueda mostrarlo
            this._error = error instanceof Error ? error.message : "Error desconocido al cargar personas";
            console.error("Error en PeopleListVM:", error);
        } finally {
            // Indicamos que la carga ha finalizado (exitosa o con error)
            this._isLoading = false;
        }
    }



    public get personasList(): Persona[] {
        return this._personasList;
    }

    // Indicador de si los datos se están cargando
    public get isLoading(): boolean {
        return this._isLoading;
    }

    // Mensaje de error si la carga falla
    public get error(): string | null {
        return this._error;
    }

    public get personaSeleccionada(): Persona | null {
        return this._personaSeleccionada;
    }


    public set personaSeleccionada(value: Persona) {
        this._personaSeleccionada = value;
        //alert(`Persona seleccionada en el VM: ${this._personaSeleccionada.nombre} ${this._personaSeleccionada.apellidos}`);
     
    }


  }




