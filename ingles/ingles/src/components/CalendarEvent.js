import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';

export default function CalendarEvent({ event, onPress, onDelete }) {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getColorForSubject = (colorName) => {
    return colors[colorName] || colors.other;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(event)}>
      <View style={[styles.colorBar, { backgroundColor: getColorForSubject(event.color) }]} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{event.title}</Text>
          {event.reminder && (
            <Ionicons name="notifications" size={16} color={colors.warning} />
          )}
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.detailText}>{formatDate(event.date)}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.detailText}>{event.time}</Text>
          </View>
        </View>
        
        <View style={[styles.subjectTag, { backgroundColor: getColorForSubject(event.color) + '20' }]}>
          <Text style={[styles.subjectText, { color: getColorForSubject(event.color) }]}>
            {event.subject}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity onPress={() => onDelete(event.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={20} color={colors.danger} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  colorBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  details: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  subjectTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  subjectText: {
    fontSize: 12,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 16,
    justifyContent: 'center',
  },
});