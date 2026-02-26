import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

// ─── Types ────────────────────────────────────────────────────────────────────
type Rank = 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND';
type Tab = 'friends' | 'requests' | 'search';

// ─── Data ─────────────────────────────────────────────────────────────────────
const ME = {
  name: 'Gabe', username: '@gabe.h', avatar: '⭐', rank: 'SILVER' as Rank,
  todayPts: 340, seasonPts: 1420, gems: 12,
  weekRecord: [true, false, true, true, false, true, false],
};

const FRIENDS = [
  { id: '1', name: 'Alex',   username: '@alex_g',   avatar: '🧢', rank: 'GOLD'   as Rank, todayPts: 520, seasonPts: 1840, gems: 18, online: true,  weekRecord: [true, true, false, true, true, false, true],  topBad: 'Instagram', topGood: 'Headspace' },
  { id: '2', name: 'Jordan', username: '@jordan22', avatar: '🎸', rank: 'SILVER' as Rank, todayPts: 290, seasonPts: 1380, gems: 9,  online: false, weekRecord: [false, true, true, false, true, false, false], topBad: 'TikTok',     topGood: 'Kindle'    },
  { id: '3', name: 'Sam',    username: '@sam_t',    avatar: '🎮', rank: 'BRONZE' as Rank, todayPts: 210, seasonPts: 980,  gems: 4,  online: true,  weekRecord: [false, false, true, false, false, true, false], topBad: 'YouTube',    topGood: 'Bible App' },
  { id: '4', name: 'Tyler',  username: '@tyler.k',  avatar: '🏀', rank: 'BRONZE' as Rank, todayPts: 160, seasonPts: 720,  gems: 2,  online: false, weekRecord: [false, true, false, false, true, false, false], topBad: 'Snapchat',   topGood: 'Duolingo'  },
];

const PENDING_REQUESTS = [
  { id: 'r1', name: 'Max',   username: '@max_r',   avatar: '🦊' },
  { id: 'r2', name: 'Chris', username: '@chris99', avatar: '🎯' },
];

const MOCK_SEARCH: { id: string; name: string; username: string; avatar: string; rank: Rank }[] = [
  { id: 's1', name: 'Jake',  username: '@jake.w',  avatar: '🏄', rank: 'SILVER' },
  { id: 's2', name: 'Emma',  username: '@emma_x',  avatar: '🌸', rank: 'GOLD'   },
  { id: 's3', name: 'Noah',  username: '@noah22',  avatar: '🎻', rank: 'BRONZE' },
];

const RANK_CONFIG: Record<Rank, { color: string; bg: string; label: string; icon: string }> = {
  BRONZE:  { color: '#CD7F32', bg: 'rgba(205,127,50,0.12)',  label: 'Bronze',  icon: '🥉' },
  SILVER:  { color: '#C0C0C0', bg: 'rgba(192,192,192,0.12)', label: 'Silver',  icon: '🥈' },
  GOLD:    { color: '#FFD700', bg: 'rgba(255,215,0,0.12)',   label: 'Gold',    icon: '🥇' },
  DIAMOND: { color: '#88EEFF', bg: 'rgba(136,238,255,0.12)', label: 'Diamond', icon: '💎' },
};

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

