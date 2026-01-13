export const TYPES = {
    // API & Data
    ApiConnection: Symbol.for("ApiConnection"),
    
    // Repositories
    PersonaRepository: Symbol.for("PersonaRepository"),
    DepartamentoRepository: Symbol.for("DepartamentoRepository"),
    
    // Use Cases
    PersonaUseCase: Symbol.for("PersonaUseCase"),
    DepartamentoUseCase: Symbol.for("DepartamentoUseCase"),
    
    // ViewModels (Singletons)
    PersonaViewModel: Symbol.for("PersonaViewModel"),
    DepartamentoViewModel: Symbol.for("DepartamentoViewModel"),
};