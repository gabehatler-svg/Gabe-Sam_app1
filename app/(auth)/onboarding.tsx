import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

type Slide = {
  key: string;
  emoji: string;
  title: string;
  subtitle: string;
};

const ACCENT = "#6C73FF";
const BG = "#0B0C10";
const MUTED = "#8A8F9B";
const WHITE = "#FFFFFF";

const slides: Slide[] = [
  {
    key: "1",
    emoji: "🧠",
    title: "Your mind wasn’t built\nfor constant stimulation.",
    subtitle: "Endless content.\nNo mental space.",
  },
  {
    key: "2",
    emoji: "📱",
    title: "Scrolling isn’t rest.",
    subtitle:
      "It feels relaxing.\nBut your brain never powers down.",
  },
  {
    key: "3",
    emoji: "🛡️",
    title: "Use your phone\non purpose.",
    subtitle:
      "Pause before opening apps.\nChoose how you spend your time.",
  },
  {
    key: "4",
    emoji: "📊",
    title: "See where your time goes.",
    subtitle:
      "Daily totals.\nWeekly trends.\nReal clarity.",
  },
  {
    key: "5",
    emoji: "🏆",
    title: "Make discipline a game.",
    subtitle:
      "Compete with friends.\nLess screen time wins.",
  },
  {
    key: "6",
    emoji: "⏳",
    title: "Take your time back.",
    subtitle:
      "Start free today.\nUpgrade anytime.",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex === slides.length - 1) {
      router.replace("/login");
      return;
    }

    flatListRef.current?.scrollToIndex({
      index: currentIndex + 1,
      animated: true,
    });
  };

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / width
    );
    setCurrentIndex(slideIndex);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.skip}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index
                  ? styles.activeDot
                  : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1
              ? "Start Free"
              : "Next"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  skip: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    color: ACCENT,
    fontSize: 16,
    fontWeight: "600",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  emojiContainer: {
    width: 130,
    height: 130,
    borderRadius: 30,
    backgroundColor: "#141720",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  emoji: {
    fontSize: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: WHITE,
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: MUTED,
    textAlign: "center",
    lineHeight: 26,
  },
  footer: {
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 999,
  },
  activeDot: {
    width: 40,
    backgroundColor: ACCENT,
  },
  inactiveDot: {
    width: 28,
    backgroundColor: "#3A3F4B",
  },
  button: {
    backgroundColor: ACCENT,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: "700",
  },
});