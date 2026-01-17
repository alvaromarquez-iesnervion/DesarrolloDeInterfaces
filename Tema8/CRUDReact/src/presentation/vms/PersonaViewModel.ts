import { makeAutoObservable, runInAction } from "mobx";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import { Persona } from "../../domain/entities/Persona";
import { Departamento } from "../../domain/entities/Departamento";
import { IPersonaUseCase } from "../../domain/interfaces/usecases/IPersonaUseCase";
import { IDepartamentoUseCase } from "../../domain/interfaces/usecases/IDepartamentoUseCase";

@injectable()
export class PersonaViewModel {
    personas: Persona[] = [];
    personaSeleccionada: Persona | null = null;
    departamentos: Departamento[] = [];
    loading: boolean = false;
    error: string | null = null;
    filtro: string = "";

    constructor(
        @inject(TYPES.PersonaUseCase) private personaUseCase: IPersonaUseCase,
        @inject(TYPES.DepartamentoUseCase) private departamentoUseCase: IDepartamentoUseCase
    ) {
        makeAutoObservable(this);
    }

    async getPersonas() {
        this.loading = true;
        this.error = null;
        try {
            const data = await this.personaUseCase.getPersonas();
            runInAction(() => {
                this.personas = data;
            });
        } catch (e: any) {
            runInAction(() => {
                this.error = e.message;
            });
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async createPersona(persona: Persona) {
        this.loading = true;
        try {
            await this.personaUseCase.createPersona(persona);
            await this.getPersonas();
        } catch (e: any) {
            runInAction(() => {
                this.error = e.message;
            });
            throw e; // Relanzar para que la vista sepa que falló
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async updatePersona(id: number, persona: Persona) {
        this.loading = true;
        try {
            await this.personaUseCase.updatePersona(id, persona);
            await this.getPersonas();
        } catch (e: any) {
            runInAction(() => {
                this.error = e.message;
            });
            throw e;
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async deletePersona(id: number) {
        // No ponemos loading false aquí inmediatamente para que la UI no parpadee si se queda en la misma pantalla
        try {
            await this.personaUseCase.deletePersona(id);
            await this.getPersonas();
        } catch (e: any) {
            runInAction(() => {
                this.error = e.message;
            });
            throw e;
        }
    }

    setPersonaSeleccionada(persona: Persona | null) {
        this.personaSeleccionada = persona;
    }

    setFiltro(filtro: string) {
        this.filtro = filtro;
    }

    // Computed property (MobX optimiza esto automáticamente)
    get personasFiltradas() {
        if (!this.filtro) return this.personas;
        const f = this.filtro.toLowerCase();
        return this.personas.filter(p => 
            p.nombre.toLowerCase().includes(f) || 
            p.apellidos.toLowerCase().includes(f)
        );
    }

    async cargarDepartamentos() {
        try {
            const deps = await this.departamentoUseCase.getDepartamentos();
            runInAction(() => {
                this.departamentos = deps;
            });
        } catch (e) {
            console.error(e);
        }
    }
}