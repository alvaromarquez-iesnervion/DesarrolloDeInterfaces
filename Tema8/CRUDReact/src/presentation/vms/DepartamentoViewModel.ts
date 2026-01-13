import { makeAutoObservable, runInAction } from "mobx";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import { Departamento } from "../../domain/entities/Departamento";
import { IDepartamentoUseCase } from "../../domain/interfaces/usecases/IDepartamentoUseCase";

@injectable()
export class DepartamentoViewModel {
    departamentos: Departamento[] = [];
    departamentoSeleccionado: Departamento | null = null;
    loading: boolean = false;
    error: string | null = null;
    filtro: string = "";

    constructor(
        @inject(TYPES.DepartamentoUseCase) private departamentoUseCase: IDepartamentoUseCase
    ) {
        makeAutoObservable(this);
    }

    async getDepartamentos() {
        this.loading = true;
        this.error = null;
        try {
            const data = await this.departamentoUseCase.getDepartamentos();
            runInAction(() => {
                this.departamentos = data;
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

    async getDepartamentoById(id: number) {
        this.loading = true;
        try {
            const data = await this.departamentoUseCase.getDepartamentoById(id);
            runInAction(() => {
                this.departamentoSeleccionado = data;
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

    async createDepartamento(nombre: string) {
        this.loading = true;
        // Creamos un objeto temporal con ID 0, la API asignará el ID real
        const nuevoDept = new Departamento(0, nombre);
        try {
            await this.departamentoUseCase.createDepartamento(nuevoDept);
            // Recargamos la lista para ver el cambio
            await this.getDepartamentos();
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

    async updateDepartamento(id: number, nombre: string) {
        this.loading = true;
        const deptEditado = new Departamento(id, nombre);
        try {
            await this.departamentoUseCase.updateDepartamento(id, deptEditado);
            await this.getDepartamentos();
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

    async deleteDepartamento(id: number) {
        // Aquí no activamos loading global para evitar parpadeos si no es necesario,
        // o podríamos manejar un estado "deletingId".
        try {
            await this.departamentoUseCase.deleteDepartamento(id);
            await this.getDepartamentos();
        } catch (e: any) {
            runInAction(() => {
                this.error = e.message;
            });
            throw e;
        }
    }

    setDepartamentoSeleccionado(departamento: Departamento | null) {
        this.departamentoSeleccionado = departamento;
    }

    setFiltro(filtro: string) {
        this.filtro = filtro;
    }

    // Computed property: MobX la recalcula solo si cambia 'filtro' o 'departamentos'
    get departamentosFiltrados() {
        if (!this.filtro) return this.departamentos;
        const f = this.filtro.toLowerCase();
        return this.departamentos.filter(d => 
            d.nombre.toLowerCase().includes(f)
        );
    }
}