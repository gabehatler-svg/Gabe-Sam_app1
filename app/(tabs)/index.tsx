import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#4f46e5", "#9333ea", "#ec4899"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.names}>Gabe & Sam 🚀</Text>

          <View style={styles.card}>
            <Text style={styles.cardText}>
              Your app is officially live.
            </Text>
            <Text style={styles.cardSub}>
              Let’s build something awesome.
            </Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "300",
    color: "white",
  },
  names: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 24,
    borderRadius: 20,
    width: "100%",
    marginBottom: 30,
  },
  cardText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
  cardSub: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 8,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: "#9333ea",
    fontSize: 16,
    fontWeight: "bold",
  },
});