import { StyleSheet, Text, View } from "react-native";

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>League Chat</Text>
      <Text style={styles.subtitle}>
        Trash talk responsibly.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    paddingTop: 70,
  },

  header: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  subtitle: {
    color: "#888",
    marginTop: 10,
  },
});