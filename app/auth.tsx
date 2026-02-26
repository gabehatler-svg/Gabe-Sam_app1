import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen = 'onboarding' | 'login' | 'phone' | 'verify' | 'username';

// ─── Onboarding Data ──────────────────────────────────────────────────────────
const SLIDES = [
  {
    emoji: '📵',
    title: 'Win by\nputting it down.',
    sub: 'Zone turns your screen time into a competition. Less time on bad apps = more points.',
    accent: '#A8FF78',
    bg: 'rgba(168,255,120,0.06)',
  },
  {
    emoji: '🏆',
    title: 'Seasons.\nLeagues. Rivals.',
    sub: 'Every week is a new season. Create a league with friends and compete for the crown every Sunday.',
    accent: '#FFD700',
    bg: 'rgba(255,215,0,0.06)',
  },
  {
    emoji: '💎',
    title: 'Earn gems.\nFlex on everyone.',
    sub: 'Win seasons to earn gems. Spend them on cosmetics, frames, and victory animations.',
    accent: '#88EEFF',
    bg: 'rgba(136,238,255,0.06)',
  },
];

const AVATARS = ['⭐', '🧢', '🎸', '🎮', '🏀', '🦊', '🧘', '🐉', '🥷', '🎯', '🏄', '🌸'];

// ─── Onboarding ───────────────────────────────────────────────────────────────
function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const [slide, setSlide] = useState(0);
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const animateIn = () => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.85);
    slideAnim.setValue(30);
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 7, tension: 80, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  };

  useEffect(() => { animateIn(); }, [slide]);

  const current = SLIDES[slide];
  const isLast  = slide === SLIDES.length - 1;

  return (
    <View style={[styles.root, { backgroundColor: '#080810' }]}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.flex}>
        <TouchableOpacity style={styles.skipBtn} onPress={onDone}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <Animated.View style={[styles.slideContent, { opacity: fadeAnim, transform: [{ scale: scaleAnim }, { translateY: slideAnim }] }]}>
          <View style={[styles.glowBlob, { backgroundColor: current.bg }]} />
          <Text style={styles.slideEmoji}>{current.emoji}</Text>
          <Text style={[styles.slideTitle, { color: current.accent }]}>{current.title}</Text>
          <Text style={styles.slideSub}>{current.sub}</Text>
        </Animated.View>

        <View style={styles.slideBottom}>
          <View style={styles.dots}>
            {SLIDES.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dotBase,
                  i === slide
                    ? [styles.dotActive, { backgroundColor: current.accent }]
                    : styles.dotInactive,
                ]}
              />
            ))}
          </View>
          <TouchableOpacity
            style={[styles.nextBtn, { backgroundColor: current.accent }]}
            onPress={() => isLast ? onDone() : setSlide(s => s + 1)}
          >
            <Text style={styles.nextBtnText}>
              {isLast ? "Let's go 🚀" : 'Next →'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ onApple, onGoogle, onPhone }: {
  onApple: () => void; onGoogle: () => void; onPhone: () => void;
}) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.flex}>
        <Animated.View style={[styles.loginWrap, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.logoWrap}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>📵</Text>
            </View>
            <Text style={styles.logoTitle}>Zone</Text>
            <Text style={styles.logoSub}>Win by putting it down.</Text>
          </View>

          <View style={styles.authButtons}>
            <TouchableOpacity style={styles.authBtn} onPress={onApple}>
              <Text style={styles.authBtnIcon}>🍎</Text>
              <Text style={styles.authBtnText}>Continue with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.authBtn, styles.authBtnGoogle]} onPress={onGoogle}>
              <Text style={[styles.authBtnIcon, { fontWeight: '800', color: '#FFF' }]}>G</Text>
              <Text style={styles.authBtnText}>Continue with Google</Text>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={[styles.authBtn, styles.authBtnPhone]} onPress={onPhone}>
              <Text style={styles.authBtnIcon}>📱</Text>
              <Text style={[styles.authBtnText, { color: '#A8FF78' }]}>Continue with Phone</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.legalText}>
            By continuing you agree to our{' '}
            <Text style={styles.legalLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.legalLink}>Privacy Policy</Text>
          </Text>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

