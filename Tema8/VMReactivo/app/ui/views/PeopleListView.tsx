import { container } from "@/app/core/container";
import React, { useRef, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Animated, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PeopleListVM } from "../VMs/PeopleListVM";
import { TYPES } from "@/app/core/types";
import { Persona } from "@/app/domain/entities/Persona";
import { observer } from "mobx-react-lite";

const PersonCard = ({ item, onPress, isSelected }: { item: Persona, onPress: () => void, isSelected: boolean }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSelected) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      glowAnim.setValue(0);
    }
  }, [isSelected]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <Pressable 
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[
        styles.card,
        isSelected && styles.cardSelected,
        { transform: [{ scale: scaleAnim }] }
      ]}>
        {isSelected && (
          <Animated.View 
            style={[
              styles.glowEffect,
              { opacity: glowOpacity }
            ]} 
          />
        )}
        <View style={styles.cardContent}>
          <View style={[styles.avatar, isSelected && styles.avatarSelected]}>
            <View style={styles.avatarGlow} />
            {item.foto ? (
              <Image 
                source={{ uri: item.foto }} 
                style={styles.avatarImage}
              />
            ) : (
              <Text style={styles.avatarText}>
                {item.nombre.charAt(0)}{item.apellidos.charAt(0)}
              </Text>
            )}
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>{item.nombre} {item.apellidos}</Text>
            <View style={styles.cardMetaContainer}>
              <View style={styles.idBadge}>
                <Text style={styles.cardSubtitle}>#{item.id}</Text>
              </View>
            </View>
          </View>
          {isSelected && (
            <View style={styles.selectedBadge}>
              <View style={styles.selectedBadgeGlow} />
              <Text style={styles.selectedBadgeText}>✓</Text>
            </View>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
};

const PeopleListView = observer(() => {
  const vmRef = useRef<PeopleListVM | null>(null);
  const headerGlow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(headerGlow, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(headerGlow, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  if (vmRef.current === null) {
    vmRef.current = container.get<PeopleListVM>(TYPES.IndexVM);
  }

  const viewModel = vmRef.current;

  const renderItem = ({ item }: { item: Persona }) => (
    <PersonCard 
      item={item}
      onPress={() => { viewModel.personaSeleccionada = item; }}
      isSelected={viewModel.personaSeleccionada?.id === item.id}
    />
  );

  const glowColor = headerGlow.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['rgba(139, 92, 246, 0.2)', 'rgba(59, 130, 246, 0.2)', 'rgba(139, 92, 246, 0.2)'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <Animated.View style={[styles.headerGlow, { backgroundColor: glowColor }]} />
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Directorio</Text>
              <View style={styles.titleUnderline} />
            </View>
            <View style={styles.badge}>
              <View style={styles.badgeGlow} />
              <Text style={styles.badgeText}>{viewModel.personasList.length}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Sistema de Gestión de Personas</Text>
        </View>

        {viewModel.personaSeleccionada && (
          <View style={styles.selectedCard}>
            <View style={styles.selectedCardGlow} />
            <View style={styles.selectedHeader}>
              <View style={styles.selectedLabelContainer}>
                <View style={styles.selectedPulse} />
                <Text style={styles.selectedLabel}>ACTIVO</Text>
              </View>
              <View style={styles.statusIndicator}>
                <View style={styles.statusDot} />
              </View>
            </View>
            <Text style={styles.selectedName}>
              {viewModel.personaSeleccionada.nombre} {viewModel.personaSeleccionada.apellidos}
            </Text>
            <View style={styles.selectedMeta}>
              <View style={styles.selectedIdBadge}>
                <Text style={styles.selectedId}>ID: {viewModel.personaSeleccionada.id}</Text>
              </View>
            </View>
          </View>
        )}

        <FlatList
          data={viewModel.personasList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <View style={styles.emptyIconGlow} />
                <Text style={styles.emptyIcon}>👥</Text>
              </View>
              <Text style={styles.emptyText}>No hay personas registradas</Text>
              <Text style={styles.emptySubtext}>Agrega tu primer contacto para comenzar</Text>
              <View style={styles.emptyDivider} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050814",
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 28,
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
  },
  headerGlow: {
    position: "absolute",
    top: 0,
    left: -50,
    right: -50,
    height: 150,
    borderRadius: 100,
    opacity: 0.3,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
    zIndex: 1,
  },
  title: {
    fontSize: 38,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -1.5,
    textShadowColor: "rgba(139, 92, 246, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  titleUnderline: {
    marginTop: 4,
    height: 3,
    width: 60,
    backgroundColor: "#8b5cf6",
    borderRadius: 2,
    shadowColor: "#8b5cf6",
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  badge: {
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "rgba(59, 130, 246, 0.5)",
    position: "relative",
    overflow: "hidden",
  },
  badgeGlow: {
    position: "absolute",
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    borderRadius: 30,
  },
  badgeText: {
    color: "#60a5fa",
    fontSize: 16,
    fontWeight: "800",
    textShadowColor: "rgba(96, 165, 250, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#94a3b8",
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    zIndex: 1,
  },
  selectedCard: {
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    borderWidth: 2,
    borderColor: "rgba(139, 92, 246, 0.6)",
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 24,
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#8b5cf6",
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  selectedCardGlow: {
    position: "absolute",
    top: -100,
    left: -100,
    right: -100,
    bottom: -100,
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    borderRadius: 200,
  },
  selectedHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    zIndex: 1,
  },
  selectedLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedPulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#8b5cf6",
    marginRight: 10,
    shadowColor: "#8b5cf6",
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  selectedLabel: {
    fontSize: 12,
    color: "#a78bfa",
    fontWeight: "900",
    letterSpacing: 2,
  },
  statusIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.4)",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22c55e",
    shadowColor: "#22c55e",
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
  selectedName: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "800",
    marginBottom: 8,
    zIndex: 1,
    textShadowColor: "rgba(139, 92, 246, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  selectedMeta: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  selectedIdBadge: {
    backgroundColor: "rgba(100, 116, 139, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.3)",
  },
  selectedId: {
    fontSize: 13,
    color: "#cbd5e1",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(100, 116, 139, 0.3)",
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  cardSelected: {
    backgroundColor: "rgba(59, 130, 246, 0.08)",
    borderColor: "rgba(139, 92, 246, 0.7)",
    borderWidth: 2,
    shadowColor: "#8b5cf6",
    shadowOpacity: 0.5,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },
  glowEffect: {
    position: "absolute",
    top: -50,
    left: -50,
    right: -50,
    bottom: -50,
    backgroundColor: "rgba(139, 92, 246, 0.3)",
    borderRadius: 100,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    zIndex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(100, 116, 139, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 2,
    borderColor: "rgba(148, 163, 184, 0.4)",
    position: "relative",
    overflow: "hidden",
  },
  avatarSelected: {
    backgroundColor: "rgba(139, 92, 246, 0.3)",
    borderColor: "rgba(139, 92, 246, 0.8)",
    borderWidth: 3,
  },
  avatarGlow: {
    position: "absolute",
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    backgroundColor: "rgba(139, 92, 246, 0.2)",
    borderRadius: 50,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    zIndex: 1,
  },
  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    zIndex: 1,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#f8fafc",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  cardMetaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  idBadge: {
    backgroundColor: "rgba(100, 116, 139, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.3)",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  selectedBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#8b5cf6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8b5cf6",
    shadowOpacity: 0.8,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    position: "relative",
    overflow: "hidden",
  },
  selectedBadgeGlow: {
    position: "absolute",
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    backgroundColor: "rgba(139, 92, 246, 0.4)",
    borderRadius: 30,
  },
  selectedBadgeText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
    zIndex: 1,
  },
  separator: {
    height: 14,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(100, 116, 139, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
    borderWidth: 2,
    borderColor: "rgba(139, 92, 246, 0.3)",
    position: "relative",
    overflow: "hidden",
  },
  emptyIconGlow: {
    position: "absolute",
    top: -30,
    left: -30,
    right: -30,
    bottom: -30,
    backgroundColor: "rgba(139, 92, 246, 0.15)",
    borderRadius: 100,
  },
  emptyIcon: {
    fontSize: 52,
    zIndex: 1,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#e2e8f0",
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  emptyDivider: {
    marginTop: 20,
    width: 60,
    height: 3,
    backgroundColor: "#8b5cf6",
    borderRadius: 2,
    shadowColor: "#8b5cf6",
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
});

export default PeopleListView;