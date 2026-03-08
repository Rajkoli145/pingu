import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { Text, View } from '@/components/Themed';

export default function DashboardScreen() {
  const router = useRouter();

  const cards = [
    { title: "Today's Lectures", icon: 'book.fill', route: '/lectures', color: '#007AFF' },
    { title: 'Assignments', icon: 'doc.plaintext.fill', route: '/assignments', color: '#5856D6' },
    { title: 'Notices', icon: 'bell.fill', route: '/notices', color: '#FF9500' },
    { title: 'Events', icon: 'calendar', route: '/events', color: '#FF2D55' },
    { title: 'Attendance', icon: 'chart.bar.fill', route: '/attendance', color: '#34C759' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back, Student!</Text>
        <Text style={styles.subtitle}>Here is your academic overview.</Text>
      </View>

      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { borderLeftColor: card.color }]}
            onPress={() => router.push(card.route)}>
            <SymbolView name={card.icon} size={32} tintColor={card.color} />
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
    marginBottom: 30,
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

