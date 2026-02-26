import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

// ─── Types ────────────────────────────────────────────────────────────────────
type Rank = 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PLAYERS: {
  id: string; name: string; avatar: string; rank: Rank;
  todayPts: number; seasonPts: number; gems: number; isYou: boolean;
}[] = [
  { id: '1', name: 'Alex',   avatar: '🧢', rank: 'GOLD',    todayPts: 520, seasonPts: 1840, gems: 18, isYou: false },
  { id: '2', name: 'Gabe',   avatar: '⭐', rank: 'SILVER',  todayPts: 340, seasonPts: 1420, gems: 12, isYou: true  },
  { id: '3', name: 'Jordan', avatar: '🎸', rank: 'SILVER',  todayPts: 290, seasonPts: 1380, gems: 9,  isYou: false },
  { id: '4', name: 'Sam',    avatar: '🎮', rank: 'BRONZE',  todayPts: 210, seasonPts: 980,  gems: 4,  isYou: false },
  { id: '5', name: 'Tyler',  avatar: '🏀', rank: 'BRONZE',  todayPts: 160, seasonPts: 720,  gems: 2,  isYou: false },
];

const TODAY_EVENTS = [
  { app: 'Instagram',  type: 'bad',  pts: -10, time: '9:14 AM',  icon: '📸' },
  { app: 'Meditation', type: 'good', pts: +30, time: '9:45 AM',  icon: '🧘' },
  { app: 'TikTok',     type: 'bad',  pts: -10, time: '11:02 AM', icon: '🎵' },
  { app: 'TikTok',     type: 'bad',  pts: -10, time: '11:20 AM', icon: '🎵' },
  { app: 'Bible App',  type: 'good', pts: +30, time: '12:30 PM', icon: '📖' },
  { app: 'Instagram',  type: 'bad',  pts: -10, time: '2:08 PM',  icon: '📸' },
  { app: 'Kindle',     type: 'good', pts: +30, time: '3:15 PM',  icon: '📚' },
];

const SEASON_NUM = 7;
const LEAGUE_NAME = 'The Boys';
const LEAGUE_GEMS = 12;

const RANK_CONFIG: Record<Rank, { color: string; bg: string; label: string; icon: string }> = {
  BRONZE:  { color: '#CD7F32', bg: 'rgba(205,127,50,0.15)',  label: 'Bronze',  icon: '🥉' },
  SILVER:  { color: '#C0C0C0', bg: 'rgba(192,192,192,0.15)', label: 'Silver',  icon: '🥈' },
  GOLD:    { color: '#FFD700', bg: 'rgba(255,215,0,0.15)',   label: 'Gold',    icon: '🥇' },
  DIAMOND: { color: '#88EEFF', bg: 'rgba(136,238,255,0.15)', label: 'Diamond', icon: '💎' },
};

// Days left until Sunday
const today = new Date();
const daysLeft = today.getDay() === 0 ? 7 : 7 - today.getDay();
const hoursLeft = (daysLeft - 1) * 24 + (24 - today.getHours());
const countdownStr = hoursLeft >= 48 ? `${daysLeft}d left` : `${hoursLeft}h left`;

// ─── Sub-components ───────────────────────────────────────────────────────────

function RankBadge({ rank, small }: { rank: Rank; small?: boolean }) {
  const cfg = RANK_CONFIG[rank];
  return (
    <View style={[
      styles.rankBadge,
      { backgroundColor: cfg.bg, borderColor: cfg.color + '55' },
      small && styles.rankBadgeSmall,
    ]}>
      <Text style={[styles.rankBadgeText, { color: cfg.color }, small && { fontSize: 14 }]}>
        {small ? cfg.icon : `${cfg.icon} ${cfg.label}`}
      </Text>
    </View>
  );
}

