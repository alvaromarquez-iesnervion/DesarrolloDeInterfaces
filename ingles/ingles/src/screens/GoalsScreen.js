import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GoalItem from '../components/GoalItem';
import { mockGoals } from '../data/mockData';
import colors from '../styles/colors';

export default function GoalsScreen() {
  const [goals, setGoals] = useState(mockGoals);
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [hasDeadline, setHasDeadline] = useState(false);
  const [deadline, setDeadline] = useState(new Date());

  const openNewGoal = () => {
    setDescription('');
    setHasDeadline(false);
    setDeadline(new Date());
    setModalVisible(true);
  };

  const saveGoal = () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a goal description');
      return;
    }

    const newGoal = {
      id: Date.now().toString(),
      description,
      completed: false,
      deadline: hasDeadline ? deadline : null,
      createdAt: new Date()
    };

    setGoals([newGoal, ...goals]);
    setModalVisible(false);
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const deleteGoal = (id) => {
    Alert.alert(
      'Delete Goal',
      'Are you sure you want to delete this goal?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          setGoals(goals.filter(g => g.id !== id));
        }}
      ]
    );
  };

  const completedGoals = goals.filter(g => g.completed).length;
  const totalGoals = goals.length;
  const completionRate = totalGoals > 0 ? (completedGoals / totalGoals * 100).toFixed(0) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Study Goals</Text>
        <TouchableOpacity style={styles.addButton} onPress={openNewGoal}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{completionRate}%</Text>
          <Text style={styles.statLabel}>Completion Rate</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{completedGoals}/{totalGoals}</Text>
          <Text style={styles.statLabel}>Goals Completed</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Goals</Text>
        <Text style={styles.sectionCount}>{goals.filter(g => !g.completed).length}</Text>
      </View>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GoalItem 
            goal={item}
            onToggle={toggleGoal}
            onDelete={deleteGoal}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="flag-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyText}>No goals yet</Text>
            <Text style={styles.emptySubtext}>Set your first study goal to get started</Text>
          </View>
        }
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Goal</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContent}>
              <Text style={styles.label}>Goal Description</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Complete Chapter 5 by Friday"
                value={description}
                onChangeText={setDescription}
                multiline
              />

              <View style={styles.deadlineToggle}>
                <Text style={styles.label}>Set Deadline</Text>
                <TouchableOpacity onPress={() => setHasDeadline(!hasDeadline)}>
                  <Ionicons 
                    name={hasDeadline ? "toggle" : "toggle-outline"} 
                    size={32} 
                    color={hasDeadline ? colors.primary : colors.textSecondary} 
                  />
                </TouchableOpacity>
              </View>

              {hasDeadline && (
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>
                    {deadline.toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </Text>
                </View>
              )}

              <TouchableOpacity style={styles.saveButton} onPress={saveGoal}>
                <Text style={styles.saveButtonText}>Create Goal</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  statsCard: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
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
    backgroundColor: colors.border,
    marginHorizontal: 20,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  modalContent: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
    minHeight: 80,
  },
  deadlineToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateContainer: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});