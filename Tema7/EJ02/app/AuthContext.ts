export class AuthContext {
    private isLoggedIn: boolean;
    private username: string | null;
    constructor() {
        this.isLoggedIn = false;
        this.username = null;
    }
    public loginUser(username: string) {
        this.isLoggedIn = true;
        this.username = username;
    }
    public logoutUser(){
        this.isLoggedIn = false;
        this.username = null;
    }
}