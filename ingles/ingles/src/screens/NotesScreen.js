import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NoteCard from '../components/NoteCard';
import { mockNotes, availableTags } from '../data/mockData';
import colors from '../styles/colors';

export default function NotesScreen() {
  const [notes, setNotes] = useState(mockNotes);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const openNewNote = () => {
    setEditingNote(null);
    setTitle('');
    setContent('');
    setSelectedTags([]);
    setModalVisible(true);
  };

  const openEditNote = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setSelectedTags(note.tags);
    setModalVisible(true);
  };

  const saveNote = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    if (editingNote) {
      setNotes(notes.map(n => 
        n.id === editingNote.id 
          ? { ...n, title, content, tags: selectedTags, updatedAt: new Date() }
          : n
      ));
    } else {
      const newNote = {
        id: Date.now().toString(),
        title,
        content,
        tags: selectedTags,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setNotes([newNote, ...notes]);
    }
    
    setModalVisible(false);
  };

  const deleteNote = (id) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          setNotes(notes.filter(n => n.id !== id));
        }}
      ]
    );
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Notes</Text>
        <TouchableOpacity style={styles.addButton} onPress={openNewNote}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard 
            note={item} 
            onPress={openEditNote}
            onDelete={deleteNote}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyText}>No notes yet</Text>
            <Text style={styles.emptySubtext}>Tap the + button to create your first note</Text>
          </View>
        }
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {editingNote ? 'Edit Note' : 'New Note'}
            </Text>
            <TouchableOpacity onPress={saveNote}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter note title"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.label}>Content</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Write your notes here..."
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
            />

            <Text style={styles.label}>Tags</Text>
            <View style={styles.tagsContainer}>
              {availableTags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={[
                    styles.tagChip,
                    selectedTags.includes(tag) && styles.tagChipSelected
                  ]}
                  onPress={() => toggleTag(tag)}
                >
                  <Text style={[
                    styles.tagChipText,
                    selectedTags.includes(tag) && styles.tagChipTextSelected
                  ]}>
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: colors.cardBackground,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
  },
  textArea: {
    height: 200,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tagChip: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tagChipText: {
    fontSize: 14,
    color: colors.text,
  },
  tagChipTextSelected: {
    color: 'white',
  },
});