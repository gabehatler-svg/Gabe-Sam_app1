import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FriendsScreen() {
  const friends = [
    { name: "Sam", screenTime: "2h 58m" },
    { name: "Jake", screenTime: "3h 12m" },
    { name: "Emma", screenTime: "4h 45m" },
  ];

  const winner = friends[0];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Friends</Text>
          <Text style={styles.subheader}>Today’s Leaderboard</Text>
        </View>

        {/* Winner Card */}
        <View style={styles.winnerCard}>
          <Text style={styles.winnerLabel}>🏆 Lowest Screen Time Today</Text>
          <Text style={styles.winnerName}>{winner.name}</Text>
          <Text style={styles.winnerTime}>{winner.screenTime}</Text>
        </View>

        {/* Leaderboard List */}
        <Text style={styles.sectionTitle}>All Friends</Text>

        {friends.map((friend, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.name}>{friend.name}</Text>
            <Text style={styles.time}>{friend.screenTime}</Text>
          </View>
        ))}

      </ScrollView>

      {/* Add Friend Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Invite Friend</Text>
      </TouchableOpacity>
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

  addButton: {
    backgroundColor: "#22c55e",
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 30,
  },

  addButtonText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
});