import { StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import { getCommandCenterSummary } from '@/services/commandCenter';
import { getNotifications } from '@/services/notifications';

interface Summary {
  nextLecture?: { subject: string; time: string; room: string };
  attendanceHealth?: { overall: number; status: string; warning?: string };
  urgentAssignments?: any[];
}

export default function DashboardScreen() {
  const router = useRouter();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [summ, notes] = await Promise.all([
        getCommandCenterSummary(),
        getNotifications()
      ]);
      setSummary(summ);
      setNotifications(notes);
      setLoading(false);
    }
    fetchData();
  }, []);

  const cards = [
    { title: "Today's Lectures", icon: 'book.fill', route: '/lectures' as const, color: '#007AFF' },
    { title: 'Assignments', icon: 'doc.plaintext.fill', route: '/assignments' as const, color: '#5856D6' },
    { title: 'Notices', icon: 'bell.fill', route: '/notices' as const, color: '#FF9500' },
    { title: 'Events', icon: 'calendar', route: '/events' as const, color: '#FF2D55' },
    { title: 'Attendance', icon: 'chart.bar.fill', route: '/attendance' as const, color: '#34C759' },
  ];

  const unreadCount = notifications.filter(n => !n.readStatus).length;

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={{ backgroundColor: 'transparent' }}>
            <Text style={styles.greeting}>Command Center</Text>
            <Text style={styles.subtitle}>Intelligent Student Overview</Text>
          </View>
          {unreadCount > 0 && (
            <TouchableOpacity style={styles.notificationBadge} onPress={() => router.push('/notices')}>
              <SymbolView name={"bell.badge.fill" as any} size={24} tintColor="#FF3B30" />
              <View style={styles.badgeCount}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Intelligent Insights Section */}
      <View style={styles.insightSection}>
        {summary?.nextLecture && (
          <View style={styles.insightCard}>
            <View style={styles.insightIconWrap}>
              <SymbolView name={"clock.fill" as any} size={20} tintColor="#007AFF" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightLabel}>Next Lecture</Text>
              <Text style={styles.insightValue}>{summary.nextLecture.subject}</Text>
              <Text style={styles.insightSub}>{summary.nextLecture.time} • {summary.nextLecture.room}</Text>
            </View>
          </View>
        )}

        {summary?.attendanceHealth && (
          <View style={styles.insightCard}>
            <View style={styles.insightIconWrap}>
              <SymbolView name={"chart.bar.fill" as any} size={20} tintColor="#34C759" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightLabel}>Attendance Health</Text>
              <Text style={styles.insightValue}>{summary.attendanceHealth.overall}% • {summary.attendanceHealth.status}</Text>
              {summary.attendanceHealth.warning && (
                <Text style={[styles.insightSub, { color: '#FF3B30' }]}>{summary.attendanceHealth.warning}</Text>
              )}
            </View>
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>Main Hub</Text>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { borderLeftColor: card.color }]}
            onPress={() => router.push(card.route)}>
            <SymbolView name={card.icon as any} size={32} tintColor={card.color} />
            <Text style={styles.cardTitle}>{card.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  header: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.6,
    marginTop: 4,
  },
  notificationBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 10,
    borderRadius: 12,
  },
  badgeCount: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  insightSection: {
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  insightIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  insightContent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  insightLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.5,
    marginBottom: 4,
  },
  insightValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  insightSub: {
    fontSize: 13,
    opacity: 0.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  card: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
});

