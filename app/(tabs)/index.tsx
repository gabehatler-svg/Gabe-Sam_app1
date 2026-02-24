import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome Back 👋</Text>
        <Text style={styles.username}>Gabe</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </View>

      {/* Featured Card */}
      <View style={styles.featuredCard}>
        <Text style={styles.featuredTitle}>🔥 Featured</Text>
        <Text style={styles.featuredText}>
          Build something amazing today.
        </Text>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.actionsContainer}>
        <Pressable style={styles.actionCard}>
          <Ionicons name="person" size={24} color="white" />
          <Text style={styles.actionText}>Profile</Text>
        </Pressable>

        <Pressable style={styles.actionCard}>
          <Ionicons name="settings" size={24} color="white" />
          <Text style={styles.actionText}>Settings</Text>
        </Pressable>

        <Pressable style={styles.actionCard}>
          <Ionicons name="star" size={24} color="white" />
          <Text style={styles.actionText}>Favorites</Text>
        </Pressable>

        <Pressable style={styles.actionCard}>
          <Ionicons name="notifications" size={24} color="white" />
          <Text style={styles.actionText}>Alerts</Text>
        </Pressable>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    color: "#94a3b8",
  },
  username: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 25,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    color: "white",
  },
  featuredCard: {
    backgroundColor: "#4f46e5",
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
  },
  featuredTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  featuredText: {
    color: "white",
    fontSize: 14,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionCard: {
    backgroundColor: "#1e293b",
    width: "48%",
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: "center",
  },
  actionText: {
    color: "white",
    marginTop: 8,
    fontWeight: "500",
  },
});