export class Persona {
  id: number;
  nombre: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  foto: string;
  fechaNacimiento: Date;
  idDepartamento: number;

  constructor(
    id: number,
    nombre: string,
    apellidos: string,
    fechaNacimiento: Date,
    direccion: string,
    telefono: string,
    idDepartamento: number,
    foto: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.fechaNacimiento = fechaNacimiento;
    this.direccion = direccion;
    this.telefono = telefono;
    this.idDepartamento = idDepartamento;
    this.foto = foto;
  }
}
