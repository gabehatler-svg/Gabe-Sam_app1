import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();

  // Mock data (we’ll replace later with real tracking)
  const todayHours = 3.2;
  const goalHours = 2;
  const streak = 4;

  const progress = Math.min(todayHours / goalHours, 1);

  return (
    <View style={styles.container}>
      {/* App Title */}
      <Text style={styles.appTitle}>ScreenTime</Text>

      {/* Daily Card */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Today's Usage</Text>
        <Text style={styles.bigNumber}>{todayHours} hrs</Text>

        <View style={styles.progressBackground}>
          <View
            style={[styles.progressFill, { width: `${progress * 100}%` }]}
          />
        </View>

        <Text style={styles.goalText}>
          Goal: {goalHours} hrs
        </Text>
      </View>

      {/* Streak Card */}
      <View style={styles.streakCard}>
        <Text style={styles.streakNumber}>{streak}</Text>
        <Text style={styles.streakText}>Day Focus Streak 🔥</Text>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/friends")}
      >
        <Text style={styles.primaryButtonText}>
          Compete With Friends
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push("/statistics")}
      >
        <Text style={styles.secondaryButtonText}>
          View My Statistics
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F12",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  appTitle: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#1C1C21",
    borderRadius: 22,
    padding: 22,
    marginBottom: 25,
  },
  cardLabel: {
    color: "#8E8E93",
    fontSize: 15,
  },
  bigNumber: {
    color: "white",
    fontSize: 42,
    fontWeight: "700",
    marginVertical: 10,
  },
  progressBackground: {
    height: 10,
    backgroundColor: "#2C2C34",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 5,
  },
  progressFill: {
    height: 10,
    backgroundColor: "#4CD964",
  },
  goalText: {
    color: "#8E8E93",
    marginTop: 10,
  },
  streakCard: {
    backgroundColor: "#1C1C21",
    borderRadius: 22,
    padding: 22,
    marginBottom: 30,
    alignItems: "center",
  },
  streakNumber: {
    color: "#4CD964",
    fontSize: 36,
    fontWeight: "700",
  },
  streakText: {
    color: "white",
    marginTop: 5,
  },
  primaryButton: {
    backgroundColor: "#4CD964",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 15,
  },
  primaryButtonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "#2C2C34",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});