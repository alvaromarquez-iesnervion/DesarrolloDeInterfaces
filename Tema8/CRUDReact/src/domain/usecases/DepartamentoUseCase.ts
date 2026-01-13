import { Departamento } from "../entities/Departamento";
import { IDepartamentoRepository } from "../interfaces/repos/IDepartamentoRepository";
import { IDepartamentoUseCase } from "../interfaces/usecases/IDepartamentoUseCase";

export class DepartamentoUseCase implements IDepartamentoUseCase {
  constructor(private departamentoRepository: IDepartamentoRepository) {}

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