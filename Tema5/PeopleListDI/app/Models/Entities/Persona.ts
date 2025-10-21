export class Persona {
    private id: number;
    private nombre: string;
    private apellidos: string;

    constructor(id: number, nombre: string, apellidos: string) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
    }

    get Id(): number {
        return this.id;
    }

    get Nombre(): string {
        return this.nombre;
    }
    get Apellidos(): string {
        return this.apellidos;
    }

    set Nombre(nombre: string) {
        this.nombre = nombre;
    }
    set Apellidos(apellidos: string) {
        this.apellidos = apellidos;
    }

    get NombreCompleto(): string {
        return `${this.nombre} ${this.apellidos}`;
    }
}