// ─── H2H Modal ────────────────────────────────────────────────────────────────
function H2HModal({ friend, onClose }: { friend: typeof FRIENDS[0] | null; onClose: () => void }) {
  const slideAnim = useRef(new Animated.Value(400)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (friend) {
      slideAnim.setValue(400);
      fadeAnim.setValue(0);
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 70, useNativeDriver: true }),
        Animated.timing(fadeAnim,  { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
    }
  }, [friend?.id]);

  if (!friend) return null;

  const meCfg    = RANK_CONFIG[ME.rank];
  const themCfg  = RANK_CONFIG[friend.rank];
  const meWins   = ME.weekRecord.filter(Boolean).length;
  const themWins = friend.weekRecord.filter(Boolean).length;
  const meAhead  = ME.todayPts > friend.todayPts;
  const diff     = Math.abs(ME.todayPts - friend.todayPts);

  return (
    <Modal transparent animationType="none" visible={!!friend} onRequestClose={onClose}>
      <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} activeOpacity={1} />
        <Animated.View style={[styles.modalSheet, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.modalHandle} />
          <Text style={styles.h2hTitle}>Head to Head</Text>

          {/* Avatars */}
          <View style={styles.h2hAvatarRow}>
            <View style={styles.h2hPlayer}>
              <View style={[styles.h2hAvatar, { borderColor: meCfg.color + '66' }]}>
                <Text style={styles.h2hAvatarEmoji}>{ME.avatar}</Text>
              </View>
              <Text style={styles.h2hPlayerName}>You</Text>
              <View style={[styles.h2hBadge, { backgroundColor: meCfg.bg, borderColor: meCfg.color + '44' }]}>
                <Text style={[styles.h2hBadgeText, { color: meCfg.color }]}>{meCfg.icon} {meCfg.label}</Text>
              </View>
            </View>
            <Text style={styles.h2hVs}>VS</Text>
            <View style={styles.h2hPlayer}>
              <View style={[styles.h2hAvatar, { borderColor: themCfg.color + '66' }]}>
                <Text style={styles.h2hAvatarEmoji}>{friend.avatar}</Text>
              </View>
              <Text style={styles.h2hPlayerName}>{friend.name}</Text>
              <View style={[styles.h2hBadge, { backgroundColor: themCfg.bg, borderColor: themCfg.color + '44' }]}>
                <Text style={[styles.h2hBadgeText, { color: themCfg.color }]}>{themCfg.icon} {themCfg.label}</Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          {[
            { label: "Today's pts", me: ME.todayPts,    them: friend.todayPts    },
            { label: 'Season pts',  me: ME.seasonPts,   them: friend.seasonPts   },
            { label: 'Week wins',   me: `${meWins}W`,   them: `${themWins}W`     },
          ].map((row, i) => (
            <View key={i} style={styles.h2hStatRow}>
              <Text style={[styles.h2hStatVal, Number(row.me) >= Number(row.them) && { color: '#A8FF78' }]}>{row.me}</Text>
              <Text style={styles.h2hStatLabel}>{row.label}</Text>
              <Text style={[styles.h2hStatVal, Number(row.them) >= Number(row.me) && { color: '#A8FF78' }]}>{row.them}</Text>
            </View>
          ))}

          {/* Week dots */}
          <Text style={styles.h2hWeekTitle}>This Week</Text>
          <View style={styles.h2hWeekRow}>
            {DAYS.map((day, i) => (
              <View key={i} style={styles.h2hDayCol}>
                <View style={[styles.h2hDot, { backgroundColor: ME.weekRecord[i] ? '#A8FF78' : 'rgba(255,255,255,0.08)' }]} />
                <Text style={styles.h2hDayLabel}>{day}</Text>
                <View style={[styles.h2hDot, { backgroundColor: friend.weekRecord[i] ? themCfg.color : 'rgba(255,255,255,0.08)' }]} />
              </View>
            ))}
          </View>
          <View style={styles.h2hLegendRow}>
            <View style={styles.h2hLegendItem}><View style={[styles.h2hLegendDot, { backgroundColor: '#A8FF78' }]} /><Text style={styles.h2hLegendText}>You</Text></View>
            <View style={styles.h2hLegendItem}><View style={[styles.h2hLegendDot, { backgroundColor: themCfg.color }]} /><Text style={styles.h2hLegendText}>{friend.name}</Text></View>
          </View>

          {/* Verdict */}
          <View style={[styles.verdict, {
            backgroundColor: meAhead ? 'rgba(168,255,120,0.08)' : 'rgba(255,107,107,0.08)',
            borderColor: meAhead ? 'rgba(168,255,120,0.2)' : 'rgba(255,107,107,0.2)',
          }]}>
            <Text style={[styles.verdictText, { color: meAhead ? '#A8FF78' : '#FF6B6B' }]}>
              {meAhead ? `You're ahead by ${diff} pts 🔥` : `${friend.name} leads by ${diff} pts — catch up!`}
            </Text>
          </View>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

// ─── Friend Card ──────────────────────────────────────────────────────────────
function FriendCard({ friend, index, onCompare }: {
  friend: typeof FRIENDS[0]; index: number; onCompare: () => void;
}) {
  const cfg      = RANK_CONFIG[friend.rank];
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 400, delay: index * 80, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, delay: index * 80, useNativeDriver: true }),
    ]).start();
  }, []);

  const ahead = friend.todayPts > ME.todayPts;
  const diff  = Math.abs(friend.todayPts - ME.todayPts);

  return (
    <Animated.View style={[styles.friendCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View style={styles.friendCardTop}>
        <View style={styles.friendAvatarWrap}>
          <Text style={styles.friendAvatarEmoji}>{friend.avatar}</Text>
          {friend.online && <View style={styles.onlineDot} />}
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.friendName}>{friend.name}</Text>
          <Text style={styles.friendUsername}>{friend.username}</Text>
        </View>
        <View style={[styles.rankBadge, { backgroundColor: cfg.bg, borderColor: cfg.color + '44' }]}>
          <Text style={[styles.rankBadgeText, { color: cfg.color }]}>{cfg.icon} {cfg.label}</Text>
        </View>
      </View>

      <View style={styles.friendScoreRow}>
        <View style={styles.scorePill}>
          <Text style={styles.scorePillLabel}>Today</Text>
          <Text style={styles.scorePillVal}>{friend.todayPts} pts</Text>
        </View>
        <View style={styles.scorePill}>
          <Text style={styles.scorePillLabel}>Season</Text>
          <Text style={styles.scorePillVal}>{friend.seasonPts} pts</Text>
        </View>
        <View style={[styles.diffPill, { backgroundColor: ahead ? 'rgba(255,107,107,0.1)' : 'rgba(168,255,120,0.1)' }]}>
          <Text style={[styles.diffText, { color: ahead ? '#FF6B6B' : '#A8FF78' }]}>
            {ahead ? `−${diff}` : `+${diff}`}
          </Text>
        </View>
      </View>

      <View style={styles.weekRow}>
        {DAYS.map((day, i) => (
          <View key={i} style={styles.weekDayCol}>
            <View style={[styles.weekDot, { backgroundColor: friend.weekRecord[i] ? cfg.color : 'rgba(255,255,255,0.08)' }]} />
            <Text style={styles.weekDayLabel}>{day}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.h2hBtn} onPress={onCompare}>
          <Text style={styles.h2hBtnText}>H2H ›</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function FriendsScreen() {
  const [tab, setTab]             = useState<Tab>('friends');
  const [search, setSearch]       = useState('');
  const [sentReqs, setSentReqs]   = useState<string[]>([]);
  const [accepted, setAccepted]   = useState<string[]>([]);
  const [declined, setDeclined]   = useState<string[]>([]);
  const [h2hFriend, setH2hFriend] = useState<typeof FRIENDS[0] | null>(null);

  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const pendingCount   = PENDING_REQUESTS.filter(r => !accepted.includes(r.id) && !declined.includes(r.id)).length;
  const filteredSearch = MOCK_SEARCH.filter(u =>
    search.length > 0 && (
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>

        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View>
            <Text style={styles.headerTitle}>Friends</Text>
            <Text style={styles.headerSub}>{FRIENDS.length} friends · {FRIENDS.filter(f => f.online).length} online now</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={() => setTab('search')}>
            <Text style={styles.addBtnText}>+ Add</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Tab bar */}
        <View style={styles.tabRow}>
          {(['friends', 'requests', 'search'] as Tab[]).map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.tabBtn, tab === t && styles.tabBtnActive]}
              onPress={() => setTab(t)}
            >
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                {t === 'friends'  && 'Friends'}
                {t === 'requests' && `Requests${pendingCount > 0 ? ` (${pendingCount})` : ''}`}
                {t === 'search'   && 'Search'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* ── Friends ── */}
          {tab === 'friends' && FRIENDS.map((f, i) => (
            <FriendCard key={f.id} friend={f} index={i} onCompare={() => setH2hFriend(f)} />
          ))}

          {/* ── Requests ── */}
          {tab === 'requests' && (
            <>
              {pendingCount === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyEmoji}>📬</Text>
                  <Text style={styles.emptyTitle}>No pending requests</Text>
                  <Text style={styles.emptySub}>Friend requests will show up here</Text>
                </View>
              ) : (
                PENDING_REQUESTS.filter(r => !accepted.includes(r.id) && !declined.includes(r.id)).map(req => (
                  <View key={req.id} style={styles.requestCard}>
                    <View style={styles.requestAvatar}>
                      <Text style={{ fontSize: 24 }}>{req.avatar}</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={styles.requestName}>{req.name}</Text>
                      <Text style={styles.requestUsername}>{req.username}</Text>
                    </View>
                    <TouchableOpacity style={styles.acceptBtn} onPress={() => setAccepted(p => [...p, req.id])}>
                      <Text style={styles.acceptText}>✓</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.declineBtn} onPress={() => setDeclined(p => [...p, req.id])}>
                      <Text style={styles.declineText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </>
          )}

          {/* ── Search ── */}
          {tab === 'search' && (
            <>
              <TextInput
                style={styles.searchInput}
                placeholder="Search by name or @username..."
                placeholderTextColor="rgba(255,255,255,0.2)"
                value={search}
                onChangeText={setSearch}
                autoFocus
              />
              {search.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyEmoji}>🔍</Text>
                  <Text style={styles.emptySub}>Type a name or @username</Text>
                </View>
              )}
              {search.length > 0 && filteredSearch.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyEmoji}>😕</Text>
                  <Text style={styles.emptySub}>No users found for "{search}"</Text>
                </View>
              )}
              {filteredSearch.map(user => {
                const cfg    = RANK_CONFIG[user.rank];
                const isSent = sentReqs.includes(user.id);
                return (
                  <View key={user.id} style={styles.searchCard}>
                    <View style={styles.searchAvatar}>
                      <Text style={{ fontSize: 24 }}>{user.avatar}</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={styles.searchName}>{user.name}</Text>
                      <Text style={styles.searchUsername}>{user.username}</Text>
                    </View>
                    <View style={[styles.rankBadge, { backgroundColor: cfg.bg, borderColor: cfg.color + '44', marginRight: 8 }]}>
                      <Text style={[styles.rankBadgeText, { color: cfg.color }]}>{cfg.icon}</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.sendBtn, isSent && styles.sendBtnSent]}
                      onPress={() => setSentReqs(p => isSent ? p.filter(x => x !== user.id) : [...p, user.id])}
                    >
                      <Text style={[styles.sendBtnText, isSent && { color: '#A8FF78' }]}>
                        {isSent ? '✓ Sent' : '+ Add'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </>
          )}

          <View style={{ height: 110 }} />
        </ScrollView>
      </SafeAreaView>

      <H2HModal friend={h2hFriend} onClose={() => setH2hFriend(null)} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: '#080810' },
  scroll: { paddingHorizontal: 18, paddingTop: 10 },

  header:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 8 },
  headerTitle:{ color: '#FFF', fontSize: 28, fontWeight: '800', letterSpacing: -0.7 },
  headerSub: { color: 'rgba(255,255,255,0.3)', fontSize: 13, marginTop: 2 },
  addBtn:    { backgroundColor: 'rgba(168,255,120,0.12)', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: 'rgba(168,255,120,0.25)' },
  addBtnText:{ color: '#A8FF78', fontSize: 13, fontWeight: '700' },

  tabRow:       { flexDirection: 'row', paddingHorizontal: 18, marginBottom: 6, gap: 6 },
  tabBtn:       { flex: 1, paddingVertical: 9, borderRadius: 12, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)' },
  tabBtnActive: { backgroundColor: '#A8FF78' },
  tabText:      { color: 'rgba(255,255,255,0.35)', fontSize: 12, fontWeight: '600' },
  tabTextActive:{ color: '#080810', fontWeight: '800' },

  // Friend Card
  friendCard:      { backgroundColor: '#12121E', borderRadius: 20, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  friendCardTop:   { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  friendAvatarWrap:{ width: 46, height: 46, borderRadius: 23, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' },
  friendAvatarEmoji:{ fontSize: 22 },
  onlineDot:       { position: 'absolute', bottom: 0, right: 0, width: 11, height: 11, borderRadius: 6, backgroundColor: '#A8FF78', borderWidth: 2, borderColor: '#12121E' },
  friendName:      { color: '#FFF', fontSize: 15, fontWeight: '700' },
  friendUsername:  { color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 1 },

  rankBadge:    { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1 },
  rankBadgeText:{ fontSize: 11, fontWeight: '700' },

  friendScoreRow:{ flexDirection: 'row', gap: 8, marginBottom: 12 },
  scorePill:     { flex: 1, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 8 },
  scorePillLabel:{ color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  scorePillVal:  { color: '#FFF', fontSize: 14, fontWeight: '800', marginTop: 2 },
  diffPill:      { borderRadius: 10, paddingHorizontal: 12, justifyContent: 'center', alignItems: 'center' },
  diffText:      { fontSize: 15, fontWeight: '800' },

  weekRow:     { flexDirection: 'row', alignItems: 'center' },
  weekDayCol:  { flex: 1, alignItems: 'center', gap: 4 },
  weekDot:     { width: 8, height: 8, borderRadius: 4 },
  weekDayLabel:{ color: 'rgba(255,255,255,0.2)', fontSize: 9, fontWeight: '600' },
  h2hBtn:      { backgroundColor: 'rgba(136,238,255,0.1)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: 'rgba(136,238,255,0.2)', marginLeft: 8 },
  h2hBtnText:  { color: '#88EEFF', fontSize: 11, fontWeight: '800' },

  // Requests
  requestCard:   { flexDirection: 'row', alignItems: 'center', backgroundColor: '#12121E', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  requestAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' },
  requestName:   { color: '#FFF', fontSize: 15, fontWeight: '700' },
  requestUsername:{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 1 },
  acceptBtn:     { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(168,255,120,0.15)', alignItems: 'center', justifyContent: 'center', marginLeft: 8, borderWidth: 1, borderColor: 'rgba(168,255,120,0.3)' },
  acceptText:    { color: '#A8FF78', fontSize: 16, fontWeight: '800' },
  declineBtn:    { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,107,107,0.1)', alignItems: 'center', justifyContent: 'center', marginLeft: 6, borderWidth: 1, borderColor: 'rgba(255,107,107,0.2)' },
  declineText:   { color: '#FF6B6B', fontSize: 14, fontWeight: '800' },

  // Search
  searchInput: { backgroundColor: '#12121E', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', color: '#FFF', fontSize: 15, padding: 14, marginBottom: 14 },
  searchCard:  { flexDirection: 'row', alignItems: 'center', backgroundColor: '#12121E', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  searchAvatar:{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' },
  searchName:  { color: '#FFF', fontSize: 15, fontWeight: '700' },
  searchUsername:{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 1 },
  sendBtn:     { backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  sendBtnSent: { backgroundColor: 'rgba(168,255,120,0.1)', borderColor: 'rgba(168,255,120,0.2)' },
  sendBtnText: { color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: '700' },

  // Empty
  emptyState: { alignItems: 'center', paddingTop: 50 },
  emptyEmoji: { fontSize: 44, marginBottom: 12 },
  emptyTitle: { color: '#FFF', fontSize: 18, fontWeight: '700', marginBottom: 6 },
  emptySub:   { color: 'rgba(255,255,255,0.3)', fontSize: 14, textAlign: 'center', lineHeight: 20 },

  // H2H Modal
  modalOverlay:{ flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'flex-end' },
  modalSheet:  { backgroundColor: '#12121E', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 44, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  modalHandle: { width: 40, height: 4, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  h2hTitle:    { color: '#FFF', fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 20, letterSpacing: -0.5 },

  h2hAvatarRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  h2hPlayer:    { alignItems: 'center', flex: 1 },
  h2hAvatar:    { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center', borderWidth: 2, marginBottom: 8 },
  h2hAvatarEmoji:{ fontSize: 30 },
  h2hPlayerName: { color: '#FFF', fontSize: 15, fontWeight: '700', marginBottom: 5 },
  h2hBadge:     { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1 },
  h2hBadgeText: { fontSize: 11, fontWeight: '700' },
  h2hVs:        { color: 'rgba(255,255,255,0.2)', fontSize: 18, fontWeight: '800' },

  h2hStatRow:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  h2hStatVal:  { color: 'rgba(255,255,255,0.5)', fontSize: 18, fontWeight: '800', flex: 1, textAlign: 'center' },
  h2hStatLabel:{ color: 'rgba(255,255,255,0.25)', fontSize: 12, fontWeight: '600', flex: 1, textAlign: 'center' },

  h2hWeekTitle: { color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginTop: 16, marginBottom: 10 },
  h2hWeekRow:   { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  h2hDayCol:    { flex: 1, alignItems: 'center', gap: 6 },
  h2hDot:       { width: 10, height: 10, borderRadius: 5 },
  h2hDayLabel:  { color: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: '600' },
  h2hLegendRow: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 16 },
  h2hLegendItem:{ flexDirection: 'row', alignItems: 'center', gap: 5 },
  h2hLegendDot: { width: 8, height: 8, borderRadius: 4 },
  h2hLegendText:{ color: 'rgba(255,255,255,0.3)', fontSize: 12 },

  verdict:     { borderRadius: 14, padding: 12, alignItems: 'center', borderWidth: 1, marginBottom: 16 },
  verdictText: { fontSize: 14, fontWeight: '700', textAlign: 'center' },
  closeBtn:    { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  closeBtnText:{ color: 'rgba(255,255,255,0.35)', fontSize: 15, fontWeight: '600' },
});