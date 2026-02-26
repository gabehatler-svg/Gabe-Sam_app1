import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

// ─── Types ────────────────────────────────────────────────────────────────────
type AppCategory = 'detrimental' | 'beneficial';
interface AppItem { id: string; name: string; icon: string; category: AppCategory; selected: boolean; }

// ─── Data ─────────────────────────────────────────────────────────────────────
const SUGGESTED_APPS: AppItem[] = [
  // Detrimental
  { id: 'd1', name: 'TikTok',      icon: '🎵', category: 'detrimental', selected: false },
  { id: 'd2', name: 'Instagram',   icon: '📸', category: 'detrimental', selected: false },
  { id: 'd3', name: 'X (Twitter)', icon: '𝕏',  category: 'detrimental', selected: false },
  { id: 'd4', name: 'Snapchat',    icon: '👻', category: 'detrimental', selected: false },
  { id: 'd5', name: 'YouTube',     icon: '▶️', category: 'detrimental', selected: false },
  { id: 'd6', name: 'Reddit',      icon: '🤖', category: 'detrimental', selected: false },
  { id: 'd7', name: 'Facebook',    icon: '👤', category: 'detrimental', selected: false },
  { id: 'd8', name: 'BeReal',      icon: '📷', category: 'detrimental', selected: false },
  // Beneficial
  { id: 'b1', name: 'Headspace',   icon: '🧘', category: 'beneficial', selected: false },
  { id: 'b2', name: 'Bible App',   icon: '📖', category: 'beneficial', selected: false },
  { id: 'b3', name: 'Kindle',      icon: '📚', category: 'beneficial', selected: false },
  { id: 'b4', name: 'Duolingo',    icon: '🦜', category: 'beneficial', selected: false },
  { id: 'b5', name: 'Calm',        icon: '🌊', category: 'beneficial', selected: false },
  { id: 'b6', name: 'Nike Run',    icon: '👟', category: 'beneficial', selected: false },
  { id: 'b7', name: 'MyFitnessPal',icon: '🥗', category: 'beneficial', selected: false },
  { id: 'b8', name: 'Notion',      icon: '📝', category: 'beneficial', selected: false },
];

const INVITE_CODE = 'ZONE-4829';

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <View style={styles.stepDots}>
      {Array.from({ length: total }).map((_, i) => (
        <Animated.View
          key={i}
          style={[
            styles.dot,
            i < step  && styles.dotDone,
            i === step - 1 && styles.dotActive,
          ]}
        />
      ))}
    </View>
  );
}

