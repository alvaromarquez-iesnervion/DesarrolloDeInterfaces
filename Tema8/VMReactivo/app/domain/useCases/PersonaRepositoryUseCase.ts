import { injectable } from "inversify";
import { Persona } from "../entities/Persona";
import { IPersonaRepositoryUseCase } from "../interfaces/IPersonaRepositoryUseCase";
import { inject } from "inversify";
import { TYPES } from "@/app/core/types";
import { IPersonaRepository } from "../repos/IPersonaRepository";

@injectable()
export class PersonaRepositoryUseCase implements IPersonaRepositoryUseCase{
    
    repositoryPersonas :IPersonaRepository
    
    constructor(
        @inject(TYPES.IPersonaRepository)
        private RepositoryPersonas: IPersonaRepository
    ){
        this.repositoryPersonas= RepositoryPersonas
    }

    getPersonas(): Persona[] {
        
        return this.repositoryPersonas.getListadoCompletoPersonas()
    }
}