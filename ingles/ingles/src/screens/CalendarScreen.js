import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CalendarEvent from '../components/CalendarEvent';
import { mockEvents } from '../data/mockData';
import colors from '../styles/colors';

const subjects = [
  { name: 'Biology', color: 'science' },
  { name: 'Math', color: 'math' },
  { name: 'History', color: 'history' },
  { name: 'Spanish', color: 'language' },
  { name: 'Arts', color: 'arts' },
  { name: 'Other', color: 'other' }
];

export default function CalendarScreen() {
  const [events, setEvents] = useState(mockEvents);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedColor, setSelectedColor] = useState('science');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('10:00');

  const openNewEvent = () => {
    setTitle('');
    setSubject('');
    setSelectedColor('science');
    setDate(new Date());
    setTime('10:00');
    setModalVisible(true);
  };

  const saveEvent = () => {
    if (!title.trim() || !subject.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      title,
      subject,
      date,
      time,
      color: selectedColor,
      reminder: true
    };

    setEvents([...events, newEvent].sort((a, b) => a.date - b.date));
    setModalVisible(false);
  };

  const deleteEvent = (id) => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          setEvents(events.filter(e => e.id !== id));
        }}
      ]
    );
  };

  const upcomingEvents = events.filter(e => e.date >= new Date());
  const pastEvents = events.filter(e => e.date < new Date());

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exam Calendar</Text>
        <TouchableOpacity style={styles.addButton} onPress={openNewEvent}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarCard}>
        <View style={styles.monthHeader}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Text>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <Text style={styles.sectionCount}>{upcomingEvents.length}</Text>
      </View>

      <FlatList
        data={upcomingEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CalendarEvent 
            event={item}
            onPress={() => {}}
            onDelete={deleteEvent}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyText}>No upcoming events</Text>
            <Text style={styles.emptySubtext}>Add your exams and deadlines</Text>
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
            <Text style={styles.modalTitle}>New Event</Text>
            <TouchableOpacity onPress={saveEvent}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.label}>Event Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Biology Midterm"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.label}>Subject</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Biology"
              value={subject}
              onChangeText={setSubject}
            />

            <Text style={styles.label}>Select Color</Text>
            <View style={styles.colorContainer}>
              {subjects.map((subj) => (
                <TouchableOpacity
                  key={subj.color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: colors[subj.color] },
                    selectedColor === subj.color && styles.colorOptionSelected
                  ]}
                  onPress={() => setSelectedColor(subj.color)}
                >
                  {selectedColor === subj.color && (
                    <Ionicons name="checkmark" size={20} color="white" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Date</Text>
            <View style={styles.dateTimeContainer}>
              <Ionicons name="calendar" size={20} color={colors.primary} />
              <Text style={styles.dateTimeText}>
                {date.toLocaleDateString('en-US', { 
                  weekday: 'short',
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric' 
                })}
              </Text>
            </View>

            <Text style={styles.label}>Time</Text>
            <View style={styles.dateTimeContainer}>
              <Ionicons name="time" size={20} color={colors.primary} />
              <TextInput
                style={styles.timeInput}
                placeholder="10:00"
                value={time}
                onChangeText={setTime}
              />
            </View>

            <View style={styles.reminderContainer}>
              <View>
                <Text style={styles.label}>Reminder</Text>
                <Text style={styles.reminderSubtext}>
                  Notify 1 day and 1 hour before
                </Text>
              </View>
              <Ionicons name="notifications" size={24} color={colors.primary} />
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
  calendarCard: {
    backgroundColor: colors.cardBackground,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  sectionCount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
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
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorOptionSelected: {
    borderWidth: 3,
    borderColor: colors.text,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  dateTimeText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  timeInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  reminderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  reminderSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
});