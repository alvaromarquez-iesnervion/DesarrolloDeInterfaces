import { injectable, inject } from "inversify";
import { TYPES } from "../../di/types";
import { IDepartamentoUseCase } from "../interfaces/usecases/IDepartamentoUseCase";
import { IDepartamentoRepository } from "../interfaces/repos/IDepartamentoRepository";
import { Departamento } from "../entities/Departamento";

@injectable()
export class DepartamentoUseCase implements IDepartamentoUseCase {
    constructor(
        @inject(TYPES.DepartamentoRepository) private departamentoRepository: IDepartamentoRepository // <--- IMPORTANTE
    ) {}

  getDepartamentos(): Promise<Departamento[]> {
    return this.departamentoRepository.getAllDepartamentos();
  }
  getDepartamentoById(id: number): Promise<Departamento> {
    return this.departamentoRepository.getDepartamentoById(id);
  }
  createDepartamento(departamento: Departamento): Promise<number> {
    return this.departamentoRepository.createDepartamento(departamento);
  }
  updateDepartamento(id: number, departamento: Departamento): Promise<number> {
    return this.departamentoRepository.updateDepartamento(id, departamento);
  }
  deleteDepartamento(id: number): Promise<number> {
    return this.departamentoRepository.deleteDepartamento(id);
  }
}