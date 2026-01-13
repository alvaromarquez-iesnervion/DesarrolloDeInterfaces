import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { PersonaViewModel } from '../../vms/PersonaViewModel';
import { observer } from 'mobx-react-lite';
import { TYPES } from '../../../di/types';
import { useInjection } from '../../../di/useIOC';
import { Persona } from '../../../domain/entities/Persona';

export const EditarCrearPersonaView = observer(() => {
    const vm = useInjection<PersonaViewModel>(TYPES.PersonaViewModel);
    const router = useRouter();

    // Estado local del formulario (UI State)
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [fecha, setFecha] = useState('');
    const [deptId, setDeptId] = useState('');

    useEffect(() => {
        vm.cargarDepartamentos();
        if (vm.personaSeleccionada) {
            setNombre(vm.personaSeleccionada.nombre);
            setApellidos(vm.personaSeleccionada.apellidos);
            setFecha(vm.personaSeleccionada.fechaNacimiento.toISOString().split('T')[0]);
            setDeptId(vm.personaSeleccionada.departamentoId.toString());
        }
    }, []);

    const handleGuardar = async () => {
        const nuevaPersona = new Persona(
            vm.personaSeleccionada?.id || 0,
            nombre,
            apellidos,
            "000000000",
            "Dirección Test",
            "",
            new Date(fecha),
            parseInt(deptId) || 0
        );

        try {
            if (vm.personaSeleccionada) {
                await vm.updatePersona(nuevaPersona.id, nuevaPersona);
            } else {
                await vm.createPersona(nuevaPersona);
            }
            router.back();
        } catch (e) {
            Alert.alert("Error", vm.error || "Falló al guardar");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
                {vm.personaSeleccionada ? 'Editar Persona' : 'Crear Persona'}
            </Text>

            <Text>Nombre</Text>
            <TextInput value={nombre} onChangeText={setNombre} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />

            <Text>Apellidos</Text>
            <TextInput value={apellidos} onChangeText={setApellidos} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />

            <Text>Fecha (YYYY-MM-DD)</Text>
            <TextInput value={fecha} onChangeText={setFecha} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />

            <Text>Departamento ID</Text>
            <TextInput value={deptId} onChangeText={setDeptId} keyboardType='numeric' style={{ borderWidth: 1, marginBottom: 20, padding: 5 }} />

            <Button title={vm.loading ? "Guardando..." : "Guardar"} onPress={handleGuardar} disabled={vm.loading} />
        </View>
    );
});