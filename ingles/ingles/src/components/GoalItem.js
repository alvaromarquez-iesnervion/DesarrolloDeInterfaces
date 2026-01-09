import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';

export default function GoalItem({ goal, onToggle, onDelete }) {
  const formatDeadline = (date) => {
    if (!date) return null;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.checkbox} 
        onPress={() => onToggle(goal.id)}
      >
        <Ionicons 
          name={goal.completed ? "checkmark-circle" : "ellipse-outline"} 
          size={24} 
          color={goal.completed ? colors.success : colors.textSecondary} 
        />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={[styles.description, goal.completed && styles.completedText]}>
          {goal.description}
        </Text>
        {goal.deadline && (
          <View style={styles.deadlineContainer}>
            <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.deadline}>{formatDeadline(goal.deadline)}</Text>
          </View>
        )}
      </View>
      
      <TouchableOpacity onPress={() => onDelete(goal.id)}>
        <Ionicons name="trash-outline" size={20} color={colors.danger} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkbox: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deadline: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
});