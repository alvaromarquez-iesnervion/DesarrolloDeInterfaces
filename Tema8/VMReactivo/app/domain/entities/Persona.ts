export class Persona {
  id: number;
  nombre: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  foto: string;
  fechaNacimiento: Date;
  departamento: string;

  constructor(
    id: number,
    nombre: string,
    apellidos: string,
    fechaNacimiento: Date,
    direccion: string,
    telefono: string,
    departamento: string,
    foto: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.fechaNacimiento = fechaNacimiento;
    this.direccion = direccion;
    this.telefono = telefono;
    this.departamento = departamento;
    this.foto = foto;
  }
}
