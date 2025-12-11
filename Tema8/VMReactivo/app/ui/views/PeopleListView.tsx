import { container } from "@/app/core/container";
import React, { useRef, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Animated, Image, Dimensions, Platform, Easing } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PeopleListVM } from "../VMs/PeopleListVM";
import { TYPES } from "@/app/core/types";
import { Persona } from "@/app/domain/entities/Persona";
import { observer } from "mobx-react-lite";

const { width } = Dimensions.get("window");

// --- PALETA "MÁS ANDALUZA QUE EL PESCAÍTO FRITO" ---
const COLOR_ALBERO = "#FDB913"; // Arena de la Real Maestranza
const COLOR_SANGRE_Y_ORO = "#E3001B"; // Rojo pasión flamenca
const COLOR_OLIVO = "#556B2F"; // Verde del campo andaluz
const COLOR_AZULEJO_SEVILLA = "#0055A4"; // Azul de la cerámica
const COLOR_CAL_BLANCA = "#FFFEF9"; // Blanco de las casas encaladas
const COLOR_HIERRO_FORJAO = "#1a1a1a"; // Negro de las rejas
const COLOR_ORO_VIRGEN = "#FFD700"; // Dorado de los pasos
const COLOR_GERANIO = "#DC143C"; // Rojo geranio de balcón

// --- Frases Típicas Andaluzas (Random) ---
const FRASES_ANDALUZAS = [
  "¡Arsa!",
  "¡Zeazabó!",
  "¡Quillo!",
  "¡Con tó er poderío!",
  "¡Vamo' allá!",
  "¡Qué arte!",
  "¡Olé los caracoleh!",
  "¡Miarma!",
  "¡Tó er día con er rebujito!",
];

// --- COMPONENTES CON MÁS ARTE QUE CAMARÓN ---

