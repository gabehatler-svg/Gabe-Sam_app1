import { Slot, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function RootLayout() {
  const [mounted, setMounted] = useState(false);

  // Wait for layout to fully mount before navigating
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Change false → true to skip auth while building
    const isLoggedIn = false;

    if (isLoggedIn) {
      router.replace('/(tabs)');
    } else {
      router.replace('/auth');
    }
  }, [mounted]);

  return (
    <View style={{ flex: 1, backgroundColor: '#080810' }}>
      <Slot />
    </View>
  );
}