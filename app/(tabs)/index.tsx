import { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CREATE_STEPS = [
  {
    title: "Name your league",
    subtitle: "Give your crew a name. This is what everyone will see each season.",
    placeholder: "e.g. The Boys, Squad Goals...",
    suggestions: ["The Boys", "Grind Season", "No Phone Zone", "Touch Grass FC"],
  },
  {
    title: "Invite your crew",
    subtitle: "Add friends to your league so you can compete together.",
    placeholder: "Search friends...",
    suggestions: [],
  },
  {
    title: "Set the rules",
    subtitle: "Customize how your league runs each season.",
    placeholder: "",
    suggestions: [],
  },
];

const leaderboard = [
  { rank: 1, name: "Alex", pts: 520, emoji: "🧢", crown: true },
  { rank: 2, name: "Gabe (you)", pts: 340, emoji: "⭐", you: true },
  { rank: 3, name: "Jordan", pts: 290, emoji: "🎸" },
  { rank: 4, name: "Sam", pts: 210, emoji: "🎮" },
  { rank: 5, name: "Tyler", pts: 160, emoji: "🏀" },
];

const MAX_PTS = 520;

export default function HomeScreen() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0);
  const [leagueName, setLeagueName] = useState("");

  const openModal = () => {
    setStep(0);
    setLeagueName("");
    setShowModal(true);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={openModal} style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <Text style={styles.avatarPlus}>+</Text>
              </View>
              <Text style={styles.avatarLabel}>create new league</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.leagueName}>The Boys</Text>
              <View style={styles.headerMeta}>
                <View style={styles.seasonBadge}>
                  <Text style={styles.seasonText}>Season 7</Text>
                </View>
                <Text style={styles.timerText}>⏱ 3d left</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.badge}>
              <Text style={styles.badgeTextYellow}>⚡ 340</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeTextBlue}>💎 12</Text>
            </View>
          </View>
        </View>

        {/* Stats Card */}
        <View style={styles.card}>
          <View style={styles.statsTop}>
            <View style={styles.statsLeft}>
              <View style={styles.starCircle}>
                <Text style={{ fontSize: 20 }}>⭐</Text>
              </View>
              <View>
                <Text style={styles.rankText}>You · #2 in league</Text>
                <Text style={styles.silverText}>🥈 Silver</Text>
              </View>
            </View>
            <View style={styles.statsRight}>
              <Text style={styles.bigPts}>340</Text>
              <Text style={styles.ptsLabel}>pts today</Text>
            </View>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.earned}>+90</Text>
              <Text style={styles.statLabel}>EARNED</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.lost}>-40</Text>
              <Text style={styles.statLabel}>LOST</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.season}>1420</Text>
              <Text style={styles.statLabel}>SEASON</Text>
            </View>
          </View>
        </View>

        {/* Leaderboard */}
        <View style={[styles.card, { marginTop: 12 }]}>
          <View style={styles.lbHeader}>
            <Text style={styles.lbTitle}>Leaderboard</Text>
            <View style={styles.lbTabs}>
              <View style={styles.lbTabActive}>
                <Text style={styles.lbTabActiveText}>Today</Text>
              </View>
              <View style={styles.lbTabInactive}>
                <Text style={styles.lbTabInactiveText}>Season</Text>
              </View>
            </View>
          </View>

          {leaderboard.map((p) => (
            <View
              key={p.rank}
              style={[
                styles.lbRow,
                p.crown && styles.lbRowCrown,
                p.you && styles.lbRowYou,
              ]}
            >
              {p.crown ? (
                <Text style={{ fontSize: 22, width: 30 }}>👑</Text>
              ) : (
                <Text style={styles.lbRank}>#{p.rank}</Text>
              )}
              <View style={styles.lbAvatar}>
                <Text style={{ fontSize: 18 }}>{p.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.lbName, p.you && { color: "#22c55e" }]}>{p.name}</Text>
                <View style={styles.barBg}>
                  <View style={[styles.barFill, { width: `${(p.pts / MAX_PTS) * 100}%` as any }]} />
                </View>
              </View>
              <Text style={{ fontSize: 14, marginHorizontal: 6 }}>
                {p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : "🥉"}
              </Text>
              <View style={{ alignItems: "flex-end", minWidth: 50 }}>
                <Text style={[styles.lbPts, p.crown && { color: "#facc15" }]}>{p.pts}</Text>
                <Text style={styles.ptsSmall}>PTS</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.activityTitle}>Today's Activity</Text>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        {[
          { icon: "🏠", label: "Home", active: true },
          { icon: "👥", label: "Friends" },
          { icon: "🏪", label: "Shop" },
          { icon: "👤", label: "Profile" },
          { icon: "📊", label: "Stats" },
        ].map((item) => (
          <TouchableOpacity key={item.label} style={styles.navItem}>
            <Text style={{ fontSize: 22 }}>{item.icon}</Text>
            <Text style={[styles.navLabel, item.active && { color: "#22c55e" }]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Create League Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalSheet}>
            {/* Step indicators */}
            <View style={styles.stepRow}>
              <View style={styles.stepDots}>
                {CREATE_STEPS.map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.stepDot,
                      i <= step && styles.stepDotActive,
                      i === step && { width: 32 },
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.stepLabel}>Step {step + 1} of {CREATE_STEPS.length}</Text>
            </View>

            <Text style={styles.modalTrophy}>🏆</Text>
            <Text style={styles.modalTitle}>{CREATE_STEPS[step].title}</Text>
            <Text style={styles.modalSubtitle}>{CREATE_STEPS[step].subtitle}</Text>

            {step === 0 && (
              <>
                <TextInput
                  value={leagueName}
                  onChangeText={(t) => setLeagueName(t.slice(0, 30))}
                  placeholder={CREATE_STEPS[0].placeholder}
                  placeholderTextColor="#444"
                  style={styles.input}
                  maxLength={30}
                />
                <Text style={styles.charCount}>{leagueName.length}/30</Text>
                <View style={styles.suggestions}>
                  {CREATE_STEPS[0].suggestions.map((s) => (
                    <TouchableOpacity key={s} onPress={() => setLeagueName(s)} style={styles.chip}>
                      <Text style={styles.chipText}>{s}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {step === 1 && (
              <Text style={styles.stepPlaceholder}>Share your invite link or search for friends to add.</Text>
            )}

            {step === 2 && (
              <Text style={styles.stepPlaceholder}>Choose season length, scoring rules, and more.</Text>
            )}

            <TouchableOpacity
              style={styles.continueBtn}
              onPress={() => {
                if (step < CREATE_STEPS.length - 1) setStep(step + 1);
                else setShowModal(false);
              }}
            >
              <Text style={styles.continueBtnText}>
                {step < CREATE_STEPS.length - 1 ? "Continue →" : "Create League 🎉"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0d1117" },
  container: { flex: 1, backgroundColor: "#0d1117" },

  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, paddingTop: 12 },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarWrapper: { alignItems: "center", gap: 4 },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: "#1e2530", borderWidth: 2, borderColor: "#3b8df1",
    alignItems: "center", justifyContent: "center",
  },
  avatarPlus: { fontSize: 28, color: "#3b8df1", fontWeight: "300", lineHeight: 32 },
  avatarLabel: { color: "#3b8df1", fontSize: 9, fontWeight: "600", textAlign: "center" },
  leagueName: { color: "#fff", fontSize: 22, fontWeight: "800" },
  headerMeta: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 2 },
  seasonBadge: { backgroundColor: "#22c55e", borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  seasonText: { color: "#000", fontSize: 11, fontWeight: "700" },
  timerText: { color: "#aaa", fontSize: 12 },
  headerRight: { flexDirection: "row", gap: 8 },
  badge: { backgroundColor: "#1e2530", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  badgeTextYellow: { color: "#facc15", fontWeight: "700" },
  badgeTextBlue: { color: "#38bdf8", fontWeight: "700" },

  card: { marginHorizontal: 16, backgroundColor: "#161d27", borderRadius: 16, padding: 16 },
  statsTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  statsLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  starCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#1e2a3a", alignItems: "center", justifyContent: "center" },
  rankText: { color: "#22c55e", fontWeight: "700", fontSize: 13 },
  silverText: { color: "#aaa", fontSize: 12, marginTop: 2 },
  statsRight: { alignItems: "flex-end" },
  bigPts: { color: "#fff", fontSize: 36, fontWeight: "900" },
  ptsLabel: { color: "#aaa", fontSize: 12 },
  statsDivider: { height: 1, backgroundColor: "#1e2c3d", marginVertical: 14 },
  statsRow: { flexDirection: "row", justifyContent: "space-around" },
  statItem: { alignItems: "center" },
  earned: { color: "#22c55e", fontWeight: "700", fontSize: 18 },
  lost: { color: "#f87171", fontWeight: "700", fontSize: 18 },
  season: { color: "#22c55e", fontWeight: "700", fontSize: 18 },
  statLabel: { color: "#666", fontSize: 11, marginTop: 2 },

  lbHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  lbTitle: { color: "#fff", fontSize: 20, fontWeight: "800" },
  lbTabs: { flexDirection: "row", backgroundColor: "#0d1117", borderRadius: 20, overflow: "hidden" },
  lbTabActive: { backgroundColor: "#22c55e", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  lbTabActiveText: { color: "#000", fontWeight: "700", fontSize: 13 },
  lbTabInactive: { paddingHorizontal: 14, paddingVertical: 6 },
  lbTabInactiveText: { color: "#666", fontSize: 13 },

  lbRow: { flexDirection: "row", alignItems: "center", gap: 10, padding: 10, borderRadius: 12, marginBottom: 6, borderWidth: 1, borderColor: "transparent" },
  lbRowCrown: { backgroundColor: "rgba(234,179,8,0.12)", borderColor: "rgba(234,179,8,0.35)" },
  lbRowYou: { backgroundColor: "rgba(34,197,94,0.12)", borderColor: "rgba(34,197,94,0.35)" },
  lbRank: { color: "#666", fontWeight: "700", width: 28 },
  lbAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#1e2a3a", alignItems: "center", justifyContent: "center" },
  lbName: { color: "#fff", fontWeight: "700", fontSize: 15 },
  barBg: { height: 4, backgroundColor: "#0d1117", borderRadius: 2, marginTop: 4, overflow: "hidden" },
  barFill: { height: "100%", backgroundColor: "#22c55e", borderRadius: 2 },
  lbPts: { color: "#fff", fontWeight: "800", fontSize: 18 },
  ptsSmall: { color: "#666", fontSize: 10 },

  activityTitle: { color: "#fff", fontWeight: "800", fontSize: 18, padding: 16 },

  bottomNav: {
    flexDirection: "row", justifyContent: "space-around",
    backgroundColor: "#0d1117", borderTopWidth: 1, borderTopColor: "#1a2030",
    paddingTop: 10, paddingBottom: 20,
  },
  navItem: { alignItems: "center", gap: 4 },
  navLabel: { color: "#666", fontSize: 11 },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.75)", justifyContent: "flex-end" },
  modalSheet: {
    backgroundColor: "#0d1117", borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 48,
  },
  stepRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 28 },
  stepDots: { flexDirection: "row", gap: 6 },
  stepDot: { height: 8, width: 8, borderRadius: 4, backgroundColor: "#1e2a3a" },
  stepDotActive: { backgroundColor: "#22c55e" },
  stepLabel: { color: "#666", fontSize: 13 },
  modalTrophy: { fontSize: 52, textAlign: "center", marginBottom: 14 },
  modalTitle: { color: "#fff", fontSize: 26, fontWeight: "900", textAlign: "center", marginBottom: 10 },
  modalSubtitle: { color: "#666", fontSize: 15, textAlign: "center", lineHeight: 22, marginBottom: 24 },

  input: {
    backgroundColor: "#161d27", borderRadius: 14, padding: 16,
    color: "#fff", fontSize: 16, marginBottom: 6,
  },
  charCount: { color: "#444", fontSize: 12, textAlign: "right", marginBottom: 16 },
  suggestions: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 24 },
  chip: { backgroundColor: "#161d27", borderWidth: 1, borderColor: "#1e2a3a", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8 },
  chipText: { color: "#fff", fontSize: 14 },
  stepPlaceholder: { color: "#666", fontSize: 15, textAlign: "center", marginBottom: 28 },

  continueBtn: { backgroundColor: "#22c55e", borderRadius: 14, padding: 18, alignItems: "center" },
  continueBtnText: { color: "#000", fontSize: 17, fontWeight: "800" },
});