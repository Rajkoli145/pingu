import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { getAttendance } from '../../services/attendance';
import { Attendance } from '../../types/models';

export default function AttendanceScreen() {
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await getAttendance();
        setAttendanceData(data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const calculatePercentage = (attended: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((attended / total) * 100);
  };

  const renderAttendanceCard = ({ item }: { item: Attendance }) => {
    const percentage = calculatePercentage(item.attended, item.total);
    
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.subject}</Text>
        <View style={styles.detailRow}>
          <View style={styles.statsContainer}>
            <Text style={styles.label}>Attended: </Text>
            <Text style={styles.value}>{item.attended}</Text>
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.label}>Total: </Text>
            <Text style={styles.value}>{item.total}</Text>
          </View>
        </View>
        <View style={styles.percentageRow}>
          <Text style={styles.label}>Attendance: </Text>
          <Text style={[
            styles.percentageText,
            { color: percentage >= 75 ? '#34C759' : '#FF3B30' }
          ]}>
            {percentage}%
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={attendanceData}
        keyExtractor={(item) => item.id}
        renderItem={renderAttendanceCard}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !loading ? <Text style={styles.emptyText}>No attendance records found.</Text> : null
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
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
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
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  percentageRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    paddingTop: 8,
  },
  label: {
    fontSize: 14,
    color: '#8E8E93',
  },
  value: {
    fontSize: 14,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  percentageText: {
    fontSize: 20,
    fontWeight: '700',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#8E8E93',
  },
});
