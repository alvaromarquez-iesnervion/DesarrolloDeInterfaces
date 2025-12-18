import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import { container } from '../../di/DependencyContainer';
import { PokemonListViewModel } from '../viewmodels/PokemonListViewModel';
import { TYPES } from '../../di/types';

const PokemonListScreen: React.FC = observer(() => {
  // 1. Referencia para controlar el Scroll
  const flatListRef = useRef<FlatList>(null);

  // 2. Inyección del ViewModel
  const viewModel = useMemo(() => {
    return container.get<PokemonListViewModel>(TYPES.PokemonListViewModel);
  }, []);

  // 3. Carga inicial
  useEffect(() => {
    viewModel.loadMorePokemon();
  }, [viewModel]);

  const handleLoadMore = async () => {
    await viewModel.loadMorePokemon();
    // 4. TRUCO: Al cargar nuevos datos, subimos el scroll al inicio suavemente
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  const renderPokemonItem = ({ item }: { item: any }) => (
    <View style={styles.pokemonItem}>
      <Text style={styles.pokemonText}>
        {item.name}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pokémon</Text>
      
      {viewModel.getError && (
        <Text style={styles.errorText}>{viewModel.getError}</Text>
      )}

      <FlatList
        ref={flatListRef} // Conectamos la referencia
        data={viewModel.getPokemonList}
        renderItem={renderPokemonItem}
        keyExtractor={(item) => item.name}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        // Nota: Quitamos onEndReached porque ahora es manual por botón
      />

      <TouchableOpacity
        style={[styles.button, viewModel.getIsLoading && styles.buttonDisabled]}
        onPress={handleLoadMore}
        disabled={viewModel.getIsLoading}
      >
        {viewModel.getIsLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Siguiente Página {'>'}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    flex: 1,
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 10,
  },
  pokemonItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pokemonText: {
    fontSize: 16,
    color: '#333',
    textTransform: 'capitalize',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default PokemonListScreen;