function ScoreBar({ pts, maxPts, delay = 0 }: { pts: number; maxPts: number; delay?: number }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: pts / maxPts, duration: 800, delay, useNativeDriver: false }).start();
  }, [pts]);
  const w = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  return (
    <View style={styles.scoreBarBg}>
      <Animated.View style={[styles.scoreBarFill, { width: w }]} />
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const [tab, setTab] = useState<'today' | 'season'>('today');

  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  const me = PLAYERS.find(p => p.isYou)!;

  const sortedPlayers = [...PLAYERS].sort((a, b) =>
    tab === 'today' ? b.todayPts - a.todayPts : b.seasonPts - a.seasonPts
  );
  const myRank = sortedPlayers.findIndex(p => p.isYou) + 1;
  const maxPts = tab === 'today' ? sortedPlayers[0].todayPts : sortedPlayers[0].seasonPts;

  const earned = TODAY_EVENTS.filter(e => e.type === 'good').reduce((s, e) => s + e.pts, 0);
  const lost   = TODAY_EVENTS.filter(e => e.type === 'bad').reduce((s, e)  => s + Math.abs(e.pts), 0);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* ── Header ── */}
          <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View>
              <Text style={styles.leagueName}>{LEAGUE_NAME}</Text>
              <View style={styles.headerMeta}>
                <View style={styles.seasonPill}>
                  <Text style={styles.seasonPillText}>Season {SEASON_NUM}</Text>
                </View>
                <Text style={styles.headerCountdown}>⏱ {countdownStr}</Text>
              </View>
            </View>
            <View style={styles.currencies}>
              <View style={styles.currPill}>
                <Text style={styles.currIcon}>⚡</Text>
                <Text style={styles.currVal}>{me.todayPts}</Text>
              </View>
              <View style={[styles.currPill, styles.gemPill]}>
                <Text style={styles.currIcon}>💎</Text>
                <Text style={[styles.currVal, { color: '#88EEFF' }]}>{LEAGUE_GEMS}</Text>
              </View>
            </View>
          </Animated.View>

          {/* ── My Card ── */}
          <Animated.View style={[styles.myCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.myCardTop}>
              <View style={styles.myAvatarWrap}>
                <Text style={styles.myAvatar}>{me.avatar}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.myLabel}>You · #{myRank} in league</Text>
                <RankBadge rank={me.rank} />
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.myPts}>{me.todayPts}</Text>
                <Text style={styles.myPtsLabel}>pts today</Text>
              </View>
            </View>
            <View style={styles.myBreakdown}>
              <View style={styles.bdItem}>
                <Text style={styles.bdVal}>+{earned}</Text>
                <Text style={styles.bdLabel}>EARNED</Text>
              </View>
              <View style={styles.bdDivider} />
              <View style={styles.bdItem}>
                <Text style={[styles.bdVal, { color: '#FF6B6B' }]}>-{lost}</Text>
                <Text style={styles.bdLabel}>LOST</Text>
              </View>
              <View style={styles.bdDivider} />
              <View style={styles.bdItem}>
                <Text style={styles.bdVal}>{me.seasonPts}</Text>
                <Text style={styles.bdLabel}>SEASON</Text>
              </View>
            </View>
          </Animated.View>

          {/* ── Leaderboard ── */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Leaderboard</Text>
              <View style={styles.tabToggle}>
                <TouchableOpacity
                  style={[styles.tBtn, tab === 'today' && styles.tBtnOn]}
                  onPress={() => setTab('today')}
                >
                  <Text style={[styles.tBtnText, tab === 'today' && styles.tBtnTextOn]}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tBtn, tab === 'season' && styles.tBtnOn]}
                  onPress={() => setTab('season')}
                >
                  <Text style={[styles.tBtnText, tab === 'season' && styles.tBtnTextOn]}>Season</Text>
                </TouchableOpacity>
              </View>
            </View>

            {sortedPlayers.map((p, i) => {
              const pts = tab === 'today' ? p.todayPts : p.seasonPts;
              const cfg = RANK_CONFIG[p.rank];
              return (
                <View
                  key={p.id}
                  style={[
                    styles.playerRow,
                    p.isYou  && styles.playerRowYou,
                    i === 0  && styles.playerRowFirst,
                  ]}
                >
                  <Text style={[styles.pos, i === 0 && { color: '#FFD700' }]}>
                    {i === 0 ? '👑' : `#${i + 1}`}
                  </Text>
                  <View style={[styles.avatarCircle, { borderColor: cfg.color + '66' }]}>
                    <Text style={styles.avatarEmoji}>{p.avatar}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <View style={styles.nameRow}>
                      <Text style={[styles.playerName, p.isYou && { color: '#A8FF78' }]}>
                        {p.name}{p.isYou ? ' (you)' : ''}
                      </Text>
                      <RankBadge rank={p.rank} small />
                    </View>
                    <ScoreBar pts={pts} maxPts={maxPts} delay={i * 80} />
                  </View>
                  <View style={styles.ptsCol}>
                    <Text style={[styles.playerPts, i === 0 && { color: '#FFD700' }]}>{pts}</Text>
                    <Text style={styles.playerPtsLbl}>pts</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* ── Activity Feed ── */}
          <View style={styles.card}>
            <Text style={[styles.cardTitle, { marginBottom: 12 }]}>Today's Activity</Text>
            {TODAY_EVENTS.map((ev, i) => (
              <View key={i} style={[styles.eventRow, i === TODAY_EVENTS.length - 1 && { borderBottomWidth: 0 }]}>
                <Text style={styles.evIcon}>{ev.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.evApp}>{ev.app}</Text>
                  <Text style={styles.evTime}>{ev.time}</Text>
                </View>
                <View style={[styles.evBadge, {
                  backgroundColor: ev.type === 'good' ? 'rgba(168,255,120,0.1)' : 'rgba(255,107,107,0.1)',
                }]}>
                  <Text style={[styles.evPts, { color: ev.type === 'good' ? '#A8FF78' : '#FF6B6B' }]}>
                    {ev.pts > 0 ? `+${ev.pts}` : ev.pts}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* ── Season Ends Banner ── */}
          <View style={styles.seasonBanner}>
            <View>
              <Text style={styles.bannerTitle}>Season {SEASON_NUM} ends Sunday</Text>
              <Text style={styles.bannerSub}>Winner earns 💎 gems + rank promotion</Text>
            </View>
            <Text style={styles.bannerTime}>{countdownStr}</Text>
          </View>

          <View style={{ height: 110 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: '#080810' },
  scroll: { paddingHorizontal: 18, paddingTop: 6 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 4,
  },
  leagueName: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.7,
    marginBottom: 6,
  },
  headerMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  seasonPill: {
    backgroundColor: 'rgba(168,255,120,0.12)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(168,255,120,0.25)',
  },
  seasonPillText: { color: '#A8FF78', fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  headerCountdown: { color: 'rgba(255,255,255,0.35)', fontSize: 12 },
  currencies: { flexDirection: 'row', gap: 6, marginTop: 4 },
  currPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 4,
  },
  gemPill: { backgroundColor: 'rgba(136,238,255,0.08)', borderWidth: 1, borderColor: 'rgba(136,238,255,0.2)' },
  currIcon: { fontSize: 13 },
  currVal:  { color: '#FFF', fontSize: 13, fontWeight: '700' },

  // My Card
  myCard: {
    backgroundColor: '#12121E',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(168,255,120,0.18)',
  },
  myCardTop:  { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  myAvatarWrap: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: 'rgba(168,255,120,0.1)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(168,255,120,0.3)',
  },
  myAvatar:   { fontSize: 26 },
  myLabel:    { color: '#A8FF78', fontSize: 13, fontWeight: '600', marginBottom: 5 },
  myPts:      { color: '#FFF', fontSize: 34, fontWeight: '800', letterSpacing: -1, lineHeight: 36 },
  myPtsLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 11, textAlign: 'right' },
  myBreakdown: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    overflow: 'hidden',
  },
  bdItem:   { flex: 1, alignItems: 'center', paddingVertical: 10 },
  bdDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginVertical: 8 },
  bdVal:    { color: '#A8FF78', fontSize: 18, fontWeight: '800', letterSpacing: -0.5 },
  bdLabel:  { color: 'rgba(255,255,255,0.3)', fontSize: 9, fontWeight: '700', letterSpacing: 0.8, marginTop: 2 },

  // Generic Card
  card: {
    backgroundColor: '#12121E',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  cardTitle:  { color: '#FFF', fontSize: 17, fontWeight: '700', letterSpacing: -0.3 },

  // Tab Toggle
  tabToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 10,
    padding: 2,
  },
  tBtn:       { paddingHorizontal: 14, paddingVertical: 5, borderRadius: 8 },
  tBtnOn:     { backgroundColor: '#A8FF78' },
  tBtnText:   { color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: '600' },
  tBtnTextOn: { color: '#080810', fontWeight: '700' },

  // Player Rows
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 14,
    marginBottom: 6,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  playerRowYou:   { backgroundColor: 'rgba(168,255,120,0.06)', borderWidth: 1, borderColor: 'rgba(168,255,120,0.15)' },
  playerRowFirst: { backgroundColor: 'rgba(255,215,0,0.05)',   borderWidth: 1, borderColor: 'rgba(255,215,0,0.15)' },
  pos:            { color: 'rgba(255,255,255,0.3)', fontSize: 13, fontWeight: '700', width: 26, textAlign: 'center' },
  avatarCircle:   { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5 },
  avatarEmoji:    { fontSize: 18 },
  nameRow:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 },
  playerName:     { color: '#FFF', fontSize: 14, fontWeight: '600' },
  scoreBarBg:     { height: 4, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' },
  scoreBarFill:   { height: '100%', backgroundColor: '#A8FF78', borderRadius: 2 },
  ptsCol:         { alignItems: 'flex-end', marginLeft: 10, minWidth: 40 },
  playerPts:      { color: '#FFF', fontSize: 16, fontWeight: '800', letterSpacing: -0.5 },
  playerPtsLbl:   { color: 'rgba(255,255,255,0.25)', fontSize: 9, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },

  // Rank Badge
  rankBadge:      { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, alignSelf: 'flex-start' },
  rankBadgeSmall: { paddingHorizontal: 4, paddingVertical: 2 },
  rankBadgeText:  { fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },

  // Activity Feed
  eventRow:  { flexDirection: 'row', alignItems: 'center', paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  evIcon:    { fontSize: 20, marginRight: 12, width: 28, textAlign: 'center' },
  evApp:     { color: '#FFF', fontSize: 14, fontWeight: '600' },
  evTime:    { color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 1 },
  evBadge:   { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  evPts:     { fontSize: 14, fontWeight: '800', letterSpacing: -0.3 },

  // Season Banner
  seasonBanner: {
    backgroundColor: '#12121E',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(136,238,255,0.15)',
    marginBottom: 14,
  },
  bannerTitle: { color: '#FFF', fontSize: 15, fontWeight: '700', marginBottom: 3 },
  bannerSub:   { color: 'rgba(255,255,255,0.4)', fontSize: 12 },
  bannerTime:  { color: '#88EEFF', fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
});