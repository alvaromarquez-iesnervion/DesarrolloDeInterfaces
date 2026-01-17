import { Departamento } from "../../entities/Departamento";

export interface IDepartamentoUseCase {
  getDepartamentos(): Promise<Departamento[]>;
  getDepartamentoById(id: number): Promise<Departamento>;
  createDepartamento(departamento: Departamento): Promise<number>;
  updateDepartamento(id: number, departamento: Departamento): Promise<number>;
  deleteDepartamento(id: number): Promise<number>;
}