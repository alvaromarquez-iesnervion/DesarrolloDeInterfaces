import { Container, ServiceIdentifier } from "inversify"; // Importa ServiceIdentifier directamente
import { container } from "./container";
import React from "react";

// Eliminamos 'interfaces.' y usamos el tipo directo
export function useInjection<T>(identifier: ServiceIdentifier<T>): T {
    return container.get<T>(identifier);
}