// ─── Step 1: Name ─────────────────────────────────────────────────────────────
function StepName({ onNext }: { onNext: (name: string) => void }) {
  const [name, setName] = useState('');
  const inputRef = useRef<TextInput>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
    setTimeout(() => inputRef.current?.focus(), 400);
  }, []);

  return (
    <Animated.View style={[styles.stepWrap, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <Text style={styles.stepEmoji}>🏆</Text>
      <Text style={styles.stepTitle}>Name your league</Text>
      <Text style={styles.stepSub}>
        Give your crew a name. This is what everyone will see each season.
      </Text>

      <TextInput
        ref={inputRef}
        style={styles.nameInput}
        placeholder="e.g. The Boys, Squad Goals..."
        placeholderTextColor="rgba(255,255,255,0.2)"
        value={name}
        onChangeText={setName}
        maxLength={30}
        returnKeyType="next"
        onSubmitEditing={() => name.trim() && onNext(name.trim())}
      />
      <Text style={styles.charCount}>{name.length}/30</Text>

      <View style={styles.nameSuggestions}>
        {['The Boys', 'Grind Season', 'No Phone Zone', 'Touch Grass FC'].map(s => (
          <TouchableOpacity key={s} style={styles.suggChip} onPress={() => setName(s)}>
            <Text style={styles.suggChipText}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.primaryBtn, !name.trim() && styles.primaryBtnDisabled]}
        onPress={() => name.trim() && onNext(name.trim())}
        disabled={!name.trim()}
      >
        <Text style={styles.primaryBtnText}>Continue →</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Step 2: Invite ───────────────────────────────────────────────────────────
function StepInvite({ leagueName, onNext, onBack }: { leagueName: string; onNext: () => void; onBack: () => void }) {
  const [search, setSearch] = useState('');
  const [added, setAdded] = useState<string[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleShare = async (method: 'link' | 'code') => {
    try {
      await Share.share({
        message: method === 'code'
          ? `Join my league "${leagueName}" on Zone! Use code: ${INVITE_CODE}`
          : `Join my league "${leagueName}" on Zone! https://zone.app/join/${INVITE_CODE}`,
      });
    } catch {}
  };

  const mockUsers = ['alex_g', 'jordan22', 'sam_t', 'tyler.k', 'max_r'].filter(u =>
    !search || u.includes(search.toLowerCase())
  );

  return (
    <Animated.View style={[styles.stepWrap, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backBtnText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.stepEmoji}>👥</Text>
      <Text style={styles.stepTitle}>Invite friends</Text>
      <Text style={styles.stepSub}>Add anyone to <Text style={{ color: '#A8FF78' }}>{leagueName}</Text>. You can always add more later.</Text>

      {/* Code Card */}
      <View style={styles.codeCard}>
        <View>
          <Text style={styles.codeLabel}>LEAGUE CODE</Text>
          <Text style={styles.codeVal}>{INVITE_CODE}</Text>
        </View>
        <TouchableOpacity style={styles.copyBtn} onPress={() => handleShare('code')}>
          <Text style={styles.copyBtnText}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Invite methods */}
      <View style={styles.inviteMethods}>
        <TouchableOpacity style={styles.methodBtn} onPress={() => handleShare('link')}>
          <Text style={styles.methodIcon}>🔗</Text>
          <Text style={styles.methodText}>Invite link</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.methodBtn} onPress={() => handleShare('code')}>
          <Text style={styles.methodIcon}>📋</Text>
          <Text style={styles.methodText}>Share code</Text>
        </TouchableOpacity>
      </View>

      {/* Search by username */}
      <Text style={styles.orDivider}>— or search by username —</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search username..."
        placeholderTextColor="rgba(255,255,255,0.2)"
        value={search}
        onChangeText={setSearch}
      />

      {search.length > 0 && (
        <View style={styles.searchResults}>
          {mockUsers.length === 0 && (
            <Text style={styles.noResults}>No users found</Text>
          )}
          {mockUsers.map(u => {
            const isAdded = added.includes(u);
            return (
              <View key={u} style={styles.userRow}>
                <View style={styles.userAvatar}>
                  <Text style={{ fontSize: 16 }}>👤</Text>
                </View>
                <Text style={styles.userName}>@{u}</Text>
                <TouchableOpacity
                  style={[styles.addBtn, isAdded && styles.addBtnDone]}
                  onPress={() => setAdded(prev => isAdded ? prev.filter(x => x !== u) : [...prev, u])}
                >
                  <Text style={[styles.addBtnText, isAdded && { color: '#A8FF78' }]}>
                    {isAdded ? '✓ Added' : '+ Add'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}

      {added.length > 0 && (
        <View style={styles.addedRow}>
          <Text style={styles.addedLabel}>{added.length} friend{added.length > 1 ? 's' : ''} added</Text>
        </View>
      )}

      <TouchableOpacity style={styles.primaryBtn} onPress={onNext}>
        <Text style={styles.primaryBtnText}>
          {added.length > 0 ? `Continue with ${added.length} friend${added.length > 1 ? 's' : ''} →` : 'Skip for now →'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Step 3: Apps ─────────────────────────────────────────────────────────────
function StepApps({ leagueName, onFinish, onBack }: { leagueName: string; onFinish: () => void; onBack: () => void }) {
  const [apps, setApps] = useState<AppItem[]>(SUGGESTED_APPS);
  const [activeTab, setActiveTab] = useState<AppCategory>('detrimental');
  const [customApp, setCustomApp] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const toggle = (id: string) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, selected: !a.selected } : a));
  };

  const addCustom = () => {
    if (!customApp.trim()) return;
    const newApp: AppItem = {
      id: `custom-${Date.now()}`,
      name: customApp.trim(),
      icon: activeTab === 'detrimental' ? '📵' : '✅',
      category: activeTab,
      selected: true,
    };
    setApps(prev => [...prev, newApp]);
    setCustomApp('');
  };

  const visible = apps.filter(a => a.category === activeTab);
  const selectedCount = apps.filter(a => a.selected).length;
  const detCount = apps.filter(a => a.category === 'detrimental' && a.selected).length;
  const benCount = apps.filter(a => a.category === 'beneficial'  && a.selected).length;

  return (
    <Animated.View style={[styles.stepWrap, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backBtnText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.stepEmoji}>📱</Text>
      <Text style={styles.stepTitle}>Set the apps</Text>
      <Text style={styles.stepSub}>
        Choose which apps hurt or help your score. Only you can change this as league creator.
      </Text>

      {/* Summary pills */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryPill}>
          <Text style={styles.summaryPillText}>📵 {detCount} detrimental</Text>
        </View>
        <View style={[styles.summaryPill, styles.summaryPillGreen]}>
          <Text style={[styles.summaryPillText, { color: '#A8FF78' }]}>✅ {benCount} beneficial</Text>
        </View>
      </View>

      {/* Category Tab */}
      <View style={styles.catToggle}>
        <TouchableOpacity
          style={[styles.catBtn, activeTab === 'detrimental' && styles.catBtnBad]}
          onPress={() => setActiveTab('detrimental')}
        >
          <Text style={[styles.catBtnText, activeTab === 'detrimental' && { color: '#FF6B6B' }]}>
            📵 Detrimental
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.catBtn, activeTab === 'beneficial' && styles.catBtnGood]}
          onPress={() => setActiveTab('beneficial')}
        >
          <Text style={[styles.catBtnText, activeTab === 'beneficial' && { color: '#A8FF78' }]}>
            ✅ Beneficial
          </Text>
        </TouchableOpacity>
      </View>

      {/* Points info */}
      <View style={[styles.infoBox, { borderColor: activeTab === 'detrimental' ? 'rgba(255,107,107,0.2)' : 'rgba(168,255,120,0.2)' }]}>
        <Text style={styles.infoBoxText}>
          {activeTab === 'detrimental'
            ? '📵  Opening a detrimental app costs −10 pts each time'
            : '✅  Spending 10+ min on a beneficial app earns +30 pts'}
        </Text>
      </View>

      {/* App Grid */}
      <View style={styles.appGrid}>
        {visible.map(app => (
          <TouchableOpacity
            key={app.id}
            style={[
              styles.appChip,
              app.selected && (activeTab === 'detrimental' ? styles.appChipBad : styles.appChipGood),
            ]}
            onPress={() => toggle(app.id)}
          >
            <Text style={styles.appChipIcon}>{app.icon}</Text>
            <Text style={[
              styles.appChipName,
              app.selected && (activeTab === 'detrimental' ? { color: '#FF6B6B' } : { color: '#A8FF78' }),
            ]}>
              {app.name}
            </Text>
            {app.selected && (
              <Text style={styles.appChipCheck}>
                {activeTab === 'detrimental' ? '✕' : '✓'}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Add custom */}
      <View style={styles.customRow}>
        <TextInput
          style={styles.customInput}
          placeholder={`Add custom ${activeTab} app...`}
          placeholderTextColor="rgba(255,255,255,0.2)"
          value={customApp}
          onChangeText={setCustomApp}
          onSubmitEditing={addCustom}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.customAddBtn} onPress={addCustom} disabled={!customApp.trim()}>
          <Text style={styles.customAddBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.primaryBtn, selectedCount === 0 && styles.primaryBtnDisabled]}
        onPress={onFinish}
        disabled={selectedCount === 0}
      >
        <Text style={styles.primaryBtnText}>
          {selectedCount > 0 ? `Create league with ${selectedCount} apps 🚀` : 'Select at least 1 app'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Step 4: Done ─────────────────────────────────────────────────────────────
function StepDone({ leagueName, onFinish }: { leagueName: string; onFinish: () => void }) {
  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }),
      Animated.timing(fadeAnim,  { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.doneWrap, { opacity: fadeAnim }]}>
      <Animated.Text style={[styles.doneEmoji, { transform: [{ scale: scaleAnim }] }]}>🏆</Animated.Text>
      <Text style={styles.doneTitle}>{leagueName}{'\n'}is live!</Text>
      <Text style={styles.doneSub}>
        Season 1 starts now. Share your league code{'\n'}
        <Text style={styles.doneCode}>{INVITE_CODE}</Text>
        {'\n'}and may the best player win 💎
      </Text>
      <TouchableOpacity style={styles.primaryBtn} onPress={onFinish}>
        <Text style={styles.primaryBtnText}>Let's go →</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function CreateLeagueScreen() {
  const [step, setStep] = useState(1);
  const [leagueName, setLeagueName] = useState('');

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {step < 4 && (
            <View style={styles.progressHeader}>
              <StepDots step={step} total={3} />
              <Text style={styles.stepLabel}>Step {step} of 3</Text>
            </View>
          )}

          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {step === 1 && (
              <StepName onNext={(name) => { setLeagueName(name); setStep(2); }} />
            )}
            {step === 2 && (
              <StepInvite
                leagueName={leagueName}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <StepApps
                leagueName={leagueName}
                onFinish={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            )}
            {step === 4 && (
              <StepDone
                leagueName={leagueName}
                onFinish={() => { /* navigate to home */ }}
              />
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: '#080810' },
  scroll: { paddingHorizontal: 22, paddingBottom: 60 },

  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 6,
  },
  stepDots:   { flexDirection: 'row', gap: 6 },
  dot:        { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.1)' },
  dotDone:    { backgroundColor: 'rgba(168,255,120,0.4)' },
  dotActive:  { width: 24, backgroundColor: '#A8FF78' },
  stepLabel:  { color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: '600' },

  stepWrap: { paddingTop: 20 },

  stepEmoji: { fontSize: 44, marginBottom: 14, textAlign: 'center' },
  stepTitle: { color: '#FFF', fontSize: 28, fontWeight: '800', letterSpacing: -0.8, textAlign: 'center', marginBottom: 10 },
  stepSub:   { color: 'rgba(255,255,255,0.4)', fontSize: 14, textAlign: 'center', lineHeight: 21, marginBottom: 28 },

  backBtn:     { marginBottom: 10 },
  backBtnText: { color: 'rgba(255,255,255,0.35)', fontSize: 14, fontWeight: '600' },

  // Name Step
  nameInput: {
    backgroundColor: '#12121E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    padding: 18,
    marginBottom: 6,
  },
  charCount: { color: 'rgba(255,255,255,0.2)', fontSize: 11, textAlign: 'right', marginBottom: 20 },
  nameSuggestions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 28 },
  suggChip:     { backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  suggChipText: { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: '600' },

  // Invite Step
  codeCard: {
    backgroundColor: '#12121E',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(168,255,120,0.2)',
    marginBottom: 14,
  },
  codeLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginBottom: 4 },
  codeVal:   { color: '#A8FF78', fontSize: 24, fontWeight: '800', letterSpacing: 2 },
  copyBtn:   { backgroundColor: 'rgba(168,255,120,0.12)', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: 'rgba(168,255,120,0.25)' },
  copyBtnText: { color: '#A8FF78', fontWeight: '700', fontSize: 13 },

  inviteMethods: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  methodBtn:  { flex: 1, backgroundColor: '#12121E', borderRadius: 14, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  methodIcon: { fontSize: 22, marginBottom: 5 },
  methodText: { color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: '600' },

  orDivider: { color: 'rgba(255,255,255,0.2)', fontSize: 12, textAlign: 'center', marginBottom: 14 },
  searchInput: {
    backgroundColor: '#12121E',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    color: '#FFF',
    fontSize: 15,
    padding: 14,
    marginBottom: 8,
  },
  searchResults: { backgroundColor: '#12121E', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', overflow: 'hidden', marginBottom: 14 },
  noResults:  { color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: 16, fontSize: 13 },
  userRow:    { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  userAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  userName:   { flex: 1, color: '#FFF', fontSize: 14, fontWeight: '600' },
  addBtn:     { backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
  addBtnDone: { backgroundColor: 'rgba(168,255,120,0.1)', borderWidth: 1, borderColor: 'rgba(168,255,120,0.2)' },
  addBtnText: { color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: '700' },

  addedRow:   { backgroundColor: 'rgba(168,255,120,0.08)', borderRadius: 12, padding: 10, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: 'rgba(168,255,120,0.15)' },
  addedLabel: { color: '#A8FF78', fontSize: 13, fontWeight: '600' },

  // Apps Step
  summaryRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  summaryPill:      { flex: 1, backgroundColor: 'rgba(255,107,107,0.08)', borderRadius: 10, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,107,107,0.2)' },
  summaryPillGreen: { backgroundColor: 'rgba(168,255,120,0.08)', borderColor: 'rgba(168,255,120,0.2)' },
  summaryPillText:  { color: '#FF6B6B', fontSize: 12, fontWeight: '700' },

  catToggle: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 3, marginBottom: 14 },
  catBtn:    { flex: 1, paddingVertical: 9, borderRadius: 11, alignItems: 'center' },
  catBtnBad: { backgroundColor: 'rgba(255,107,107,0.12)', borderWidth: 1, borderColor: 'rgba(255,107,107,0.25)' },
  catBtnGood:{ backgroundColor: 'rgba(168,255,120,0.1)',  borderWidth: 1, borderColor: 'rgba(168,255,120,0.25)' },
  catBtnText:{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: '700' },

  infoBox:     { borderRadius: 12, borderWidth: 1, padding: 12, marginBottom: 16, backgroundColor: 'rgba(255,255,255,0.03)' },
  infoBoxText: { color: 'rgba(255,255,255,0.45)', fontSize: 12, lineHeight: 18 },

  appGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  appChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  appChipBad:  { backgroundColor: 'rgba(255,107,107,0.1)',  borderColor: 'rgba(255,107,107,0.3)'  },
  appChipGood: { backgroundColor: 'rgba(168,255,120,0.08)', borderColor: 'rgba(168,255,120,0.3)'  },
  appChipIcon: { fontSize: 16 },
  appChipName: { color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: '600' },
  appChipCheck:{ fontSize: 12, fontWeight: '800' },

  customRow:    { flexDirection: 'row', gap: 8, marginBottom: 28 },
  customInput:  { flex: 1, backgroundColor: '#12121E', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', color: '#FFF', fontSize: 14, padding: 12 },
  customAddBtn: { width: 46, backgroundColor: '#12121E', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  customAddBtnText: { color: '#A8FF78', fontSize: 22, fontWeight: '700' },

  // Done
  doneWrap:  { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60, paddingHorizontal: 22 },
  doneEmoji: { fontSize: 80, marginBottom: 24, textAlign: 'center' },
  doneTitle: { color: '#FFF', fontSize: 34, fontWeight: '800', letterSpacing: -1, textAlign: 'center', marginBottom: 16, lineHeight: 40 },
  doneSub:   { color: 'rgba(255,255,255,0.4)', fontSize: 15, textAlign: 'center', lineHeight: 24, marginBottom: 36 },
  doneCode:  { color: '#A8FF78', fontWeight: '800', fontSize: 18, letterSpacing: 2 },

  // Shared
  primaryBtn: {
    backgroundColor: '#A8FF78',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryBtnDisabled: { backgroundColor: 'rgba(168,255,120,0.25)' },
  primaryBtnText: { color: '#080810', fontSize: 16, fontWeight: '800', letterSpacing: -0.3 },
});