import { injectable } from "inversify";
import { Persona } from "../entities/Persona";
import { IPersonaRepositoryUseCase } from "../interfaces/IPersonaRepositoryUseCase";
import { inject } from "inversify";
import { TYPES } from "@/app/core/types";
import { IPersonaRepository } from "../repos/IPersonaRepository";

@injectable()
export class PersonaRepositoryUseCase implements IPersonaRepositoryUseCase{
    
    repositoryPersonas: IPersonaRepository
    
    constructor(
        @inject(TYPES.IPersonaRepository)
        private RepositoryPersonas: IPersonaRepository
    ){
        this.repositoryPersonas = RepositoryPersonas
    }

    // Método asincrónico que obtiene la lista completa de personas
    // Usa async/await para manejar correctamente la promesa devuelta por la API
    // Esto evita problemas de timing y permite que la UI espere a que los datos estén listos
    async getPersonas(): Promise<Persona[]> {
        try {
            // Llamamos al repositorio que hace el fetch a la API
            // Esperamos (await) a que la respuesta se complete antes de continuar
            const personas = await this.repositoryPersonas.getListadoCompletoPersonas()
            return personas
        } catch (error) {
            // Si hay un error en la API, lo capturamos y lo registramos
            console.error("Error al obtener personas en useCase:", error)
            // Re-lanzamos el error para que sea manejado en la UI
            throw error
        }
    }
}