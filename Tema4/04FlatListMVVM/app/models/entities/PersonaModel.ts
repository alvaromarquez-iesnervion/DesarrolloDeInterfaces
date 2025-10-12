class Persona {
  private readonly _id: number;
  private _name: string;
  private _surname: string;

  constructor(id: number, name: string, surname: string) {
    this._id = id;
    this._name = name;
    this._surname = surname;
  }

  public Id(): number {
    return this._id;
  }

  public name() : string{
    return this._name
  }

  public surname(): string{
    return this._surname
  }

  public getFullName(): string {
    return `${this._name} ${this._surname}`;
  }
}

export default Persona;
