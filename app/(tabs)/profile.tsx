import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>

        {/* ── Profile Header ── */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>🧑‍💻</Text>
          </View>
          <Text style={styles.userName}>Gabe</Text>
          <View style={styles.silverBadge}>
            <Text style={styles.silverText}>🥈 Silver League</Text>
          </View>
        </View>

        {/* ── Season Stats Row ── */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>📊</Text>
            <Text style={[styles.statNum, { color: '#38bdf8' }]}>363</Text>
            <Text style={styles.statLbl}>AVG SCORE</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={[styles.statNum, { color: '#fb923c' }]}>2</Text>
            <Text style={styles.statLbl}>WIN STREAK</Text>
            <Text style={styles.statSub}>Best: 5</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🏆</Text>
            <Text style={[styles.statNum, { color: '#4ade80' }]}>43%</Text>
            <Text style={styles.statLbl}>WIN RATE</Text>
            <Text style={styles.statSub}>3/7 seasons</Text>
          </View>
        </View>

        {/* ── Season Summary ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Season 7 Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryVal}>1420</Text>
              <Text style={styles.summaryLbl}>Total Pts</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryVal}>#2</Text>
              <Text style={styles.summaryLbl}>Rank</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryVal, { color: '#4ade80' }]}>+90</Text>
              <Text style={styles.summaryLbl}>Today</Text>
            </View>
          </View>
        </View>

        {/* ── Achievements ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Achievements</Text>
          <View style={styles.achievementRow}>
            <View style={styles.achievement}>
              <Text style={styles.achieveEmoji}>🏅</Text>
              <Text style={styles.achieveLabel}>Top 3</Text>
            </View>
            <View style={styles.achievement}>
              <Text style={styles.achieveEmoji}>🔥</Text>
              <Text style={styles.achieveLabel}>On Fire</Text>
            </View>
            <View style={styles.achievement}>
              <Text style={styles.achieveEmoji}>📚</Text>
              <Text style={styles.achieveLabel}>Bookworm</Text>
            </View>
            <View style={styles.achievement}>
              <Text style={styles.achieveEmoji}>🧘</Text>
              <Text style={styles.achieveLabel}>Zen Mode</Text>
            </View>
          </View>
        </View>

        {/* ── League History ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>League History</Text>
          {[
            { season: 'Season 6', result: '🥇 1st Place', color: '#facc15' },
            { season: 'Season 5', result: '🥈 2nd Place', color: '#d1d5db' },
            { season: 'Season 4', result: '🥉 3rd Place', color: '#fb923c' },
            { season: 'Season 3', result: '4th Place',    color: '#9ca3af' },
          ].map((item) => (
            <View key={item.season} style={styles.historyRow}>
              <Text style={styles.historySeason}>{item.season}</Text>
              <Text style={[styles.historyResult, { color: item.color }]}>{item.result}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#111827' },
  scroll: { flex: 1 },
  container: { paddingBottom: 30 },

  // Profile Header
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#374151',
    borderWidth: 3,
    borderColor: '#4f8ef7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarEmoji: { fontSize: 38 },
  userName: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 6,
  },
  silverBadge: {
    backgroundColor: '#374151',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  silverText: { color: '#d1d5db', fontSize: 13, fontWeight: '700' },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1f2937',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
  },
  statEmoji: { fontSize: 22, marginBottom: 4 },
  statNum: { fontSize: 22, fontWeight: '900', color: '#fff' },
  statLbl: { color: '#9ca3af', fontSize: 9, fontWeight: '700', letterSpacing: 0.5, marginTop: 2 },
  statSub: { color: '#6b7280', fontSize: 10, marginTop: 1 },

  // Card
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: '900', color: '#fff', marginBottom: 14 },

  // Season Summary
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  summaryItem: { alignItems: 'center', flex: 1 },
  summaryVal: { fontSize: 24, fontWeight: '900', color: '#fff' },
  summaryLbl: { color: '#9ca3af', fontSize: 11, fontWeight: '600', marginTop: 3 },
  summaryDivider: { width: 1, height: 40, backgroundColor: '#374151' },

  // Achievements
  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  achievement: { alignItems: 'center', gap: 6 },
  achieveEmoji: { fontSize: 32 },
  achieveLabel: { color: '#9ca3af', fontSize: 11, fontWeight: '600' },

  // League History
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  historySeason: { color: '#d1d5db', fontSize: 15, fontWeight: '600' },
  historyResult: { fontSize: 15, fontWeight: '700' },
});