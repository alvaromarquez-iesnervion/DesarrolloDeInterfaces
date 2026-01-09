import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PomodoroTimer from '../components/PomodoroTimer';
import colors from '../styles/colors';

export default function TimerScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pomodoro Timer</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <PomodoroTimer />

        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Pomodoro Tips</Text>
          <View style={styles.tip}>
            <Text style={styles.tipNumber}>1</Text>
            <Text style={styles.tipText}>
              Work for 25 minutes without interruptions
            </Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipNumber}>2</Text>
            <Text style={styles.tipText}>
              Take a 5-minute break after each session
            </Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipNumber}>3</Text>
            <Text style={styles.tipText}>
              After 4 sessions, take a longer 15-30 minute break
            </Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipNumber}>4</Text>
            <Text style={styles.tipText}>
              Use breaks to rest your eyes and move around
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: colors.cardBackground,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    padding: 20,
  },
  tipsCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary + '20',
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 28,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});