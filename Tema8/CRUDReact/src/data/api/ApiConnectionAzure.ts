import { IApiConnection } from "../../domain/interfaces/api/IApiConnection";

export class ApiConnectionAzure implements IApiConnection {
  private BASE_URL = "https://crudpersona-hkhvf3gkhfgpb6cy.spaincentral-01.azurewebsites.net/API"; // Reemplazar con URL real
  private PERSONAS_ENDPOINT = "/personas";
  private DEPARTAMENTOS_ENDPOINT = "/departamentos";

  getBaseUrl(): string {
    return this.BASE_URL;
  }
  getPersonasUrl(): string {
    return `${this.BASE_URL}${this.PERSONAS_ENDPOINT}`;
  }
  getDepartamentosUrl(): string {
    return `${this.BASE_URL}${this.DEPARTAMENTOS_ENDPOINT}`;
  }
}