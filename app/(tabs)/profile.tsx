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
type Range = 'week' | '7days' | 'alltime';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const DATA: Record<Range, {
  label: string;
  days: { day: string; pts: number; won: boolean }[];
  avgScore: number;
  streak: number;
  bestStreak: number;
  totalWins: number;
  totalSeasons: number;
  detrimental: { name: string; icon: string; opens: number }[];
  beneficial: { name: string; icon: string; minutes: number }[];
}> = {
  week: {
    label: 'This Week',
    days: [
      { day: 'Mon', pts: 290, won: false },
      { day: 'Tue', pts: 410, won: true  },
      { day: 'Wed', pts: 180, won: false },
      { day: 'Thu', pts: 520, won: true  },
      { day: 'Fri', pts: 340, won: false },
      { day: 'Sat', pts: 460, won: true  },
      { day: 'Sun', pts: 340, won: false },
    ],
    avgScore: 363,
    streak: 2,
    bestStreak: 5,
    totalWins: 3,
    totalSeasons: 7,
    detrimental: [
      { name: 'TikTok',      icon: '🎵', opens: 14 },
      { name: 'Instagram',   icon: '📸', opens: 9  },
      { name: 'YouTube',     icon: '▶️', opens: 6  },
      { name: 'X (Twitter)', icon: '𝕏',  opens: 4  },
    ],
    beneficial: [
      { name: 'Kindle',     icon: '📚', minutes: 47 },
      { name: 'Meditation', icon: '🧘', minutes: 38 },
      { name: 'Bible App',  icon: '📖', minutes: 22 },
      { name: 'Duolingo',   icon: '🦜', minutes: 15 },
    ],
  },
  '7days': {
    label: 'Last 7 Days',
    days: [
      { day: 'Feb 19', pts: 200, won: false },
      { day: 'Feb 20', pts: 380, won: true  },
      { day: 'Feb 21', pts: 510, won: true  },
      { day: 'Feb 22', pts: 270, won: false },
      { day: 'Feb 23', pts: 440, won: true  },
      { day: 'Feb 24', pts: 390, won: false },
      { day: 'Feb 25', pts: 340, won: false },
    ],
    avgScore: 361,
    streak: 2,
    bestStreak: 5,
    totalWins: 3,
    totalSeasons: 7,
    detrimental: [
      { name: 'Instagram',   icon: '📸', opens: 18 },
      { name: 'TikTok',      icon: '🎵', opens: 11 },
      { name: 'Snapchat',    icon: '👻', opens: 7  },
      { name: 'Reddit',      icon: '🤖', opens: 3  },
    ],
    beneficial: [
      { name: 'Meditation', icon: '🧘', minutes: 55 },
      { name: 'Kindle',     icon: '📚', minutes: 40 },
      { name: 'Nike Run',   icon: '👟', minutes: 30 },
      { name: 'Bible App',  icon: '📖', minutes: 18 },
    ],
  },
  alltime: {
    label: 'All Time',
    days: [
      { day: 'S1', pts: 740,  won: false },
      { day: 'S2', pts: 1600, won: true  },
      { day: 'S3', pts: 980,  won: false },
      { day: 'S4', pts: 2100, won: true  },
      { day: 'S5', pts: 1290, won: false },
      { day: 'S6', pts: 1840, won: true  },
      { day: 'S7', pts: 1420, won: false },
    ],
    avgScore: 1424,
    streak: 2,
    bestStreak: 5,
    totalWins: 3,
    totalSeasons: 7,
    detrimental: [
      { name: 'TikTok',      icon: '🎵', opens: 312 },
      { name: 'Instagram',   icon: '📸', opens: 274 },
      { name: 'YouTube',     icon: '▶️', opens: 198 },
      { name: 'X (Twitter)', icon: '𝕏',  opens: 87  },
    ],
    beneficial: [
      { name: 'Kindle',     icon: '📚', minutes: 842 },
      { name: 'Meditation', icon: '🧘', minutes: 610 },
      { name: 'Bible App',  icon: '📖', minutes: 490 },
      { name: 'Duolingo',   icon: '🦜', minutes: 320 },
    ],
  },
};

