import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function LeagueChat() {
  const [message, setMessage] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Bronze League Chat</Text>

      <ScrollView style={styles.chatContainer}>
        <View style={styles.messageBubble}>
          <Text style={styles.username}>Jake</Text>
          <Text style={styles.message}>Bro 3h 12m today… I’m slipping 😭</Text>
        </View>

        <View style={styles.messageBubble}>
          <Text style={styles.username}>Emma</Text>
          <Text style={styles.message}>No excuses. Screen time grind 💪</Text>
        </View>

        <View style={styles.messageBubble}>
          <Text style={styles.username}>Sam</Text>
          <Text style={styles.message}>2h 58m 😎 staying locked in.</Text>
        </View>
      </ScrollView>

      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        placeholderTextColor="#aaa"
        value={message}
        onChangeText={setMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    color: "#2ecc71",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  chatContainer: {
    flex: 1,
  },
  messageBubble: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  username: {
    color: "#2ecc71",
    fontWeight: "bold",
  },
  message: {
    color: "white",
  },
  input: {
    backgroundColor: "#111",
    color: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
});