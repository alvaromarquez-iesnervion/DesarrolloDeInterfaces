import { Departamento } from "../entities/Departamento";

export interface PersonaConListadoDepartamento {
  id: number;
  nombre: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  foto: string;
  fechaNacimiento: string;
  departamentoId: number;
  listadoDepartamento: Departamento[];
}