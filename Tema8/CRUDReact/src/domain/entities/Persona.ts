export class Persona {
  constructor(
    public id: number,
    public nombre: string,
    public apellidos: string,
    public telefono: string,
    public direccion: string,
    public foto: string,
    public fechaNacimiento: Date,
    public departamentoId: number
  ) {}

  // Helper para regla de negocio
  get edad(): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - this.fechaNacimiento.getFullYear();
    const m = hoy.getMonth() - this.fechaNacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < this.fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  }
}