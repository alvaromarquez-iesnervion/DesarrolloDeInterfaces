import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'expo-router';
import { useInjection } from '../../../di/useIOC';
import { TYPES } from '../../../di/types';
import { DepartamentoViewModel } from '../../vms/DepartamentoViewModel';

export const ListadoDepartamentosView = observer(() => {
    // Inyección de la instancia Singleton del VM
    const vm = useInjection<DepartamentoViewModel>(TYPES.DepartamentoViewModel);
    const router = useRouter();

    useEffect(() => {
        vm.getDepartamentos();
    }, []);

    const handleEliminar = async (id: number) => {
        Alert.alert(
            "Eliminar",
            "¿Estás seguro?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await vm.deleteDepartamento(id);
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar el departamento");
                        }
                    } 
                }
            ]
        );
    };

    const irACrear = () => {
        vm.setDepartamentoSeleccionado(null);
        router.push('/(drawer)/(departamento)/editarCrearDepartamento');
    };

    const irAEditar = (item: any) => {
        vm.setDepartamentoSeleccionado(item);
        router.push('/(drawer)/(departamento)/editarCrearDepartamento');
    };

    if (vm.loading && vm.departamentos.length === 0) {
        return <View style={styles.center}><ActivityIndicator size="large" /></View>;
    }

    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="Buscar departamento..."
                value={vm.filtro}
                onChangeText={(t) => vm.setFiltro(t)}
                style={styles.input}
            />
            
            <Button title="Añadir Departamento" onPress={irACrear} />

            {vm.error && <Text style={styles.error}>{vm.error}</Text>}

            <FlatList
                data={vm.departamentosFiltrados}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ marginTop: 15 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={{flex: 1}}>
                            <Text style={styles.title}>{item.nombre}</Text>
                            <Text style={styles.subtitle}>ID: {item.id}</Text>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => irAEditar(item)}>
                                <Text style={styles.linkBlue}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleEliminar(item.id)}>
                                <Text style={styles.linkRed}>Borrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 },
    error: { color: 'red', marginVertical: 10 },
    card: { 
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        padding: 15, borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#fff' 
    },
    title: { fontWeight: 'bold', fontSize: 16 },
    subtitle: { color: '#666', fontSize: 12 },
    actions: { flexDirection: 'row', gap: 15 },
    linkBlue: { color: '#007AFF' },
    linkRed: { color: '#FF3B30' }
});