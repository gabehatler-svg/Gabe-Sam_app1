import { StyleSheet, Text, View } from "react-native";

export default function Friends() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Compete With Friends</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
  },
});