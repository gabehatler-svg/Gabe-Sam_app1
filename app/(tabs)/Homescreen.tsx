import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();

  // Temporary mock data (we'll replace with real data later)
  const todaysScreenTime = 3.4; // hours
  const dailyGoal = 2; // hours
  const progress = Math.min(todaysScreenTime / dailyGoal, 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ScreenTime</Text>

      {/* Daily Summary Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Screen Time</Text>
        <Text style={styles.timeText}>{todaysScreenTime} hrs</Text>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>

        <Text style={styles.goalText}>
          Goal: {dailyGoal} hrs
        </Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/statistics")}
      >
        <Text style={styles.primaryButtonText}>View My Statistics</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push("/friends")}
      >
        <Text style={styles.secondaryButtonText}>Compete With Friends</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    padding: 24,
    paddingTop: 60,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#1C1C1E",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  cardTitle: {
    color: "#A0A0A0",
    fontSize: 16,
    marginBottom: 8,
  },
  timeText: {
    color: "white",
    fontSize: 40,
    fontWeight: "700",
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#2C2C2E",
    borderRadius: 10,
    marginTop: 15,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 10,
    backgroundColor: "#4CD964",
  },
  goalText: {
    color: "#A0A0A0",
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: "#4CD964",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 15,
  },
  primaryButtonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "#2C2C2E",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});