import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FriendsScreen() {
  const friends = [
    { name: "Sam", screenTime: "2h 58m" },
    { name: "Jake", screenTime: "3h 12m" },
    { name: "Emma", screenTime: "4h 45m" },
  ];

  const winner = friends[0];
  const currentLeague = "Bronze League";

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Friends</Text>
          <Text style={styles.subheader}>Today’s Leaderboard</Text>
        </View>

        {/* League Status Card */}
        <View style={styles.leagueCard}>
          <Text style={styles.leagueLabel}>Current Tier</Text>
          <Text style={styles.leagueName}>{currentLeague}</Text>
          <Text style={styles.leagueDescription}>
            Win this week to move up. Last place drops.
          </Text>
        </View>

        {/* Winner Card */}
        <View style={styles.winnerCard}>
          <Text style={styles.winnerLabel}>🏆 Lowest Screen Time Today</Text>
          <Text style={styles.winnerName}>{winner.name}</Text>
          <Text style={styles.winnerTime}>{winner.screenTime}</Text>
        </View>

        {/* Leaderboard */}
        <Text style={styles.sectionTitle}>All Friends</Text>

        {friends.map((friend, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.name}>{friend.name}</Text>
            <Text style={styles.time}>{friend.screenTime}</Text>
          </View>
        ))}

        {/* Season + Chat Buttons */}
        <View style={styles.buttonSection}>

          <TouchableOpacity
            style={styles.seasonButton}
            onPress={() => router.push("/season")}
          >
            <Text style={styles.seasonButtonText}>
              View Weekly Season
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => router.push("/chat")}
          >
            <Text style={styles.chatButtonText}>
              League Chat
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },

  headerContainer: {
    marginTop: 70,
    marginBottom: 30,
  },

  header: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },

  subheader: {
    color: "#777",
    marginTop: 6,
  },

  leagueCard: {
    backgroundColor: "#111",
    padding: 22,
    borderRadius: 26,
    marginBottom: 25,
  },

  leagueLabel: {
    color: "#888",
    fontSize: 13,
  },

  leagueName: {
    color: "#22c55e",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 4,
  },

  leagueDescription: {
    color: "#666",
    marginTop: 6,
    fontSize: 13,
  },

  winnerCard: {
    backgroundColor: "#0f172a",
    padding: 24,
    borderRadius: 28,
    marginBottom: 35,
  },

  winnerLabel: {
    color: "#94a3b8",
    fontSize: 13,
    marginBottom: 8,
  },

  winnerName: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },

  winnerTime: {
    color: "#22c55e",
    fontSize: 20,
    marginTop: 4,
    fontWeight: "600",
  },

  sectionTitle: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 15,
    letterSpacing: 1,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
  },

  rank: {
    color: "#22c55e",
    fontWeight: "700",
    width: 30,
  },

  name: {
    color: "#fff",
    flex: 1,
    fontSize: 16,
  },

  time: {
    color: "#ccc",
    fontSize: 15,
  },

  buttonSection: {
    marginTop: 30,
    marginBottom: 40,
    gap: 14,
  },

  seasonButton: {
    backgroundColor: "#1f1f1f",
    padding: 18,
    borderRadius: 24,
    alignItems: "center",
  },

  seasonButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  chatButton: {
    backgroundColor: "#22c55e",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
  },

  chatButtonText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
});