const RANGES: { id: Range; label: string }[] = [
  { id: 'week',    label: 'This Week'   },
  { id: '7days',   label: 'Last 7 Days' },
  { id: 'alltime', label: 'All Time'    },
];

// ─── Bar Chart ────────────────────────────────────────────────────────────────
function BarChart({ days, range }: { days: typeof DATA.week.days; range: Range }) {
  const maxPts = Math.max(...days.map(d => d.pts));
  const anims  = useRef(days.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    anims.forEach(a => a.setValue(0));
    Animated.stagger(60, anims.map((anim, i) =>
      Animated.timing(anim, {
        toValue: days[i].pts / maxPts,
        duration: 500,
        useNativeDriver: false,
      })
    )).start();
  }, [range]);

  const isToday = range === 'week' ? 6 : -1;

  return (
    <View style={styles.chartWrap}>
      <View style={styles.yAxis}>
        <Text style={styles.yLabel}>{maxPts >= 1000 ? `${(maxPts/1000).toFixed(1)}k` : maxPts}</Text>
        <Text style={styles.yLabel}>{maxPts >= 1000 ? `${(maxPts/2000).toFixed(1)}k` : Math.round(maxPts/2)}</Text>
        <Text style={styles.yLabel}>0</Text>
      </View>
      <View style={styles.bars}>
        {days.map((d, i) => {
          const barH = anims[i].interpolate({ inputRange: [0, 1], outputRange: [2, 120] });
          const today = i === isToday;
          return (
            <View key={i} style={styles.barCol}>
              {d.won && <View style={styles.winDot} />}
              <View style={styles.barTrack}>
                <Animated.View style={[
                  styles.bar,
                  { height: barH },
                  today   && styles.barToday,
                  !today && d.won  && styles.barWin,
                  !today && !d.won && styles.barNormal,
                ]} />
              </View>
              <Text style={[styles.barDayLabel, today && { color: '#A8FF78' }]}>{d.day}</Text>
              <Text style={[styles.barPtsLabel, today && { color: '#A8FF78' }]}>
                {d.pts >= 1000 ? `${(d.pts/1000).toFixed(1)}k` : d.pts}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

// ─── Stat Tile ────────────────────────────────────────────────────────────────
function StatTile({ icon, value, label, color = '#FFF', sub }: {
  icon: string; value: string; label: string; color?: string; sub?: string;
}) {
  const scale = useRef(new Animated.Value(0.88)).current;
  const fade  = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, friction: 7, tension: 80, useNativeDriver: true }),
      Animated.timing(fade,  { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);
  return (
    <Animated.View style={[styles.statTile, { opacity: fade, transform: [{ scale }] }]}>
      <Text style={styles.statTileIcon}>{icon}</Text>
      <Text style={[styles.statTileVal, { color }]}>{value}</Text>
      <Text style={styles.statTileLabel}>{label}</Text>
      {sub && <Text style={styles.statTileSub}>{sub}</Text>}
    </Animated.View>
  );
}

// ─── App Row ──────────────────────────────────────────────────────────────────
function AppRow({ name, icon, value, maxVal, type, index, rangeKey }: {
  name: string; icon: string; value: number; maxVal: number;
  type: 'detrimental' | 'beneficial'; index: number; rangeKey: Range;
}) {
  const barAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    barAnim.setValue(0);
    Animated.timing(barAnim, {
      toValue: value / maxVal,
      duration: 600,
      delay: index * 80,
      useNativeDriver: false,
    }).start();
  }, [rangeKey]);

  const barW   = barAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const color  = type === 'detrimental' ? '#FF6B6B' : '#A8FF78';
  const suffix = type === 'detrimental' ? ' opens' : 'm';

  return (
    <View style={styles.appRow}>
      <Text style={styles.appRowIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <View style={styles.appRowTop}>
          <Text style={styles.appRowName}>{name}</Text>
          <Text style={[styles.appRowVal, { color }]}>{value}{suffix}</Text>
        </View>
        <View style={styles.appBarBg}>
          <Animated.View style={[styles.appBarFill, { width: barW, backgroundColor: color }]} />
        </View>
      </View>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function StatisticsScreen() {
  const [range, setRange] = useState<Range>('week');
  const data = DATA[range];

  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const winRate = Math.round((data.totalWins / data.totalSeasons) * 100);
  const maxDet  = data.detrimental[0]?.opens   ?? 1;
  const maxBen  = data.beneficial[0]?.minutes  ?? 1;
  const totalDetPts = data.detrimental.reduce((s, a) => s + a.opens * 10, 0);
  const totalBenPts = data.beneficial.reduce((s, a) => s + Math.floor(a.minutes / 10) * 30, 0);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* ── Header ── */}
          <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.headerTitle}>Statistics</Text>
            <Text style={styles.headerSub}>Your screen time performance</Text>
          </Animated.View>

          {/* ── Range Toggle ── */}
          <View style={styles.rangeToggle}>
            {RANGES.map(r => (
              <TouchableOpacity
                key={r.id}
                style={[styles.rangeBtn, range === r.id && styles.rangeBtnActive]}
                onPress={() => setRange(r.id)}
              >
                <Text style={[styles.rangeBtnText, range === r.id && styles.rangeBtnTextActive]}>
                  {r.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ── Score Chart ── */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>
                {range === 'alltime' ? 'Season Scores' : 'Daily Scores'}
              </Text>
              <View style={styles.chartLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#A8FF78' }]} />
                  <Text style={styles.legendLabel}>Win</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: 'rgba(255,255,255,0.15)' }]} />
                  <Text style={styles.legendLabel}>Loss</Text>
                </View>
              </View>
            </View>
            <BarChart days={data.days} range={range} />
          </View>

          {/* ── Summary Tiles ── */}
          <View style={styles.tilesRow}>
            <StatTile
              icon="📊"
              value={data.avgScore >= 1000 ? `${(data.avgScore/1000).toFixed(1)}k` : `${data.avgScore}`}
              label="Avg Score"
              color="#88EEFF"
            />
            <StatTile
              icon="🔥"
              value={`${data.streak}`}
              label="Win Streak"
              color="#FF9F43"
              sub={`Best: ${data.bestStreak}`}
            />
            <StatTile
              icon="🏆"
              value={`${winRate}%`}
              label="Win Rate"
              color="#A8FF78"
              sub={`${data.totalWins}/${data.totalSeasons} seasons`}
            />
          </View>

          {/* ── Detrimental Apps ── */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Most Opened</Text>
              <View style={[styles.typePill, { backgroundColor: 'rgba(255,107,107,0.1)', borderColor: 'rgba(255,107,107,0.25)' }]}>
                <Text style={[styles.typePillText, { color: '#FF6B6B' }]}>📵 Detrimental</Text>
              </View>
            </View>
            <Text style={styles.cardSubtitle}>Each open costs −10 pts</Text>
            {data.detrimental.map((app, i) => (
              <AppRow key={app.name} name={app.name} icon={app.icon}
                value={app.opens} maxVal={maxDet} type="detrimental" index={i} rangeKey={range} />
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total pts lost</Text>
              <Text style={[styles.totalVal, { color: '#FF6B6B' }]}>−{totalDetPts} pts</Text>
            </View>
          </View>

          {/* ── Beneficial Apps ── */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Most Used</Text>
              <View style={[styles.typePill, { backgroundColor: 'rgba(168,255,120,0.1)', borderColor: 'rgba(168,255,120,0.25)' }]}>
                <Text style={[styles.typePillText, { color: '#A8FF78' }]}>✅ Beneficial</Text>
              </View>
            </View>
            <Text style={styles.cardSubtitle}>10+ mins earns +30 pts</Text>
            {data.beneficial.map((app, i) => (
              <AppRow key={app.name} name={app.name} icon={app.icon}
                value={app.minutes} maxVal={maxBen} type="beneficial" index={i} rangeKey={range} />
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total pts earned</Text>
              <Text style={[styles.totalVal, { color: '#A8FF78' }]}>+{totalBenPts} pts</Text>
            </View>
          </View>

          {/* ── Insight Card ── */}
          <View style={styles.insightCard}>
            <Text style={styles.insightEmoji}>💡</Text>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.insightTitle}>Your biggest weakness</Text>
              <Text style={styles.insightText}>
                {data.detrimental[0]?.name} is costing you the most points.
                Cutting it by half would save you ~{Math.round(data.detrimental[0]?.opens * 5)} pts.
              </Text>
            </View>
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

  header:      { marginTop: 10, marginBottom: 18 },
  headerTitle: { color: '#FFF', fontSize: 28, fontWeight: '800', letterSpacing: -0.7 },
  headerSub:   { color: 'rgba(255,255,255,0.3)', fontSize: 13, marginTop: 3 },

  rangeToggle:       { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 3, marginBottom: 16 },
  rangeBtn:          { flex: 1, paddingVertical: 9, borderRadius: 11, alignItems: 'center' },
  rangeBtnActive:    { backgroundColor: '#A8FF78' },
  rangeBtnText:      { color: 'rgba(255,255,255,0.35)', fontSize: 12, fontWeight: '600' },
  rangeBtnTextActive:{ color: '#080810', fontWeight: '800' },

  card:         { backgroundColor: '#12121E', borderRadius: 22, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  cardHeader:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  cardTitle:    { color: '#FFF', fontSize: 17, fontWeight: '700', letterSpacing: -0.3 },
  cardSubtitle: { color: 'rgba(255,255,255,0.3)', fontSize: 12, marginBottom: 14 },

  chartWrap: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 8 },
  yAxis:     { width: 34, height: 140, justifyContent: 'space-between', alignItems: 'flex-end', paddingRight: 6, paddingBottom: 20 },
  yLabel:    { color: 'rgba(255,255,255,0.2)', fontSize: 9 },
  bars:      { flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  barCol:    { flex: 1, alignItems: 'center' },
  winDot:    { width: 5, height: 5, borderRadius: 3, backgroundColor: '#A8FF78', marginBottom: 4 },
  barTrack:  { height: 120, justifyContent: 'flex-end', width: '65%' },
  bar:       { width: '100%', borderRadius: 6 },
  barToday:  { backgroundColor: '#A8FF78' },
  barWin:    { backgroundColor: 'rgba(168,255,120,0.45)' },
  barNormal: { backgroundColor: 'rgba(255,255,255,0.15)' },
  barDayLabel:{ color: 'rgba(255,255,255,0.3)', fontSize: 9, marginTop: 5, fontWeight: '600' },
  barPtsLabel:{ color: 'rgba(255,255,255,0.2)', fontSize: 8, marginTop: 1 },

  chartLegend: { flexDirection: 'row', gap: 10 },
  legendItem:  { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot:   { width: 7, height: 7, borderRadius: 4 },
  legendLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 11 },

  tilesRow:      { flexDirection: 'row', gap: 10, marginBottom: 14 },
  statTile:      { flex: 1, backgroundColor: '#12121E', borderRadius: 18, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  statTileIcon:  { fontSize: 22, marginBottom: 6 },
  statTileVal:   { fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  statTileLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 3, textAlign: 'center' },
  statTileSub:   { color: 'rgba(255,255,255,0.2)', fontSize: 10, marginTop: 2 },

  appRow:     { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  appRowIcon: { fontSize: 20, marginRight: 10, width: 28, textAlign: 'center' },
  appRowTop:  { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  appRowName: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  appRowVal:  { fontSize: 13, fontWeight: '700' },
  appBarBg:   { height: 5, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' },
  appBarFill: { height: '100%', borderRadius: 3 },

  totalRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  totalLabel:{ color: 'rgba(255,255,255,0.3)', fontSize: 13 },
  totalVal:  { fontSize: 15, fontWeight: '800', letterSpacing: -0.3 },

  typePill:     { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1 },
  typePillText: { fontSize: 11, fontWeight: '700' },

  insightCard:  { backgroundColor: '#12121E', borderRadius: 18, padding: 16, flexDirection: 'row', alignItems: 'flex-start', borderWidth: 1, borderColor: 'rgba(136,238,255,0.15)', marginBottom: 14 },
  insightEmoji: { fontSize: 28 },
  insightTitle: { color: '#FFF', fontSize: 14, fontWeight: '700', marginBottom: 4 },
  insightText:  { color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 19 },
});