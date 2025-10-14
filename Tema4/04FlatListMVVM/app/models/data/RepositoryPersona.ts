import Persona from "../entities/PersonaModel";

export class RepositoryPersona {
  /**
   * Funcion static que devuelve un listado de personas
   * pre-c: nada
   * post-c: El listado de personas no puede estar vacio
   * 
   */
  public static getPersonas(): Persona[] {
    return [
      new Persona(1, "Lucía", "Gómez Pérez"),
      new Persona(2, "Carlos", "Ruiz Martínez"),
      new Persona(3, "Marina", "Sánchez Torres"),
      new Persona(4, "Javier", "López Serrano"),
      new Persona(5, "Ana", "Moreno Díaz"),
      new Persona(6, "Pablo", "Fernández Romero"),
      new Persona(7, "Sara", "Jiménez García"),
      new Persona(8, "David", "Castro Alonso"),
      new Persona(9, "Marta", "Ortega Ramos"),
      new Persona(10, "Álvaro", "Gutiérrez Vega"),
      new Persona(11, "Elena", "Navarro Ruiz"),
      new Persona(12, "Miguel", "Domínguez León"),
      new Persona(13, "Irene", "Santos Molina"),
      new Persona(14, "Raúl", "Carmona Gil"),
      new Persona(15, "Laura", "Vargas Rubio"),
    ];
  }
}
