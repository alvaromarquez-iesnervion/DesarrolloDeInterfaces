import { IPersonaRepository } from "@/app/domain/repos/IPersonaRepository";
import { injectable } from "inversify";
import { Persona } from "@/app/domain/entities/Persona";

@injectable()
export class PersonasRepository implements IPersonaRepository {

  getListadoCompletoPersonas(): Persona[] {

    const personas: Persona[] = [];

    const nombres = [
      "Álvaro", "Pablo", "Laura", "Miguel", "Carmen", "Lucía", "Sergio", "David", "Javier", "Clara",
      "Mario", "Irene", "Nuria", "Raúl", "Jorge", "Elena", "Ana", "Rosa", "Carlos", "Rubén",
      "Diego", "Alba", "Eva", "Marina", "Cristina", "Isabel", "Adrián", "Antonio", "Juan", "Mateo"
    ];

    const apellidos = [
      "Marquez Cobos", "García López", "Sánchez Ruiz", "Torres Díaz", "Romero Pérez",
      "Navas Ortega", "Castro Martín", "Fernández Mora", "Vega Aragón", "Prieto Ramos"
    ];

    for (let i = 1; i <= 100; i++) {
      const nombre = nombres[Math.floor(Math.random() * nombres.length)];
      const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];

      personas.push(
        new Persona(
          i,
          nombre,
          apellido,
          new Date(1990 + (i % 20), (i % 12), (i % 28) + 1),
          `Calle Falsa ${i}, Sevilla`,
          `600000${(i % 100).toString().padStart(2, "0")}`,
          (i % 5) + 1,
          `https://picsum.photos/200?random=${i}`
        )
      );
    }

    return personas;
  }
}
