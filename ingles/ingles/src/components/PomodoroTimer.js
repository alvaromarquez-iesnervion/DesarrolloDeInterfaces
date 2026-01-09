import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            handleTimerComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, minutes, seconds]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    if (!isBreak) {
      setSessionsCompleted(sessionsCompleted + 1);
      setIsBreak(true);
      setMinutes(5);
      setSeconds(0);
    } else {
      setIsBreak(false);
      setMinutes(25);
      setSeconds(0);
    }
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const formatTime = (mins, secs) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak 
    ? ((5 * 60 - (minutes * 60 + seconds)) / (5 * 60)) * 100
    : ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.timerCard}>
        <Text style={styles.modeText}>{isBreak ? 'Break Time' : 'Focus Time'}</Text>
        
        <View style={styles.circleContainer}>
          <View style={[styles.progressCircle, { 
            borderColor: isBreak ? colors.success : colors.primary,
            borderWidth: 8,
          }]} />
          <Text style={styles.timerText}>{formatTime(minutes, seconds)}</Text>
        </View>

        <View style={styles.controls}>
          {!isRunning ? (
            <TouchableOpacity style={styles.playButton} onPress={startTimer}>
              <Ionicons name="play" size={32} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.pauseButton} onPress={pauseTimer}>
              <Ionicons name="pause" size={32} color="white" />
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.resetButton} onPress={resetTimer}>
            <Ionicons name="refresh" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{sessionsCompleted}</Text>
            <Text style={styles.statLabel}>Sessions Today</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{sessionsCompleted * 25}</Text>
            <Text style={styles.statLabel}>Minutes Studied</Text>
          </View>
        </View>
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>Quick Settings</Text>
        <View style={styles.presets}>
          <TouchableOpacity 
            style={styles.presetButton}
            onPress={() => {
              setIsRunning(false);
              setIsBreak(false);
              setMinutes(15);
              setSeconds(0);
            }}
          >
            <Text style={styles.presetText}>15 min</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.presetButton, styles.presetActive]}
            onPress={() => {
              setIsRunning(false);
              setIsBreak(false);
              setMinutes(25);
              setSeconds(0);
            }}
          >
            <Text style={[styles.presetText, styles.presetTextActive]}>25 min</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.presetButton}
            onPress={() => {
              setIsRunning(false);
              setIsBreak(false);
              setMinutes(45);
              setSeconds(0);
            }}
          >
            <Text style={styles.presetText}>45 min</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timerCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modeText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 24,
  },
  circleContainer: {
    width: 240,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  progressCircle: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    borderColor: colors.primary,
  },
  timerText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.text,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  pauseButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.warning,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  resetButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stats: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  settingsCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  presets: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  presetButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.background,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  presetActive: {
    backgroundColor: colors.primary,
  },
  presetText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  presetTextActive: {
    color: 'white',
  },
});