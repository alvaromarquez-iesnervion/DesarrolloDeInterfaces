import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';

export default function NoteCard({ note, onPress, onDelete }) {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(note)}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{note.title}</Text>
        <TouchableOpacity onPress={() => onDelete(note.id)}>
          <Ionicons name="trash-outline" size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.content} numberOfLines={2}>{note.content}</Text>
      
      <View style={styles.footer}>
        <View style={styles.tags}>
          {note.tags.slice(0, 2).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
          {note.tags.length > 2 && (
            <Text style={styles.moreText}>+{note.tags.length - 2}</Text>
          )}
        </View>
        <Text style={styles.date}>{formatDate(note.updatedAt)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  content: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tag: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
  },
  tagText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  moreText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});