// Farolillo Sevillano que se menea como en la velá
const FarolilloSevillano = ({ color, delay, style }: { color: string, delay: number, style?: any }) => {
    const swingAnim = useRef(new Animated.Value(0)).current;
    const glowAnim = useRef(new Animated.Value(0.7)).current;

    useEffect(() => {
        // Meneo al viento de Triana
        Animated.loop(
            Animated.sequence([
                Animated.timing(swingAnim, { toValue: 1, duration: 1800, delay, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
                Animated.timing(swingAnim, { toValue: -1, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
                Animated.timing(swingAnim, { toValue: 0, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
            ])
        ).start();

        // Brillo palpitante
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
                Animated.timing(glowAnim, { toValue: 0.7, duration: 1000, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    const rotate = swingAnim.interpolate({ inputRange: [-1, 1], outputRange: ['-15deg', '15deg'] });

    return (
        <Animated.View style={[styles.farolilloContainer, style, { transform: [{ rotate }] }]}>
            <View style={styles.farolilloCable} />
            <Animated.View style={[styles.farolilloBody, { backgroundColor: color, opacity: glowAnim }]}>
                <View style={styles.farolilloPliegue} />
                <View style={styles.farolilloPliegue} />
                <View style={styles.farolilloPliegue} />
                {/* Borla abajo */}
                <View style={styles.borlaFarolillo} />
            </Animated.View>
        </Animated.View>
    );
};

// Lunares de traje de flamenca
const FondoDeLunaresConArte = () => (
    <View style={StyleSheet.absoluteFillObject}>
        <View style={{ flex: 1, backgroundColor: COLOR_SANGRE_Y_ORO }}>
            <View style={styles.lunaresPattern} />
            {/* Efecto de luz ambiente */}
            <View style={styles.ambientLight} />
        </View>
    </View>
);

// Guitarra flamenca decorativa
const GuitarraFlamenca = ({ style }: {style?: any}) => (
    <View style={[styles.guitarraContainer, style]}>
        <Text style={styles.guitarraIcon}>🎸</Text>
    </View>
);

// Clavel Andaluz flotante
const ClavelFlotante = () => {
    const floatAnim = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, { toValue: -10, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                Animated.timing(floatAnim, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View style={[styles.clavelFlotante, { transform: [{ translateY: floatAnim }] }]}>
            <Text style={{fontSize: 20}}>🌺</Text>
        </Animated.View>
    );
};

// --- Tarjeta estilo "Caseta de la Feria con tó er poderío" ---

const PersonCardComponent = ({ item, onPress, isSelected }: { item: Persona, onPress: () => void, isSelected: boolean }) => {
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  
  const handlePressIn = () => {
      Animated.spring(bounceAnim, { toValue: 0.92, useNativeDriver: true }).start();
      // Shake de taconeo cuando tocas
      Animated.sequence([
          Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
  };
  
  const handlePressOut = () => {
      Animated.spring(bounceAnim, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} style={{ marginHorizontal: 12, marginVertical: 8 }}>
      <Animated.View style={[
          styles.cardContainer, 
          isSelected && styles.cardSelected,
          { transform: [{ scale: bounceAnim }, { translateX: shakeAnim }] } 
      ]}>
        
        {/* Techo de caseta con rayas andaluzas */}
        <View style={styles.techoRayado}>
            <View style={[styles.rayas, {backgroundColor: COLOR_ALBERO}]} />
            <View style={[styles.rayas, {backgroundColor: COLOR_CAL_BLANCA}]} />
            <View style={[styles.rayas, {backgroundColor: COLOR_ALBERO}]} />
        </View>

        {/* Banderitas de colores */}
        <View style={styles.banderitasContainer}>
            <Text style={styles.banderita}>🚩</Text>
            <Text style={styles.banderita}>🚩</Text>
            <Text style={styles.banderita}>🚩</Text>
        </View>

        <View style={styles.cardContent}>
          {/* Avatar con marco de azulejo sevillano */}
          <View style={[styles.avatarContainer, isSelected && styles.avatarSelected]}>
             <View style={styles.marcoAzulejo}>
                {item.foto ? (
                    <Image source={{ uri: item.foto }} style={styles.avatarImage} />
                  ) : (
                    <Text style={styles.avatarText}>{item.nombre.charAt(0)}</Text>
                  )}
             </View>
             {/* Clavel rojo en el moño */}
             <Text style={styles.clavelEnElPelo}>🌺</Text>
             {/* Peineta si está seleccionado */}
             {isSelected && <Text style={styles.peineta}>👑</Text>}
          </View>

          {/* Info con salero y duende */}
          <View style={styles.infoContainer}>
            <Text style={[styles.cardName, isSelected && styles.cardNameSelected]}>
               {item.nombre} {item.apellidos}
            </Text>
            
            <View style={styles.badgeRow}>
                 {/* Matrícula estilo carruaje */}
                <View style={styles.matriculaBadge}>
                    <Text style={styles.matriculaText}>🐎 Nº {item.id}</Text>
                </View>
                
                {/* Medalla de la Virgen */}
                <View style={styles.medallaBadge}>
                    <Text style={styles.medallaIcon}>✨</Text>
                </View>
            </View>

            {/* Frase andaluza si está seleccionado */}
            {isSelected && (
                <View style={styles.fraseContainer}>
                    <Text style={styles.fraseText}>
                        {FRASES_ANDALUZAS[item.id % FRASES_ANDALUZAS.length]}
                    </Text>
                </View>
            )}
          </View>

          {/* Icono animado a la derecha */}
          <View style={styles.rightIcon}>
              <Text style={{fontSize: 32}}>{isSelected ? '💃' : '🕺'}</Text>
              {isSelected && <Text style={{fontSize: 16, marginTop: -5}}>🎵</Text>}
          </View>
        </View>
        
        {/* Flecos del mantón de Manila cuando está seleccionado */}
        {isSelected && (
            <View style={styles.mantonContainer}>
                {Array.from({length: 20}).map((_,i) => (
                    <View key={i} style={[styles.flecoManton, { 
                        height: 12 + (i % 3) * 4,
                        backgroundColor: i % 2 === 0 ? COLOR_SANGRE_Y_ORO : COLOR_ORO_VIRGEN 
                    }]} />
                ))}
            </View>
        )}

        {/* Borde de herrería */}
        <View style={styles.bordeHerrero} />

      </Animated.View>
    </Pressable>
  );
};

const PersonCard = React.memo(PersonCardComponent, (prev, next) => 
  prev.item.id === next.item.id && prev.isSelected === next.isSelected
);

// --- COMPONENTE PRINCIPAL CON TÓ EL ARTE ---

const PeopleListView = observer(() => {
  const vmRef = useRef<PeopleListVM | null>(null);
  if (vmRef.current === null) {
    vmRef.current = container.get<PeopleListVM>(TYPES.IndexVM);
  }
  const viewModel = vmRef.current;

  // Animación del panel de azulejo
  const detailSlide = useRef(new Animated.Value(-200)).current;
  const detailOpacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (viewModel.personaSeleccionada) {
        Animated.parallel([
            Animated.spring(detailSlide, { toValue: 0, friction: 8, useNativeDriver: true }),
            Animated.timing(detailOpacity, { toValue: 1, duration: 300, useNativeDriver: true })
        ]).start();
    } else {
        Animated.parallel([
            Animated.timing(detailSlide, { toValue: -200, duration: 250, useNativeDriver: true }),
            Animated.timing(detailOpacity, { toValue: 0, duration: 250, useNativeDriver: true })
        ]).start();
    }
  }, [viewModel.personaSeleccionada]);

  const renderItem = ({ item }: { item: Persona }) => (
    <PersonCard 
      item={item} 
      onPress={() => { viewModel.personaSeleccionada = item; }} 
      isSelected={viewModel.personaSeleccionada?.id === item.id} 
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FondoDeLunaresConArte />
      
      {/* Claveles flotantes decorativos */}
      <ClavelFlotante />
      
      {/* Cuerda de farolillos sevillanos */}
      <View style={styles.cuerdaFarolillos}>
          <FarolilloSevillano color={COLOR_OLIVO} delay={0} style={{left: '5%'}} />
          <FarolilloSevillano color={COLOR_CAL_BLANCA} delay={300} style={{left: '20%'}} />
          <FarolilloSevillano color={COLOR_ALBERO} delay={600} style={{left: '35%'}} />
          <FarolilloSevillano color={COLOR_SANGRE_Y_ORO} delay={200} style={{left: '50%'}} />
          <FarolilloSevillano color={COLOR_AZULEJO_SEVILLA} delay={500} style={{left: '65%'}} />
          <FarolilloSevillano color={COLOR_OLIVO} delay={400} style={{left: '80%'}} />
          <FarolilloSevillano color={COLOR_CAL_BLANCA} delay={100} style={{left: '95%'}} />
      </View>

      {/* Guitarra decorativa */}
      <GuitarraFlamenca style={{position: 'absolute', top: 80, right: 10, zIndex: 5}} />

      <View style={styles.content}>
        {/* --- PORTADA DE LA FERIA --- */}
        <View style={styles.header}>
            <View style={styles.portadaContainer}>
                {/* Arco de entrada */}
                <View style={styles.arcoFeria}>
                    <View style={styles.columnaIzq} />
                    <View style={styles.arcoCentral}>
                        <Text style={styles.headerTitle}>¡LA CUADRILLA!</Text>
                        <Text style={styles.headerSubtitle}>Con Más Arte que un Lavapiés</Text>
                        <View style={styles.estrellaDecor}>
                            <Text style={{fontSize: 16}}>⭐</Text>
                        </View>
                    </View>
                    <View style={styles.columnaDer} />
                </View>
                
                {/* Contador con marco dorado */}
                <View style={styles.contadorContainer}>
                    <Text style={styles.contadorLabel}>Gente Registrá</Text>
                    <View style={styles.contadorBadge}>
                        <Text style={styles.contadorNumero}>{viewModel.personasList.length}</Text>
                        <Text style={styles.contadorText}>PERSONEJES</Text>
                    </View>
                </View>
            </View>
        </View>

        {/* --- PANEL DE AZULEJO ANDALUZ (Persona Seleccionada) --- */}
        {viewModel.personaSeleccionada && (
            <Animated.View style={[
                styles.azulejoPanel,
                { 
                    opacity: detailOpacity,
                    transform: [{ translateY: detailSlide }]
                }
            ]}>
                {/* Marco de azulejo con patrón geométrico */}
                <View style={styles.azulejoMarco}>
                    {/* Esquinas decorativas */}
                    <View style={[styles.esquinaAzulejo, styles.esquinaSuperiorIzq]} />
                    <View style={[styles.esquinaAzulejo, styles.esquinaSuperiorDer]} />
                    <View style={[styles.esquinaAzulejo, styles.esquinaInferiorIzq]} />
                    <View style={[styles.esquinaAzulejo, styles.esquinaInferiorDer]} />
                    
                    <View style={styles.azulejoInterior}>
                        <View style={styles.azulejoHeader}>
                            <Text style={styles.azulejoTitulo}>¡OLÉ TÚ!</Text>
                            <Text style={styles.azulejoEmoji}>💫</Text>
                        </View>
                        
                        <View style={styles.azulejoDivisor} />
                        
                        <View style={styles.azulejoInfo}>
                            <View>
                                <Text style={styles.azulejoNombre}>
                                    {viewModel.personaSeleccionada.nombre}
                                </Text>
                                <Text style={styles.azulejoApellido}>
                                    {viewModel.personaSeleccionada.apellidos}
                                </Text>
                            </View>
                            
                            <View style={styles.azulejoStatsContainer}>
                                <Text style={styles.platoDeco}>🥘</Text>
                                <View style={styles.idAzulejo}>
                                    <Text style={styles.idAzulejoLabel}>Carnet</Text>
                                    <Text style={styles.idAzulejoNumero}>#{viewModel.personaSeleccionada.id}</Text>
                                </View>
                            </View>
                        </View>
                        
                        {/* Mini guitarra */}
                        <Text style={styles.guitarraMini}>🎸</Text>
                    </View>
                </View>
            </Animated.View>
        )}

        {/* --- LA LISTA DE LA BUENA GENTE --- */}
        <FlatList
          data={viewModel.personasList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
              <View style={styles.emptyContainer}>
                  <View style={styles.emptyCard}>
                      <Text style={{fontSize: 60, marginBottom: 10}}>😴</Text>
                      <Text style={styles.emptyTitle}>¡ESTÁN DE SIEEEESTA!</Text>
                      <Text style={styles.emptySubtitle}>
                        Se han ido pal cortijo...
                      </Text>
                      <Text style={styles.emptySubtitle}>
                        Vuelven después der cafelito y la tostá
                      </Text>
                      <Text style={{fontSize: 25, marginTop: 15}}>☕ 🍞</Text>
                  </View>
              </View>
          }
        />
      </View>
    </SafeAreaView>
  );
});

// --- ESTILOS CON MÁS DUENDE QUE LOLA FLORES ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_SANGRE_Y_ORO,
  },
  content: {
    flex: 1,
    zIndex: 10,
    paddingTop: 5,
  },
  
  // --- Fondo con Lunares ---
  lunaresPattern: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'transparent',
      backgroundImage: Platform.OS === 'web' ? `radial-gradient(circle, ${COLOR_CAL_BLANCA} 20%, transparent 20%)` : undefined,
      backgroundSize: '50px 50px',
      opacity: 0.25,
  },
  ambientLight: {
      ...StyleSheet.absoluteFillObject,
  },

  // --- Farolillos Sevillanos ---
  cuerdaFarolillos: {
      position: 'absolute',
      top: 0, left: 0, right: 0,
      height: 70,
      zIndex: 25,
      overflow: 'visible',
  },
  farolilloContainer: {
      position: 'absolute',
      top: -5,
      alignItems: 'center',
  },
  farolilloCable: {
      width: 2.5, 
      height: 25, 
      backgroundColor: COLOR_HIERRO_FORJAO,
  },
  farolilloBody: {
      width: 30, 
      height: 38, 
      borderRadius: 15,
      borderWidth: 2, 
      borderColor: 'rgba(0,0,0,0.2)',
      justifyContent: 'space-around',
      paddingVertical: 4,
      shadowColor: '#000', 
      shadowOffset: {width: 3, height: 4}, 
      shadowOpacity: 0.4, 
      elevation: 6,
  },
  farolilloPliegue: {
      width: '90%', 
      height: 1, 
      backgroundColor: 'rgba(0,0,0,0.15)',
      alignSelf: 'center',
  },
  borlaFarolillo: {
      width: 8,
      height: 8,
      backgroundColor: COLOR_ORO_VIRGEN,
      borderRadius: 4,
      alignSelf: 'center',
      marginTop: 2,
  },

  // --- Elementos flotantes ---
  clavelFlotante: {
      position: 'absolute',
      top: 100,
      left: 30,
      zIndex: 5,
  },
  guitarraContainer: {
      opacity: 0.3,
  },
  guitarraIcon: {
      fontSize: 30,
      transform: [{rotate: '25deg'}],
  },

  // --- HEADER (Portada Feria) ---
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  portadaContainer: {
      width: '100%',
      alignItems: 'center',
  },
  arcoFeria: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: '95%',
  },
  columnaIzq: {
      width: 20,
      height: 80,
      backgroundColor: COLOR_ALBERO,
      borderWidth: 2,
      borderColor: COLOR_HIERRO_FORJAO,
      borderRadius: 4,
  },
  columnaDer: {
      width: 20,
      height: 80,
      backgroundColor: COLOR_ALBERO,
      borderWidth: 2,
      borderColor: COLOR_HIERRO_FORJAO,
      borderRadius: 4,
  },
  arcoCentral: {
      flex: 1,
      backgroundColor: COLOR_ALBERO,
      marginHorizontal: -2,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderTopLeftRadius: 60,
      borderTopRightRadius: 60,
      borderWidth: 3,
      borderColor: COLOR_HIERRO_FORJAO,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.5,
      elevation: 10,
      position: 'relative',
  },
  estrellaDecor: {
      position: 'absolute',
      top: 5,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLOR_HIERRO_FORJAO,
    fontFamily: Platform.OS === 'ios' ? 'Palatino-Bold' : 'serif',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(255,255,255,0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  headerSubtitle: {
      color: '#6d4c41',
      fontSize: 13,
      fontStyle: 'italic',
      fontWeight: '700',
      marginTop: 2,
  },
  contadorContainer: {
      marginTop: 10,
      alignItems: 'center',
  },
  contadorLabel: {
      fontSize: 10,
      color: COLOR_CAL_BLANCA,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 1,
  },
  contadorBadge: {
      backgroundColor: COLOR_OLIVO,
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 3,
      borderColor: COLOR_ORO_VIRGEN,
      marginTop: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.4,
      elevation: 6,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  contadorNumero: {
      fontSize: 24,
      fontWeight: '900',
      color: COLOR_ORO_VIRGEN,
  },
  contadorText: {
      fontSize: 11,
      fontWeight: 'bold',
      color: COLOR_CAL_BLANCA,
  },

  // --- PANEL AZULEJO (Detalle Seleccionado) ---
  azulejoPanel: {
      marginHorizontal: 15,
      marginBottom: 15,
      marginTop: 5,
  },
  azulejoMarco: {
      backgroundColor: COLOR_CAL_BLANCA,
      borderRadius: 3,
      borderWidth: 5,
      borderColor: COLOR_AZULEJO_SEVILLA,
      padding: 8,
      position: 'relative',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.4,
      elevation: 8,
  },
  esquinaAzulejo: {
      position: 'absolute',
      width: 16,
      height: 16,
      borderColor: COLOR_ALBERO,
      borderWidth: 3,
  },
  esquinaSuperiorIzq: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  esquinaSuperiorDer: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  esquinaInferiorIzq: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  esquinaInferiorDer: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  azulejoInterior: {
      backgroundColor: '#E8F4F8',
      borderRadius: 2,
      padding: 12,
      borderWidth: 2,
      borderColor: COLOR_AZULEJO_SEVILLA,
      position: 'relative',
  },
  azulejoHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
  },
  azulejoTitulo: {
      fontSize: 14,
      fontWeight: '900',
      color: COLOR_SANGRE_Y_ORO,
      letterSpacing: 1,
  },
  azulejoEmoji: {
      fontSize: 20,
  },
  azulejoDivisor: {
      height: 2,
      backgroundColor: COLOR_ALBERO,
      marginVertical: 8,
  },
  azulejoInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  azulejoNombre: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLOR_HIERRO_FORJAO,
      fontFamily: Platform.OS === 'ios' ? 'Palatino-Bold' : 'serif',
  },
  azulejoApellido: {
      fontSize: 14,
      color: '#555',
      fontStyle: 'italic',
      marginTop: 2,
  },
  azulejoStatsContainer: {
      alignItems: 'center',
  },
  platoDeco: {
      fontSize: 24,
      marginBottom: 4,
  },
  idAzulejo: {
      backgroundColor: COLOR_OLIVO,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: COLOR_ORO_VIRGEN,
      alignItems: 'center',
  },
  idAzulejoLabel: {
      fontSize: 8,
      color: COLOR_CAL_BLANCA,
      fontWeight: '600',
  },
  idAzulejoNumero: {
      fontSize: 16,
      fontWeight: '900',
      color: COLOR_ORO_VIRGEN,
  },
  guitarraMini: {
      position: 'absolute',
      bottom: 5,
      right: 5,
      fontSize: 14,
    opacity: 0.6,
    transform: [{ rotate: '-15deg' }],
  },

  // --- TARJETA PERSONA (La Caseta) ---
  cardContainer: {
    backgroundColor: COLOR_CAL_BLANCA,
    borderRadius: 8,
    marginVertical: 6,
    overflow: 'hidden', // Para que el techo no se salga
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  cardSelected: {
    borderColor: COLOR_ORO_VIRGEN,
    borderWidth: 2,
    backgroundColor: '#FFFBE6', // Un tono crema muy suave
    transform: [{ scale: 1.02 }],
  },

  // Decoración techo caseta
  techoRayado: {
    height: 14,
    width: '100%',
    flexDirection: 'row',
  },
  rayas: {
    flex: 1,
  },
  banderitasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -8, // Para que solapen un poco con el techo
    zIndex: 10,
    paddingHorizontal: 10,
  },
  banderita: {
    fontSize: 10,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowRadius: 2,
  },

  // Contenido Tarjeta
  cardContent: {
    flexDirection: 'row',
    padding: 15,
    paddingTop: 8,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatarSelected: {
    transform: [{ scale: 1.1 }],
  },
  marcoAzulejo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: COLOR_AZULEJO_SEVILLA,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderStyle: 'dashed', // Simula pintura a mano
  },
  avatarImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLOR_AZULEJO_SEVILLA,
  },
  clavelEnElPelo: {
    position: 'absolute',
    top: -5,
    right: -5,
    fontSize: 18,
    zIndex: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  peineta: {
    position: 'absolute',
    top: -18,
    left: 20,
    fontSize: 22,
    zIndex: 4,
  },

  // Info Textos
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    fontFamily: Platform.OS === 'ios' ? 'Palatino' : 'serif',
  },
  cardNameSelected: {
    color: COLOR_SANGRE_Y_ORO,
    fontWeight: '900',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  matriculaBadge: {
    backgroundColor: '#333',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#999',
  },
  matriculaText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  medallaBadge: {
    backgroundColor: COLOR_ORO_VIRGEN,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  medallaIcon: {
    fontSize: 10,
  },
  fraseContainer: {
    marginTop: 8,
    backgroundColor: 'rgba(253, 185, 19, 0.2)', // Albero clarito
    padding: 6,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: COLOR_ALBERO,
  },
  fraseText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#554',
  },
  rightIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },

  // Mantón de Manila (Flecos)
  mantonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: -5,
    zIndex: -1, // Por debajo del borde
  },
  flecoManton: {
    width: 3,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  bordeHerrero: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: COLOR_HIERRO_FORJAO,
    borderTopWidth: 1,
    borderTopColor: '#555',
  },

  // --- LISTA GENERAL ---
  listContent: {
    paddingBottom: 100, // Espacio para que no corte el último elemento
    paddingTop: 10,
  },

  // --- ESTADO VACÍO (SIESTA) ---
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLOR_OLIVO,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    elevation: 10,
    width: '80%',
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLOR_SANGRE_Y_ORO,
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: Platform.OS === 'ios' ? 'Palatino' : 'serif',
  },
});

export default PeopleListView;