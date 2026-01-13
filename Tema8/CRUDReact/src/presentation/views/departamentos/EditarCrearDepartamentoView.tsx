import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'expo-router';
import { useInjection } from '../../../di/useIOC';
import { TYPES } from '../../../di/types';
import { DepartamentoViewModel } from '../../vms/DepartamentoViewModel';

export const EditarCrearDepartamentoView = observer(() => {
    const vm = useInjection<DepartamentoViewModel>(TYPES.DepartamentoViewModel);
    const router = useRouter();

    // UI State (local)
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        if (vm.departamentoSeleccionado) {
            setNombre(vm.departamentoSeleccionado.nombre);
        } else {
            setNombre('');
        }
    }, [vm.departamentoSeleccionado]);

    const handleGuardar = async () => {
        if (!nombre.trim()) {
            Alert.alert("Validación", "El nombre es obligatorio");
            return;
        }

        try {
            if (vm.departamentoSeleccionado) {
                await vm.updateDepartamento(vm.departamentoSeleccionado.id, nombre);
            } else {
                await vm.createDepartamento(nombre);
            }
            router.back();
        } catch (e) {
            Alert.alert("Error", vm.error || "No se pudo guardar");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                {vm.departamentoSeleccionado ? 'Editar Departamento' : 'Crear Departamento'}
            </Text>

            <Text style={styles.label}>Nombre del Departamento:</Text>
            <TextInput 
                value={nombre} 
                onChangeText={setNombre} 
                style={styles.input}
                placeholder="Ej. Recursos Humanos"
            />

            <Button 
                title={vm.loading ? "Guardando..." : "Guardar"} 
                onPress={handleGuardar} 
                disabled={vm.loading} 
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    label: { marginBottom: 5, fontWeight: '600' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 20 }
});