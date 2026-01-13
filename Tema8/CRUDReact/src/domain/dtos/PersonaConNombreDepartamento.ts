export interface PersonaConNombreDepartamento {
  id: number;
  nombre: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  foto: string;
  fechaNacimiento: string; // La API suele devolver strings
  nombreDepartamento: string;
  departamentoId: number; // Necesario para el mapeo inverso
}