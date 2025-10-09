class Persona {
  private readonly id: number;
  private name: string;
  private surname: string;

  constructor(id: number, name: string, surname: string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
  }

  public getId(): number {
    return this.id;
  }

  public getFullName(): string {
    return `${this.name} ${this.surname}`;
  }
}

export default Persona;
