import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button, Alert, ActivityIndicator } from 'react-native';

import { useRouter } from 'expo-router';
import { PersonaViewModel } from '../../vms/PersonaViewModel';
import { observer } from 'mobx-react-lite';
import { TYPES } from '../../../di/types';
import { useInjection } from '../../../di/useIOC';

// El componente se envuelve en observer para reaccionar a cambios en el VM
export const ListadoPersonasView = observer(() => {
    // Inyección de dependencias
    const vm = useInjection<PersonaViewModel>(TYPES.PersonaViewModel);
    const router = useRouter();

    useEffect(() => {
        vm.getPersonas();
    }, []);

    const handleEliminar = async (id: number) => {
        try {
            await vm.deletePersona(id);
        } catch (error: any) {
            Alert.alert("Error", vm.error || "No se pudo eliminar");
        }
    };

    const navegarCrear = () => {
        vm.setPersonaSeleccionada(null);
        router.push('/(drawer)/(persona)/editarCrearPersona');
    };

    const navegarEditar = (persona: any) => {
        vm.setPersonaSeleccionada(persona);
        router.push('/(drawer)/(persona)/editarCrearPersona');
    };

    if (vm.loading && vm.personas.length === 0) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput 
                placeholder="Buscar..."
                value={vm.filtro}
                onChangeText={(t) => vm.setFiltro(t)}
                style={{ borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 }}
            />
            
            <Button title="Nueva Persona" onPress={navegarCrear} />

            <FlatList
                data={vm.personasFiltradas} // Propiedad computada de MobX
                keyExtractor={(item) => item.id.toString()}
                style={{ marginTop: 10 }}
                renderItem={({ item }) => (
                    <View style={{ padding: 15, borderBottomWidth: 1, borderColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.nombre} {item.apellidos}</Text>
                            <Text>Edad: {item.edad}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity onPress={() => navegarEditar(item)}>
                                <Text style={{ color: 'blue' }}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleEliminar(item.id)}>
                                <Text style={{ color: 'red' }}>Borrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
});