// ─── Phone ────────────────────────────────────────────────────────────────────
function PhoneScreen({ onBack, onSend }: { onBack: () => void; onSend: (phone: string) => void }) {
  const [phone, setPhone] = useState('');
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const formatted = phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  const isValid   = phone.replace(/\D/g, '').length === 10;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Animated.View style={[styles.stepWrap, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <Text style={styles.backBtnText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.stepEmoji}>📱</Text>
            <Text style={styles.stepTitle}>What's your number?</Text>
            <Text style={styles.stepSub}>We'll send you a verification code. No spam, ever.</Text>

            <View style={styles.phoneInputRow}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>🇺🇸 +1</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="(555) 000-0000"
                placeholderTextColor="rgba(255,255,255,0.2)"
                value={formatted}
                onChangeText={t => setPhone(t.replace(/\D/g, '').slice(0, 10))}
                keyboardType="phone-pad"
                autoFocus
              />
            </View>

            <TouchableOpacity
              style={[styles.primaryBtn, !isValid && styles.primaryBtnDisabled]}
              onPress={() => isValid && onSend(`+1 ${formatted}`)}
              disabled={!isValid}
            >
              <Text style={[styles.primaryBtnText, !isValid && { color: 'rgba(8,8,16,0.4)' }]}>
                Send Code
              </Text>
            </TouchableOpacity>
            <Text style={styles.phoneLegal}>Standard message rates may apply.</Text>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

// ─── Verify ───────────────────────────────────────────────────────────────────
function VerifyScreen({ phone, onBack, onVerify }: {
  phone: string; onBack: () => void; onVerify: () => void;
}) {
  const [code, setCode]   = useState(['', '', '', '', '', '']);
  const [resent, setResent] = useState(false);
  const inputRefs   = useRef<(TextInput | null)[]>([]);
  const shakeAnim   = useRef(new Animated.Value(0)).current;
  const fadeAnim    = useRef(new Animated.Value(0)).current;
  const slideAnim   = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
    setTimeout(() => inputRefs.current[0]?.focus(), 400);
  }, []);

  const handleChange = (val: string, i: number) => {
    const newCode = [...code];
    newCode[i] = val.slice(-1);
    setCode(newCode);
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
    if (newCode.every(d => d !== '')) {
      if (newCode.join('') === '123456') {
        setTimeout(onVerify, 300);
      } else {
        Animated.sequence([
          Animated.timing(shakeAnim, { toValue: 10,  duration: 60, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 6,   duration: 60, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: -6,  duration: 60, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 0,   duration: 60, useNativeDriver: true }),
        ]).start();
        setCode(['', '', '', '', '', '']);
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      }
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Animated.View style={[styles.stepWrap, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <Text style={styles.backBtnText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.stepEmoji}>🔐</Text>
            <Text style={styles.stepTitle}>Check your texts</Text>
            <Text style={styles.stepSub}>
              We sent a 6-digit code to{'\n'}
              <Text style={{ color: '#FFF', fontWeight: '700' }}>{phone}</Text>
            </Text>

            <Animated.View style={[styles.codeRow, { transform: [{ translateX: shakeAnim }] }]}>
              {code.map((digit, i) => (
                <TextInput
                  key={i}
                  ref={r => { inputRefs.current[i] = r; }}
                  style={[styles.codeBox, digit !== '' && styles.codeBoxFilled]}
                  value={digit}
                  onChangeText={val => handleChange(val, i)}
                  keyboardType="number-pad"
                  maxLength={1}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace' && !code[i] && i > 0) {
                      inputRefs.current[i - 1]?.focus();
                    }
                  }}
                />
              ))}
            </Animated.View>

            <Text style={styles.codeHint}>Hint: use 123456 to continue</Text>

            <TouchableOpacity style={[styles.primaryBtn, { marginTop: 10 }]} onPress={onVerify}>
              <Text style={styles.primaryBtnText}>Verify →</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resendBtn} onPress={() => { setResent(true); setTimeout(() => setResent(false), 3000); }}>
              <Text style={styles.resendText}>{resent ? '✓ Code resent!' : "Didn't get it? Resend"}</Text>
            </TouchableOpacity>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

// ─── Username ─────────────────────────────────────────────────────────────────
function UsernameScreen({ onDone }: { onDone: () => void }) {
  const [username, setUsername]     = useState('');
  const [selectedAvatar, setAvatar] = useState('⭐');
  const [checking, setChecking]     = useState(false);
  const [available, setAvailable]   = useState<boolean | null>(null);
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const checkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleUsername = (val: string) => {
    const clean = val.toLowerCase().replace(/[^a-z0-9_.]/g, '').slice(0, 20);
    setUsername(clean);
    setAvailable(null);
    if (checkTimer.current) clearTimeout(checkTimer.current);
    if (clean.length >= 3) {
      setChecking(true);
      checkTimer.current = setTimeout(() => {
        const taken = ['gabe', 'alex', 'admin', 'zone'];
        setAvailable(!taken.includes(clean));
        setChecking(false);
      }, 800);
    } else {
      setChecking(false);
    }
  };

  const canContinue = username.length >= 3 && available === true;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={styles.stepWrap} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
              <Text style={styles.stepEmoji}>{selectedAvatar}</Text>
              <Text style={styles.stepTitle}>Set up your profile</Text>
              <Text style={styles.stepSub}>Pick your avatar and username. This is how your rivals will know you.</Text>

              <Text style={styles.pickerLabel}>CHOOSE YOUR AVATAR</Text>
              <View style={styles.avatarGrid}>
                {AVATARS.map(av => (
                  <TouchableOpacity
                    key={av}
                    style={[styles.avatarOption, selectedAvatar === av && styles.avatarOptionSelected]}
                    onPress={() => setAvatar(av)}
                  >
                    <Text style={styles.avatarOptionEmoji}>{av}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.pickerLabel}>CHOOSE YOUR USERNAME</Text>
              <View style={styles.usernameRow}>
                <Text style={styles.atSign}>@</Text>
                <TextInput
                  style={styles.usernameInput}
                  placeholder="username"
                  placeholderTextColor="rgba(255,255,255,0.2)"
                  value={username}
                  onChangeText={handleUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {checking                && <Text style={styles.checkingText}>...</Text>}
                {!checking && available === true  && <Text style={styles.availText}>✓</Text>}
                {!checking && available === false && <Text style={styles.takenText}>✕</Text>}
              </View>

              {username.length > 0 && username.length < 3 && (
                <Text style={styles.usernameHint}>At least 3 characters</Text>
              )}
              {available === false && <Text style={styles.usernameTaken}>@{username} is already taken</Text>}
              {available === true  && <Text style={styles.usernameAvail}>@{username} is available!</Text>}

              <TouchableOpacity
                style={[styles.primaryBtn, { marginTop: 28 }, !canContinue && styles.primaryBtnDisabled]}
                onPress={canContinue ? onDone : undefined}
                disabled={!canContinue}
              >
                <Text style={[styles.primaryBtnText, !canContinue && { color: 'rgba(8,8,16,0.4)' }]}>
                  Enter Zone 🚀
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <View style={{ height: 80 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function AuthFlow() {
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [phone, setPhone]   = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const transition = (next: Screen) => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
      setScreen(next);
      Animated.timing(fadeAnim, { toValue: 1, duration: 180, useNativeDriver: true }).start();
    });
  };

  return (
    <Animated.View style={[styles.flex, { opacity: fadeAnim }]}>
      {screen === 'onboarding' && (
        <OnboardingScreen onDone={() => transition('login')} />
      )}
      {screen === 'login' && (
        <LoginScreen
          onApple={() => transition('username')}
          onGoogle={() => transition('username')}
          onPhone={() => transition('phone')}
        />
      )}
      {screen === 'phone' && (
        <PhoneScreen
          onBack={() => transition('login')}
          onSend={p => { setPhone(p); transition('verify'); }}
        />
      )}
      {screen === 'verify' && (
        <VerifyScreen
          phone={phone}
          onBack={() => transition('phone')}
          onVerify={() => transition('username')}
        />
      )}
      {screen === 'username' && (
        <UsernameScreen
          onDone={() => router.replace('/(tabs)')}
        />
      )}
    </Animated.View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root:  { flex: 1, backgroundColor: '#080810' },
  flex:  { flex: 1 },

  skipBtn:   { alignSelf: 'flex-end', paddingHorizontal: 22, paddingTop: 12, paddingBottom: 6 },
  skipText:  { color: 'rgba(255,255,255,0.3)', fontSize: 14, fontWeight: '600' },
  slideContent: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  glowBlob:  { position: 'absolute', width: 300, height: 300, borderRadius: 150, alignSelf: 'center' },
  slideEmoji:{ fontSize: 90, marginBottom: 28 },
  slideTitle:{ fontSize: 38, fontWeight: '900', letterSpacing: -1.2, textAlign: 'center', lineHeight: 44, marginBottom: 18 },
  slideSub:  { color: 'rgba(255,255,255,0.45)', fontSize: 16, textAlign: 'center', lineHeight: 24 },
  slideBottom:{ paddingHorizontal: 24, paddingBottom: 32 },
  dots:      { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 20 },
  dotBase:   { height: 6, borderRadius: 3 },
  dotActive: { width: 24 },
  dotInactive:{ width: 6, backgroundColor: 'rgba(255,255,255,0.15)' },
  nextBtn:   { borderRadius: 18, paddingVertical: 18, alignItems: 'center' },
  nextBtnText:{ color: '#080810', fontSize: 17, fontWeight: '800', letterSpacing: -0.3 },

  loginWrap: { flex: 1, paddingHorizontal: 24, justifyContent: 'space-between', paddingVertical: 20 },
  logoWrap:  { alignItems: 'center', paddingTop: 40 },
  logoCircle:{ width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(168,255,120,0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(168,255,120,0.25)', marginBottom: 16 },
  logoEmoji: { fontSize: 44 },
  logoTitle: { color: '#FFF', fontSize: 38, fontWeight: '900', letterSpacing: -1.2, marginBottom: 6 },
  logoSub:   { color: 'rgba(255,255,255,0.35)', fontSize: 15 },
  authButtons:{ gap: 12, paddingBottom: 10 },
  authBtn:   { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C1C28', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 20, gap: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  authBtnGoogle:{ borderColor: 'rgba(255,255,255,0.12)' },
  authBtnPhone: { borderColor: 'rgba(168,255,120,0.25)', backgroundColor: 'rgba(168,255,120,0.06)' },
  authBtnIcon:{ fontSize: 20, width: 24, textAlign: 'center' },
  authBtnText:{ color: '#FFF', fontSize: 16, fontWeight: '600', flex: 1 },
  dividerRow:{ flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 4 },
  dividerLine:{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.07)' },
  dividerText:{ color: 'rgba(255,255,255,0.25)', fontSize: 13 },
  legalText: { color: 'rgba(255,255,255,0.2)', fontSize: 12, textAlign: 'center', lineHeight: 18, paddingBottom: 8 },
  legalLink: { color: 'rgba(255,255,255,0.4)', textDecorationLine: 'underline' },

  stepWrap:  { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 },
  backBtn:   { marginBottom: 24 },
  backBtnText:{ color: 'rgba(255,255,255,0.35)', fontSize: 14, fontWeight: '600' },
  stepEmoji: { fontSize: 60, textAlign: 'center', marginBottom: 16 },
  stepTitle: { color: '#FFF', fontSize: 30, fontWeight: '800', letterSpacing: -0.8, textAlign: 'center', marginBottom: 10 },
  stepSub:   { color: 'rgba(255,255,255,0.4)', fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 32 },

  phoneInputRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  countryCode:   { backgroundColor: '#1C1C28', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 14, justifyContent: 'center' },
  countryCodeText:{ color: '#FFF', fontSize: 15, fontWeight: '600' },
  phoneInput:    { flex: 1, backgroundColor: '#1C1C28', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', color: '#FFF', fontSize: 18, fontWeight: '600', padding: 16 },
  phoneLegal:    { color: 'rgba(255,255,255,0.2)', fontSize: 12, textAlign: 'center', marginTop: 14 },

  codeRow:      { flexDirection: 'row', gap: 10, justifyContent: 'center', marginBottom: 8 },
  codeBox:      { width: (width - 48 - 50) / 6, aspectRatio: 1, backgroundColor: '#1C1C28', borderRadius: 14, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)', textAlign: 'center', fontSize: 24, fontWeight: '800', color: '#FFF' },
  codeBoxFilled:{ borderColor: '#A8FF78', backgroundColor: 'rgba(168,255,120,0.08)' },
  codeHint:     { color: 'rgba(255,255,255,0.2)', fontSize: 12, textAlign: 'center', marginBottom: 8 },
  resendBtn:    { marginTop: 16, alignItems: 'center' },
  resendText:   { color: 'rgba(168,255,120,0.6)', fontSize: 14, fontWeight: '600' },

  pickerLabel:  { color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginBottom: 12 },
  avatarGrid:   { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 28 },
  avatarOption: { width: (width - 48 - 55) / 6, aspectRatio: 1, backgroundColor: '#1C1C28', borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.07)' },
  avatarOptionSelected: { borderColor: '#A8FF78', backgroundColor: 'rgba(168,255,120,0.1)' },
  avatarOptionEmoji:    { fontSize: 24 },
  usernameRow:  { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C1C28', borderRadius: 14, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 14, marginBottom: 8 },
  atSign:       { color: 'rgba(255,255,255,0.3)', fontSize: 18, fontWeight: '700', marginRight: 4 },
  usernameInput:{ flex: 1, color: '#FFF', fontSize: 18, fontWeight: '600', paddingVertical: 16 },
  checkingText: { color: 'rgba(255,255,255,0.3)', fontSize: 16, paddingRight: 4 },
  availText:    { color: '#A8FF78', fontSize: 18, fontWeight: '800', paddingRight: 4 },
  takenText:    { color: '#FF6B6B', fontSize: 18, fontWeight: '800', paddingRight: 4 },
  usernameHint: { color: 'rgba(255,255,255,0.25)', fontSize: 12, marginBottom: 4 },
  usernameAvail:{ color: '#A8FF78', fontSize: 13, fontWeight: '600' },
  usernameTaken:{ color: '#FF6B6B', fontSize: 13, fontWeight: '600' },

  primaryBtn:        { backgroundColor: '#A8FF78', borderRadius: 16, paddingVertical: 17, alignItems: 'center' },
  primaryBtnDisabled:{ backgroundColor: 'rgba(168,255,120,0.25)' },
  primaryBtnText:    { color: '#080810', fontSize: 16, fontWeight: '800', letterSpacing: -0.3 },
});