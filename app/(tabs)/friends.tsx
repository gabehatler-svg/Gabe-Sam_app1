import { StyleSheet, Text, View } from 'react-native';

export default function FriendsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Friends coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});