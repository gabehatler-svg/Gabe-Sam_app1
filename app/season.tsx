import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function SeasonScreen() {
  const league = "Bronze League";
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const standings = [
    { name: "Sam", points: 6 },
    { name: "Gabe", points: 4 },
    { name: "Jake", points: 2 },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Weekly Season</Text>
      <Text style={styles.league}>{league}</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Season Format</Text>
        <Text style={styles.description}>
          Each day = 1 game.
          Lowest screen time wins the day.
          Sunday night crowns the Season Champion.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>This Week's Games</Text>
        <View style={styles.daysRow}>
          {days.map((day, index) => (
            <View key={index} style={styles.dayBadge}>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Standings</Text>
        {standings.map((player, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.name}>{player.name}</Text>
            <Text style={styles.points}>{player.points} pts</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>League Rules</Text>
        <Text style={styles.description}>
          🥇 Winner moves up a tier
          {"\n"}➖ Middle stays
          {"\n"}🔻 Last place drops a tier
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    paddingTop: 60,
  },

  header: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
  },

  league: {
    color: "#22c55e",
    marginTop: 6,
    marginBottom: 25,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 22,
    marginBottom: 20,
  },

  sectionTitle: {
    color: "#fff",
    fontWeight: "600",
    marginBottom: 12,
  },

  description: {
    color: "#aaa",
    lineHeight: 20,
  },

  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dayBadge: {
    backgroundColor: "#1f1f1f",
    padding: 10,
    borderRadius: 12,
  },

  dayText: {
    color: "#fff",
  },

  row: {
    flexDirection: "row",
    marginBottom: 12,
  },

  rank: {
    color: "#22c55e",
    width: 30,
    fontWeight: "700",
  },

  name: {
    color: "#fff",
    flex: 1,
  },

  points: {
    color: "#ccc",
  },
});