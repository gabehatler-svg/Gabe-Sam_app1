import { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type League = "Bronze" | "Silver" | "Gold" | "Diamond";

const leagueColors: Record<League, string> = {
  Bronze: "#cd7f32",
  Silver: "#C0C0C0",
  Gold: "#FFD700",
  Diamond: "#00E5FF",
};

const initialMessages = [
  {
    id: "1",
    username: "Jake",
    league: "Silver" as League,
    text: "I’m cutting down to 2h this week.",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "2",
    username: "Emma",
    league: "Gold" as League,
    text: "Y’all better grind.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "3",
    username: "Sam",
    league: "Bronze" as League,
    text: "2h 58m today 😎",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
];

export default function LeagueChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const currentUser = {
    username: "Sam",
    league: "Bronze" as League,
    avatar: "https://i.pravatar.cc/150?img=8",
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      username: currentUser.username,
      league: currentUser.league,
      text: input,
      avatar: currentUser.avatar,
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  const renderItem = ({ item }: any) => {
    const isCurrentUser = item.username === currentUser.username;

    return (
      <View
        style={[
          styles.messageRow,
          isCurrentUser && { justifyContent: "flex-end" },
        ]}
      >
        {!isCurrentUser && (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        )}

        <View
          style={[
            styles.bubble,
            isCurrentUser
              ? styles.currentUserBubble
              : styles.otherUserBubble,
          ]}
        >
          <Text
            style={[
              styles.username,
              { color: leagueColors[item.league] },
            ]}
          >
            {isCurrentUser ? "Me" : item.username}
          </Text>

          <Text
            style={[
              styles.messageText,
              isCurrentUser && { color: "black" },
            ]}
          >
            {item.text}
          </Text>
        </View>

        {isCurrentUser && (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* 🔥 HEADER TOP LEFT */}
      <View style={styles.header}>
        <Text style={styles.headerText}>League Chats</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message league..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  /* HEADER */
  header: {
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#111",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  headerText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },

  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 15,
    marginVertical: 8,
  },

  avatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
    marginHorizontal: 6,
  },

  bubble: {
    maxWidth: "65%",
    padding: 12,
    borderRadius: 18,
  },

  currentUserBubble: {
    backgroundColor: "#2ecc71",
  },

  otherUserBubble: {
    backgroundColor: "#1a1a1a",
  },

  username: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  messageText: {
    color: "white",
    fontSize: 15,
  },

  inputContainer: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#111",
    backgroundColor: "#000",
  },

  input: {
    flex: 1,
    backgroundColor: "#111",
    color: "white",
    padding: 12,
    borderRadius: 25,
    marginRight: 10,
  },

  sendButton: {
    backgroundColor: "#2ecc71",
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 25,
  },

  sendText: {
    color: "black",
    fontWeight: "bold",
  },
});