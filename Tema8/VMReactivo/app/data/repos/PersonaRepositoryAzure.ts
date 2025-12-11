import { Persona } from "@/app/domain/entities/Persona";
import { IPersonaRepository } from "@/app/domain/repos/IPersonaRepository";
import { injectable } from "inversify";
import { Connection } from "../database/Connection";

@injectable()
export class PersonaRepositoryAzure implements IPersonaRepository{
    

    async getListadoCompletoPersonas(): Promise<Persona[]> {
        
        try{
            const url = Connection.getConnection() + "personas";
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status}`);
            }
            
            const data: Persona[] = await response.json();
            return data;
        } catch(error){
            console.error("Error obteniendo personas:", error);
            throw error;
        }
    }
}