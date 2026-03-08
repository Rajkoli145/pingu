import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { getAssignments } from '../../services/assignments';
import { Assignment } from '../../types/models';

export default function AssignmentsScreen() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getAssignments();
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const renderAssignmentCard = ({ item }: { item: Assignment }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Subject: </Text>
        <Text style={styles.value}>{item.subject}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Due: </Text>
        <Text style={styles.value}>{item.dueDate}</Text>
      </View>
      <View style={styles.statusRow}>
        <Text style={styles.label}>Status: </Text>
        <Text style={[
          styles.statusText, 
          { color: item.status === 'submitted' ? '#34C759' : '#FF3B30' }
        ]}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={assignments}
        keyExtractor={(item) => item.id}
        renderItem={renderAssignmentCard}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !loading ? <Text style={styles.emptyText}>No assignments found.</Text> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1C1C1E',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#3A3A3C',
    fontWeight: '400',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#8E8E93',
  },
});
