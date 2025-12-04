import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function TemporizadorCuentaAtras() {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  const toggleStartPause = () => {
    setIsRunning(prev => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(60);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{secondsLeft}s</Text>

      <TouchableOpacity style={styles.button} onPress={toggleStartPause}>
        <Text style={styles.buttonText}>
          {isRunning ? "Pause" : "Start"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetTimer}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 15,
    marginTop: 40
  },
  timeText: {
    fontSize: 48,
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#4a90e2",
    padding: 12,
    borderRadius: 10,
    width: 120,
    alignItems: "center"
  },
  resetButton: {
    backgroundColor: "#e24a4a",
  },
  buttonText: {
    color: "white",
    fontSize: 18
  }
});
