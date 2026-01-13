import { Departamento } from "../../domain/entities/Departamento";
import { IApiConnection } from "../../domain/interfaces/api/IApiConnection";
import { IDepartamentoRepository } from "../../domain/interfaces/repos/IDepartamentoRepository";

export class DepartamentoRepository implements IDepartamentoRepository {
  constructor(private apiConnection: IApiConnection) {}

  async getAllDepartamentos(): Promise<Departamento[]> {
    const response = await fetch(this.apiConnection.getDepartamentosUrl());
    if (!response.ok) throw new Error("Error fetching departamentos");
    const data = await response.json();
    // Asumiendo que data es Departamento[] directo
    return data.map((d: any) => new Departamento(d.id, d.nombre));
  }

  async getDepartamentoById(id: number): Promise<Departamento> {
    const response = await fetch(`${this.apiConnection.getDepartamentosUrl()}/${id}`);
    if (!response.ok) throw new Error("Error fetching departamento");
    const d = await response.json();
    return new Departamento(d.id, d.nombre);
  }

  async createDepartamento(departamento: Departamento): Promise<number> {
    const response = await fetch(this.apiConnection.getDepartamentosUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(departamento),
    });
    if (!response.ok) throw new Error("Error creating departamento");
    return response.status;
  }

  async updateDepartamento(id: number, departamento: Departamento): Promise<number> {
    const response = await fetch(`${this.apiConnection.getDepartamentosUrl()}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(departamento),
    });
    if (!response.ok) throw new Error("Error updating departamento");
    return response.status;
  }

  async deleteDepartamento(id: number): Promise<number> {
    const response = await fetch(`${this.apiConnection.getDepartamentosUrl()}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error deleting departamento");
    return response.status;
  }
}