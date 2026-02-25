import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const router = useRouter();

  const goToApp = () => {
    router.replace('/(tabs)');
  };

  return (
    <LinearGradient
      colors={['#0F1115', '#181C22']}
      style={styles.container}
    >
      <Text style={styles.appName}>yourappname</Text>

      <View style={styles.logo} />

      <Text style={styles.title}>Reclaim your time</Text>

      <Text style={styles.subtitle}>
        Build healthier digital habits with intentional tracking.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goToApp}>
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={goToApp}>
          <Text style={styles.buttonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={goToApp}>
          <Text style={styles.buttonText}>Continue with Phone</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.bottomText}>
        Already have an account? <Text style={styles.link}>Sign In</Text>
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  appName: {
    position: 'absolute',
    top: 80,
    color: '#E5E7EB',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 1.2,
  },

  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#22D3EE',
    opacity: 0.4,
    marginBottom: 40,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },

  subtitle: {
    color: '#9CA3AF',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 50,
  },

  buttonContainer: {
    width: '100%',
  },

  button: {
    backgroundColor: '#1F2937',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonText: {
    color: '#F3F4F6',
    fontSize: 16,
    fontWeight: '600',
  },

  bottomText: {
    marginTop: 25,
    color: '#9CA3AF',
    fontSize: 14,
  },

  link: {
    color: '#22D3EE',
    fontWeight: '600',
  },
});