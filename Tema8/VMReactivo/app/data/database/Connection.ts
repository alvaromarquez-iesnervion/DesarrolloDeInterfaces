
export class Connection{

    private static string_url: String = "https://crudpersona-hkhvf3gkhfgpb6cy.spaincentral-01.azurewebsites.net/api/"
    

    public static getConnection(): String {
        
        return this.string_url
    }
    
}