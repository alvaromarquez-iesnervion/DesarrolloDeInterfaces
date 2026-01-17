
import { inject, injectable } from "inversify";
import { IRepositoryPersonas } from "../Models/Data/personaRepository";
import { Persona } from "../Models/Entities/Persona";
import { TYPES } from "../Core/types";

/**
 * PeopleListVM (ViewModel for People List)
 * 
 * This ViewModel is responsible for managing the data and behavior of the people list view.
 * It acts as an intermediary between the view (UI) and the data layer (repository), implementing
 * the MVVM (Model-View-ViewModel) pattern for better separation of concerns and testability.
 * 
 * The ViewModel uses dependency injection to receive the repository instance, which allows for
 * easier testing and loose coupling between components.
 * 
 * Key responsibilities:
 * - Managing the list of personas (people) to be displayed
 * - Managing the currently selected persona
 * - Providing data access through getters
 * - Handling persona selection logic
 */
export class PeopleListVM {

    // Private property to store the complete list of personas
    private _personasList: Persona[] = [];
    
    // Private property to store the currently selected persona
    private _personaSeleccionada: Persona;
   
    /**
     * Constructor for PeopleListVM
     * 
     * Uses dependency injection to inject the persona repository instance.
     * This constructor is decorated with @injectable() to make it compatible with InversifyJS DI container.
     * The repository is injected using the TYPES.IRepositoryPersonas token which is defined in the types file.
     * 
     * Upon initialization, it populates the personas list by calling the repository's getListadoCompletoPersonas() method
     * and initializes the selected persona to a default empty Persona object with ID 0 and empty names.
     * 
     * @param RepositoryPersonas - The injected repository instance for managing persona data
     */
    constructor(
        @inject(TYPES.IRepositoryPersonas)
        private RepositoryPersonas: IRepositoryPersonas
    ) {
        // Initialize the selected persona with default values (ID 0, empty names)
        this._personaSeleccionada = new Persona(0, '', '');
        
        // Populate the personas list by calling the repository's method to get all personas
        this._personasList = this.RepositoryPersonas.getListadoCompletoPersonas();
    }
    
    /**
     * Getter for personasList property
     * 
     * Provides read-only access to the complete list of personas stored in the ViewModel.
     * This getter allows the view to access the list of personas without directly modifying it.
     * 
     * @returns {Persona[]} - Array of Persona objects representing all people in the system
     */
    public get personasList(): Persona[] {
        return this._personasList;
    }
    
    /**
     * Getter for personaSeleccionada property
     * 
     * Provides read-only access to the currently selected persona in the ViewModel.
     * This allows the view to display information about the selected person.
     * 
     * @returns {Persona} - The currently selected Persona object
     */
    public get personaSeleccionada(): Persona {
        return this._personaSeleccionada;
    }
    
    /**
     * Setter for personaSeleccionada property
     * 
     * Allows updating the currently selected persona in the ViewModel.
     * When a new persona is set, it updates the internal _personaSeleccionada property.
     * This setter enables the view to notify the ViewModel when a different persona is selected.
     * 
     * @param value - The Persona object to be set as the currently selected persona
     */
    public set personaSeleccionada(value: Persona) {
        this._personaSeleccionada = value; 
    }
  }
