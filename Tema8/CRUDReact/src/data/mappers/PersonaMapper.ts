import { PersonaConListadoDepartamento } from "../../domain/dtos/PersonaConListadoDepartamento";
import { PersonaConNombreDepartamento } from "../../domain/dtos/PersonaConNombreDepartamento";
import { Departamento } from "../../domain/entities/Departamento";
import { Persona } from "../../domain/entities/Persona";

export class PersonaMapper {
  static fromApiToEntity(apiPersona: PersonaConNombreDepartamento): Persona {
    return new Persona(
      apiPersona.id,
      apiPersona.nombre,
      apiPersona.apellidos,
      apiPersona.telefono,
      apiPersona.direccion,
      apiPersona.foto,
      new Date(apiPersona.fechaNacimiento),
      apiPersona.departamentoId 
    );
  }

  // Nota: Para enviar a la API, a menudo solo se envía el JSON de la persona, 
  // pero seguimos la firma solicitada en la estructura.
  static fromEntityToApi(persona: Persona, listadoDepartamento: Departamento[]): PersonaConListadoDepartamento {
    return {
      id: persona.id,
      nombre: persona.nombre,
      apellidos: persona.apellidos,
      telefono: persona.telefono,
      direccion: persona.direccion,
      foto: persona.foto,
      fechaNacimiento: persona.fechaNacimiento.toISOString(),
      departamentoId: persona.departamentoId,
      listadoDepartamento: listadoDepartamento
    };
  }
}