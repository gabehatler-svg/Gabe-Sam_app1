import { router } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const leaderboardData = [
  { rank: 1, name: 'Alex',       emoji: '🧢', pts: 520, medal: '🥇', pct: 1.0,  isYou: false },
  { rank: 2, name: 'Gabe (you)', emoji: '⭐', pts: 340, medal: '🥈', pct: 0.65, isYou: true  },
  { rank: 3, name: 'Jordan',     emoji: '🎸', pts: 290, medal: '🥈', pct: 0.56, isYou: false },
  { rank: 4, name: 'Sam',        emoji: '🎮', pts: 210, medal: '🥉', pct: 0.40, isYou: false },
  { rank: 5, name: 'Tyler',      emoji: '🏀', pts: 160, medal: '🥉', pct: 0.31, isYou: false },
];

const mostOpenedData = [
  { name: 'TikTok',      emoji: '🎵', opens: 14, pct: 1.0  },
  { name: 'Instagram',   emoji: '📸', opens: 9,  pct: 0.64 },
  { name: 'YouTube',     emoji: '▶️', opens: 6,  pct: 0.43 },
  { name: 'X (Twitter)', emoji: '✖️', opens: 4,  pct: 0.29 },
];

const mostUsedData = [
  { name: 'Kindle',     emoji: '📚', mins: 47, pct: 1.0  },
  { name: 'Meditation', emoji: '🧘', mins: 38, pct: 0.81 },
  { name: 'Bible App',  emoji: '📖', mins: 22, pct: 0.47 },
  { name: 'Duolingo',   emoji: '🦜', mins: 15, pct: 0.32 },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.titleGroup}>
            <TouchableOpacity style={styles.profileAvatar}>
              <Text style={styles.profileEmoji}>🧑‍💻</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.groupTitle}>The Boys</Text>
              <View style={styles.metaRow}>
                <View style={styles.seasonBadge}>
                  <Text style={styles.seasonText}>Season 7</Text>
                </View>
                <Text style={styles.timerText}>⏱ 3d left</Text>
              </View>
            </View>
          </View>
          <View style={styles.currencyGroup}>
            <View style={styles.currencyPill}>
              <Text style={styles.lightningText}>⚡ 340</Text>
            </View>
            <View style={styles.currencyPill}>
              <Text style={styles.gemText}>💎 12</Text>
            </View>
          </View>
        </View>

        {/* ── Stats Card ── */}
        <View style={styles.card}>
          <View style={styles.rankRow}>
            <View style={styles.rankInfo}>
              <View style={styles.rankIcon}>
                <Text style={{ fontSize: 24 }}>⭐</Text>
              </View>
              <View>
                <Text style={styles.rankLabel}>You · #2 in league</Text>
                <View style={styles.silverBadge}>
                  <Text style={styles.silverText}>🥈 Silver</Text>
                </View>
              </View>
            </View>
            <View style={styles.ptsToday}>
              <Text style={styles.ptsTodayNum}>340</Text>
              <Text style={styles.ptsTodayLabel}>pts today</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statCell}>
              <Text style={[styles.statVal, { color: '#4ade80' }]}>+90</Text>
              <Text style={styles.statLbl}>EARNED</Text>
            </View>
            <View style={[styles.statCell, styles.statCellBorder]}>
              <Text style={[styles.statVal, { color: '#f87171' }]}>-40</Text>
              <Text style={styles.statLbl}>LOST</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={[styles.statVal, { color: '#4ade80' }]}>1420</Text>
              <Text style={styles.statLbl}>SEASON</Text>
            </View>
          </View>
        </View>

        {/* ── My Leagues ── */}
        <TouchableOpacity
          style={styles.leaguesCard}
          onPress={() => router.push('/(tabs)/friends')}
          activeOpacity={0.8}
        >
          <View style={styles.leaguesLeft}>
            <View style={styles.leaguesIconWrap}>
              <Text style={{ fontSize: 26 }}>🏆</Text>
            </View>
            <View>
              <Text style={styles.leaguesTitle}>My Leagues</Text>
              <Text style={styles.leaguesSub}>The Boys · No Phone Zone</Text>
            </View>
          </View>
          <View style={styles.leaguesRight}>
            <Text style={styles.leaguesRank}>#2</Text>
            <Text style={styles.leaguesArrow}>›</Text>
          </View>
        </TouchableOpacity>

        {/* ── Leaderboard Card ── */}
        <View style={styles.card}>
          <View style={styles.lbHeader}>
            <Text style={styles.cardTitle}>Friends Leaderboard</Text>
            <View style={styles.tabGroup}>
              <TouchableOpacity style={[styles.tabBtn, styles.tabBtnActive]}>
                <Text style={styles.tabBtnActiveText}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabBtn}>
                <Text style={styles.tabBtnText}>Season</Text>
              </TouchableOpacity>
            </View>
          </View>
          {leaderboardData.map((item) => (
            <View
              key={item.rank}
              style={[
                styles.lbEntry,
                item.isYou && styles.lbEntryYou,
                item.rank === 1 && styles.lbEntryFirst,
              ]}
            >
              <View style={styles.rankNumBox}>
                {item.rank === 1
                  ? <Text style={{ fontSize: 20 }}>👑</Text>
                  : <Text style={styles.rankNum}>#{item.rank}</Text>
                }
              </View>
              <View style={styles.entryAvatar}>
                <Text style={{ fontSize: 20 }}>{item.emoji}</Text>
              </View>
              <View style={styles.entryInfo}>
                <Text style={[styles.entryName, item.isYou && { color: '#4ade80' }]}>
                  {item.name}
                </Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFillGreen, { width: `${item.pct * 100}%` }]} />
                </View>
              </View>
              <Text style={styles.medalIcon}>{item.medal}</Text>
              <View style={styles.entryPts}>
                <Text style={[styles.ptsVal, item.rank === 1 && { color: '#facc15' }]}>
                  {item.pts}
                </Text>
                <Text style={styles.ptsSuffix}>PTS</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ── Today's Activity ── */}
        <Text style={styles.sectionTitle}>Today's Activity</Text>

        {/* ── Most Opened Card ── */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View>
              <Text style={styles.cardTitle}>Most Opened</Text>
              <Text style={styles.cardSubtitle}>Each open costs –10 pts</Text>
            </View>
            <View style={styles.detrimentalBadge}>
              <Text style={styles.detrimentalText}>🚫 Detrimental</Text>
            </View>
          </View>

          {mostOpenedData.map((item) => (
            <View key={item.name} style={styles.appRow}>
              <View style={styles.appAvatar}>
                <Text style={{ fontSize: 20 }}>{item.emoji}</Text>
              </View>
              <View style={styles.entryInfo}>
                <View style={styles.appNameRow}>
                  <Text style={styles.appName}>{item.name}</Text>
                  <Text style={styles.opensText}>{item.opens} opens</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFillRed, { width: `${item.pct * 100}%` }]} />
                </View>
              </View>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total pts lost</Text>
            <Text style={styles.totalNeg}>–330 pts</Text>
          </View>
        </View>

        {/* ── Most Used Card ── */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View>
              <Text style={styles.cardTitle}>Most Used</Text>
              <Text style={styles.cardSubtitle}>10+ mins earns +30 pts</Text>
            </View>
            <View style={styles.beneficialBadge}>
              <Text style={styles.beneficialText}>✅ Beneficial</Text>
            </View>
          </View>

          {mostUsedData.map((item) => (
            <View key={item.name} style={styles.appRow}>
              <View style={styles.appAvatar}>
                <Text style={{ fontSize: 20 }}>{item.emoji}</Text>
              </View>
              <View style={styles.entryInfo}>
                <View style={styles.appNameRow}>
                  <Text style={styles.appName}>{item.name}</Text>
                  <Text style={styles.minsText}>{item.mins}m</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFillGreen, { width: `${item.pct * 100}%` }]} />
                </View>
              </View>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total pts earned</Text>
            <Text style={styles.totalPos}>+300 pts</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#111827' },
  scroll: { flex: 1 },
  container: { paddingBottom: 20 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  titleGroup: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#374151',
    borderWidth: 2,
    borderColor: '#4f8ef7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileEmoji: { fontSize: 22 },
  groupTitle: { fontSize: 24, fontWeight: '900', color: '#fff' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 3 },
  seasonBadge: {
    backgroundColor: '#1a3a1a',
    borderWidth: 1.5,
    borderColor: '#4ade80',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  seasonText: { color: '#4ade80', fontSize: 11, fontWeight: '700' },
  timerText: { color: '#9ca3af', fontSize: 11, fontWeight: '600' },
  currencyGroup: { flexDirection: 'row', gap: 6 },
  currencyPill: {
    backgroundColor: '#1f2937',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  lightningText: { color: '#facc15', fontWeight: '800', fontSize: 14 },
  gemText: { color: '#38bdf8', fontWeight: '800', fontSize: 14 },

  // Cards
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 16,
  },
  cardTitle: { fontSize: 20, fontWeight: '900', color: '#fff' },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  cardSubtitle: { color: '#9ca3af', fontSize: 12, marginTop: 3 },

  // Stats
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  rankInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rankIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#374151', alignItems: 'center', justifyContent: 'center',
  },
  rankLabel: { color: '#4ade80', fontWeight: '700', fontSize: 14 },
  silverBadge: {
    backgroundColor: '#374151', borderRadius: 20,
    paddingHorizontal: 8, paddingVertical: 3,
    marginTop: 3, alignSelf: 'flex-start',
  },
  silverText: { color: '#d1d5db', fontSize: 12, fontWeight: '700' },
  ptsToday: { alignItems: 'flex-end' },
  ptsTodayNum: { fontSize: 40, fontWeight: '900', color: '#fff', lineHeight: 44 },
  ptsTodayLabel: { color: '#9ca3af', fontSize: 12, fontWeight: '600' },
  statsRow: {
    flexDirection: 'row', backgroundColor: '#374151',
    borderRadius: 10, overflow: 'hidden',
  },
  statCell: {
    flex: 1, backgroundColor: '#1f2937',
    paddingVertical: 10, alignItems: 'center',
  },
  statCellBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#374151' },
  statVal: { fontSize: 20, fontWeight: '800' },
  statLbl: { color: '#9ca3af', fontSize: 10, fontWeight: '700', letterSpacing: 0.8, marginTop: 2 },

  // Leaderboard
  lbHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 12,
  },
  tabGroup: {
    flexDirection: 'row', backgroundColor: '#374151',
    borderRadius: 20, padding: 3, gap: 2,
  },
  tabBtn: { paddingHorizontal: 14, paddingVertical: 5, borderRadius: 16 },
  tabBtnActive: { backgroundColor: '#4ade80' },
  tabBtnActiveText: { color: '#111827', fontWeight: '700', fontSize: 13 },
  tabBtnText: { color: '#9ca3af', fontWeight: '700', fontSize: 13 },
  lbEntry: {
    flexDirection: 'row', alignItems: 'center',
    gap: 10, paddingHorizontal: 10, paddingVertical: 10,
    borderRadius: 12, marginBottom: 8,
  },
  lbEntryYou: { backgroundColor: '#1a3a1a', borderWidth: 1.5, borderColor: '#4ade80' },
  lbEntryFirst: { backgroundColor: '#292008', borderWidth: 1.5, borderColor: '#facc15' },
  rankNumBox: { width: 28, alignItems: 'center' },
  rankNum: { color: '#9ca3af', fontWeight: '800', fontSize: 13 },
  entryAvatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#374151', borderWidth: 2, borderColor: '#4b5563',
    alignItems: 'center', justifyContent: 'center',
  },
  entryInfo: { flex: 1 },
  entryName: { color: '#fff', fontWeight: '700', fontSize: 15 },
  progressBar: {
    height: 5, backgroundColor: '#374151',
    borderRadius: 3, marginTop: 5, overflow: 'hidden',
  },
  progressFillGreen: { height: '100%', backgroundColor: '#4ade80', borderRadius: 3 },
  progressFillRed: { height: '100%', backgroundColor: '#f87171', borderRadius: 3 },
  medalIcon: { fontSize: 20 },
  entryPts: { alignItems: 'flex-end', minWidth: 50 },
  ptsVal: { fontSize: 20, fontWeight: '900', color: '#fff' },
  ptsSuffix: { fontSize: 10, fontWeight: '700', color: '#9ca3af' },

  // Section title
  sectionTitle: {
    fontSize: 18, fontWeight: '900', color: '#e5e7eb',
    paddingHorizontal: 16, marginBottom: 10,
  },

  // Leagues card
  leaguesCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#1f2937', borderRadius: 16,
    marginHorizontal: 16, marginBottom: 14, padding: 14,
    borderWidth: 1.5, borderColor: '#4ade80',
  },
  leaguesLeft:    { flexDirection: 'row', alignItems: 'center', gap: 12 },
  leaguesIconWrap:{ width: 48, height: 48, borderRadius: 14, backgroundColor: '#1a3a1a', alignItems: 'center', justifyContent: 'center' },
  leaguesTitle:   { color: '#fff', fontSize: 16, fontWeight: '800' },
  leaguesSub:     { color: '#9ca3af', fontSize: 12, marginTop: 2 },
  leaguesRight:   { flexDirection: 'row', alignItems: 'center', gap: 6 },
  leaguesRank:    { color: '#4ade80', fontSize: 18, fontWeight: '900' },
  leaguesArrow:   { color: '#4ade80', fontSize: 30, fontWeight: '300', lineHeight: 34 },

  // App rows
  detrimentalBadge: {
    backgroundColor: '#3b0f0f', borderWidth: 1.5, borderColor: '#f87171',
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5,
  },
  detrimentalText: { color: '#f87171', fontSize: 12, fontWeight: '700' },
  beneficialBadge: {
    backgroundColor: '#1a3a1a', borderWidth: 1.5, borderColor: '#4ade80',
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5,
  },
  beneficialText: { color: '#4ade80', fontSize: 12, fontWeight: '700' },
  appRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  appAvatar: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: '#374151', alignItems: 'center', justifyContent: 'center',
  },
  appNameRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  appName: { color: '#fff', fontWeight: '700', fontSize: 15 },
  opensText: { color: '#f87171', fontWeight: '700', fontSize: 14 },
  minsText: { color: '#4ade80', fontWeight: '700', fontSize: 14 },
  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 4, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#374151',
  },
  totalLabel: { color: '#9ca3af', fontSize: 14 },
  totalNeg: { color: '#f87171', fontWeight: '900', fontSize: 18 },
  totalPos: { color: '#4ade80', fontWeight: '900', fontSize: 18 },
});