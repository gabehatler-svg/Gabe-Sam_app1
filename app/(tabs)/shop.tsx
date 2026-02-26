import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = 'all' | 'avatars' | 'frames' | 'banners' | 'names' | 'victories';
type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

interface ShopItem {
  id: string;
  name: string;
  category: Exclude<Category, 'all'>;
  rarity: Rarity;
  cost: number;
  preview: string;
  description: string;
  owned: boolean;
  equipped: boolean;
  new?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const MY_GEMS = 12;

const ITEMS: ShopItem[] = [
  // Avatars
  { id: 'av1', name: 'Monk',         category: 'avatars',   rarity: 'common',    cost: 5,  preview: '🧘',  description: 'A calm and focused warrior.',         owned: true,  equipped: true  },
  { id: 'av2', name: 'Scholar',      category: 'avatars',   rarity: 'common',    cost: 5,  preview: '📚',  description: 'Knowledge is the real flex.',         owned: false, equipped: false },
  { id: 'av3', name: 'Astronaut',    category: 'avatars',   rarity: 'rare',      cost: 12, preview: '👨‍🚀', description: 'Touching grass? Touching stars.',      owned: false, equipped: false },
  { id: 'av4', name: 'Wizard',       category: 'avatars',   rarity: 'rare',      cost: 12, preview: '🧙',  description: 'Ancient screen-time wisdom.',         owned: false, equipped: false },
  { id: 'av5', name: 'Ninja',        category: 'avatars',   rarity: 'epic',      cost: 20, preview: '🥷',  description: 'Silent. Focused. Offline.',           owned: false, equipped: false },
  { id: 'av6', name: 'Dragon',       category: 'avatars',   rarity: 'legendary', cost: 40, preview: '🐉',  description: 'Legendary. Enough said.',             owned: false, equipped: false },

  // Frames
  { id: 'fr1', name: 'Gold Ring',    category: 'frames',    rarity: 'rare',      cost: 8,  preview: '🟡',  description: 'A clean gold border for your avatar.', owned: false, equipped: false },
  { id: 'fr2', name: 'Diamond Cut',  category: 'frames',    rarity: 'epic',      cost: 18, preview: '💠',  description: 'Crystal-cut diamond frame.',          owned: false, equipped: false },
  { id: 'fr3', name: 'Fire Ring',    category: 'frames',    rarity: 'epic',      cost: 22, preview: '🔥',  description: 'Your avatar is literally on fire.',   owned: false, equipped: false },
  { id: 'fr4', name: 'Aurora',       category: 'frames',    rarity: 'legendary', cost: 45, preview: '🌌',  description: 'Northern lights glow effect.',        owned: false, equipped: false },

  // Banners
  { id: 'bn1', name: 'Forest',       category: 'banners',   rarity: 'common',    cost: 6,  preview: '🌲',  description: 'Go touch some grass.',                owned: true,  equipped: false },
  { id: 'bn2', name: 'Ocean',        category: 'banners',   rarity: 'common',    cost: 6,  preview: '🌊',  description: 'Calm like a still sea.',              owned: false, equipped: false },
  { id: 'bn3', name: 'City Nights',  category: 'banners',   rarity: 'rare',      cost: 14, preview: '🌃',  description: 'Late night, no screen.',              owned: false, equipped: false },
  { id: 'bn4', name: 'Galaxy',       category: 'banners',   rarity: 'legendary', cost: 50, preview: '🌠',  description: 'The universe is your banner.',        owned: false, equipped: false, new: true },

  // Name effects
  { id: 'nm1', name: 'Gold Text',    category: 'names',     rarity: 'rare',      cost: 10, preview: '✨',  description: 'Your name shines in gold.',           owned: false, equipped: false },
  { id: 'nm2', name: 'Rainbow',      category: 'names',     rarity: 'epic',      cost: 25, preview: '🌈',  description: 'Every color of the spectrum.',        owned: false, equipped: false },
  { id: 'nm3', name: 'Ice Cold',     category: 'names',     rarity: 'rare',      cost: 10, preview: '🧊',  description: 'Frozen blue crystalline text.',       owned: false, equipped: false },
  { id: 'nm4', name: 'On Fire',      category: 'names',     rarity: 'epic',      cost: 28, preview: '🔥',  description: 'Your name burns bright.',             owned: false, equipped: false },

  // Victory animations
  { id: 'vc1', name: 'Confetti',     category: 'victories', rarity: 'common',    cost: 8,  preview: '🎊',  description: 'Classic win celebration.',            owned: true,  equipped: true  },
  { id: 'vc2', name: 'Fireworks',    category: 'victories', rarity: 'rare',      cost: 15, preview: '🎆',  description: 'Boom. You won.',                      owned: false, equipped: false },
  { id: 'vc3', name: 'Lightning',    category: 'victories', rarity: 'epic',      cost: 24, preview: '⚡',  description: 'Strike down your opponents.',         owned: false, equipped: false },
  { id: 'vc4', name: 'Crown Drop',   category: 'victories', rarity: 'legendary', cost: 60, preview: '👑',  description: 'A crown descends from above.',        owned: false, equipped: false, new: true },
];

const RARITY_CONFIG: Record<Rarity, { color: string; bg: string; label: string; glow: string }> = {
  common:    { color: '#A0A0A0', bg: 'rgba(160,160,160,0.1)', label: 'Common',    glow: 'rgba(160,160,160,0.2)' },
  rare:      { color: '#4D9FFF', bg: 'rgba(77,159,255,0.1)',  label: 'Rare',      glow: 'rgba(77,159,255,0.25)' },
  epic:      { color: '#B86EFF', bg: 'rgba(184,110,255,0.1)', label: 'Epic',      glow: 'rgba(184,110,255,0.3)' },
  legendary: { color: '#FFB830', bg: 'rgba(255,184,48,0.1)',  label: 'Legendary', glow: 'rgba(255,184,48,0.35)' },
};

const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: 'all',      label: 'All',      icon: '🛍️' },
  { id: 'avatars',  label: 'Avatars',  icon: '😄' },
  { id: 'frames',   label: 'Frames',   icon: '🖼️' },
  { id: 'banners',  label: 'Banners',  icon: '🎌' },
  { id: 'names',    label: 'Names',    icon: '✏️' },
  { id: 'victories',label: 'Victory',  icon: '🏆' },
];

// ─── Item Card ────────────────────────────────────────────────────────────────
function ItemCard({ item, onPress, index }: { item: ShopItem; onPress: () => void; index: number }) {
  const rarity  = RARITY_CONFIG[item.rarity];
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 350, delay: index * 45, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 7, tension: 80, delay: index * 45, useNativeDriver: true }),
    ]).start();
  }, []);

  const canAfford = MY_GEMS >= item.cost;

  return (
    <Animated.View style={[{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }, { width: (width - 36 - 12) / 2 }]}>
      <TouchableOpacity
        style={[
          styles.itemCard,
          { borderColor: item.owned ? rarity.color + '55' : 'rgba(255,255,255,0.06)' },
          item.equipped && { borderColor: rarity.color + '99' },
        ]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {/* Rarity glow for owned */}
        {item.owned && (
          <View style={[styles.itemGlow, { backgroundColor: rarity.glow }]} />
        )}

        {/* Badges */}
        <View style={styles.itemBadges}>
          {item.new && (
            <View style={styles.newBadge}><Text style={styles.newBadgeText}>NEW</Text></View>
          )}
          {item.equipped && (
            <View style={styles.equippedBadge}><Text style={styles.equippedBadgeText}>ON</Text></View>
          )}
        </View>

        {/* Preview */}
        <Text style={styles.itemPreview}>{item.preview}</Text>

        {/* Info */}
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={[styles.rarityPill, { backgroundColor: rarity.bg }]}>
          <Text style={[styles.rarityText, { color: rarity.color }]}>{rarity.label}</Text>
        </View>

        {/* Cost / owned */}
        {item.owned ? (
          <View style={styles.ownedRow}>
            <Text style={styles.ownedText}>✓ Owned</Text>
          </View>
        ) : (
          <View style={[styles.costRow, !canAfford && styles.costRowDim]}>
            <Text style={styles.costGem}>💎</Text>
            <Text style={[styles.costVal, !canAfford && { color: '#FF6B6B' }]}>{item.cost}</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Item Detail Modal ────────────────────────────────────────────────────────
function ItemModal({ item, onClose, onBuy, onEquip }: {
  item: ShopItem | null;
  onClose: () => void;
  onBuy: (id: string) => void;
  onEquip: (id: string) => void;
}) {
  const slideAnim = useRef(new Animated.Value(400)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (item) {
      slideAnim.setValue(400);
      fadeAnim.setValue(0);
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 70, useNativeDriver: true }),
        Animated.timing(fadeAnim,  { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
      // Bounce the preview emoji
      Animated.sequence([
        Animated.spring(bounceAnim, { toValue: 1.3, friction: 4, tension: 100, useNativeDriver: true }),
        Animated.spring(bounceAnim, { toValue: 1,   friction: 5, tension: 80,  useNativeDriver: true }),
      ]).start();
    }
  }, [item?.id]);

  if (!item) return null;

  const rarity    = RARITY_CONFIG[item.rarity];
  const canAfford = MY_GEMS >= item.cost;

  return (
    <Modal transparent animationType="none" visible={!!item} onRequestClose={onClose}>
      <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} activeOpacity={1} />
        <Animated.View style={[styles.modalSheet, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.modalHandle} />

          {/* Rarity glow bg */}
          <View style={[styles.modalGlow, { backgroundColor: rarity.glow }]} />

          {/* Preview */}
          <Animated.Text style={[styles.modalPreview, { transform: [{ scale: bounceAnim }] }]}>
            {item.preview}
          </Animated.Text>

          {/* Rarity + name */}
          <View style={[styles.modalRarityPill, { backgroundColor: rarity.bg, borderColor: rarity.color + '55' }]}>
            <Text style={[styles.modalRarityText, { color: rarity.color }]}>{rarity.label}</Text>
          </View>
          <Text style={styles.modalName}>{item.name}</Text>
          <Text style={styles.modalDesc}>{item.description}</Text>

          {/* Category tag */}
          <Text style={styles.modalCategory}>
            {CATEGORIES.find(c => c.id === item.category)?.icon} {CATEGORIES.find(c => c.id === item.category)?.label}
          </Text>

          {/* Action */}
          {item.owned ? (
            <TouchableOpacity
              style={[styles.actionBtn, item.equipped && styles.actionBtnEquipped]}
              onPress={() => { onEquip(item.id); onClose(); }}
            >
              <Text style={[styles.actionBtnText, item.equipped && { color: '#080810' }]}>
                {item.equipped ? '✓ Currently Equipped' : 'Equip'}
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <View style={styles.modalCostRow}>
                <Text style={styles.modalCostLabel}>Cost</Text>
                <View style={styles.modalCostRight}>
                  <Text style={styles.modalGemIcon}>💎</Text>
                  <Text style={[styles.modalCostVal, !canAfford && { color: '#FF6B6B' }]}>{item.cost}</Text>
                </View>
              </View>
              {!canAfford && (
                <Text style={styles.cantAffordNote}>You need {item.cost - MY_GEMS} more gems. Win a season to earn gems!</Text>
              )}
              <TouchableOpacity
                style={[styles.actionBtn, !canAfford && styles.actionBtnDisabled]}
                onPress={() => { if (canAfford) { onBuy(item.id); onClose(); } }}
                disabled={!canAfford}
              >
                <Text style={[styles.actionBtnText, canAfford && { color: '#080810' }]}>
                  {canAfford ? `Buy for 💎 ${item.cost}` : 'Not enough gems'}
                </Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
            <Text style={styles.modalCloseBtnText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function ShopScreen() {
  const [category, setCategory]   = useState<Category>('all');
  const [items, setItems]         = useState<ShopItem[]>(ITEMS);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);

  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const visibleItems = category === 'all' ? items : items.filter(i => i.category === category);
  const ownedCount   = items.filter(i => i.owned).length;

  const handleBuy = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, owned: true } : i));
  };

  const handleEquip = (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    setItems(prev => prev.map(i =>
      i.category === item.category
        ? { ...i, equipped: i.id === id ? !i.equipped : false }
        : i
    ));
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>

        {/* ── Header ── */}
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View>
            <Text style={styles.headerTitle}>Shop</Text>
            <Text style={styles.headerSub}>{ownedCount} of {items.length} items owned</Text>
          </View>
          <View style={styles.gemBalance}>
            <Text style={styles.gemBalanceIcon}>💎</Text>
            <Text style={styles.gemBalanceVal}>{MY_GEMS}</Text>
            <Text style={styles.gemBalanceLabel}>gems</Text>
          </View>
        </Animated.View>

        {/* ── Earn gems banner ── */}
        <Animated.View style={[styles.earnBanner, { opacity: fadeAnim }]}>
          <Text style={styles.earnBannerText}>
            💡 Win a season to earn more gems
          </Text>
        </Animated.View>

        {/* ── Category Tabs ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScroll}
        >
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catChip, category === cat.id && styles.catChipActive]}
              onPress={() => setCategory(cat.id)}
            >
              <Text style={styles.catChipIcon}>{cat.icon}</Text>
              <Text style={[styles.catChipText, category === cat.id && styles.catChipTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Grid ── */}
        <ScrollView
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        >
          {/* Section header */}
          <View style={styles.gridHeader}>
            <Text style={styles.gridHeaderText}>
              {category === 'all' ? 'All Items' : CATEGORIES.find(c => c.id === category)?.label}
            </Text>
            <Text style={styles.gridHeaderCount}>{visibleItems.length} items</Text>
          </View>

          {/* Rarity legend */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rarityLegend}>
            {(Object.keys(RARITY_CONFIG) as Rarity[]).map(r => (
              <View key={r} style={[styles.legendPill, { backgroundColor: RARITY_CONFIG[r].bg, borderColor: RARITY_CONFIG[r].color + '44' }]}>
                <Text style={[styles.legendText, { color: RARITY_CONFIG[r].color }]}>{RARITY_CONFIG[r].label}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Items */}
          <View style={styles.itemsRow}>
            {visibleItems.map((item, i) => (
              <ItemCard
                key={item.id}
                item={item}
                index={i}
                onPress={() => setSelectedItem(item)}
              />
            ))}
          </View>

          <View style={{ height: 110 }} />
        </ScrollView>
      </SafeAreaView>

      <ItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onBuy={handleBuy}
        onEquip={handleEquip}
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#080810' },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 18, paddingTop: 10, paddingBottom: 10,
  },
  headerTitle: { color: '#FFF', fontSize: 28, fontWeight: '800', letterSpacing: -0.7 },
  headerSub:   { color: 'rgba(255,255,255,0.3)', fontSize: 13, marginTop: 2 },
  gemBalance:  {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(136,238,255,0.08)',
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, borderColor: 'rgba(136,238,255,0.2)',
  },
  gemBalanceIcon:  { fontSize: 18 },
  gemBalanceVal:   { color: '#88EEFF', fontSize: 18, fontWeight: '800', letterSpacing: -0.5 },
  gemBalanceLabel: { color: 'rgba(136,238,255,0.5)', fontSize: 12, fontWeight: '600' },

  // Earn banner
  earnBanner: {
    marginHorizontal: 18, marginBottom: 12,
    backgroundColor: 'rgba(168,255,120,0.06)',
    borderRadius: 12, padding: 10,
    borderWidth: 1, borderColor: 'rgba(168,255,120,0.15)',
  },
  earnBannerText: { color: 'rgba(168,255,120,0.7)', fontSize: 12, fontWeight: '600', textAlign: 'center' },

  // Category tabs
  catScroll: { paddingHorizontal: 18, paddingBottom: 12, gap: 8 },
  catChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  catChipActive:    { backgroundColor: '#A8FF78', borderColor: '#A8FF78' },
  catChipIcon:      { fontSize: 14 },
  catChipText:      { color: 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: '600' },
  catChipTextActive:{ color: '#080810', fontWeight: '700' },

  // Grid
  grid:       { paddingHorizontal: 18 },
  gridHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  gridHeaderText:  { color: '#FFF', fontSize: 16, fontWeight: '700' },
  gridHeaderCount: { color: 'rgba(255,255,255,0.25)', fontSize: 13 },
  rarityLegend:    { marginBottom: 14 },
  legendPill: {
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1, marginRight: 6,
  },
  legendText: { fontSize: 11, fontWeight: '700' },
  itemsRow:   { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },

  // Item Card
  itemCard: {
    backgroundColor: '#12121E',
    borderRadius: 18, padding: 14,
    borderWidth: 1, alignItems: 'center',
    overflow: 'hidden', position: 'relative',
  },
  itemGlow: {
    position: 'absolute', top: -20, right: -20,
    width: 80, height: 80, borderRadius: 40,
  },
  itemBadges:      { position: 'absolute', top: 8, right: 8, flexDirection: 'row', gap: 4 },
  newBadge:        { backgroundColor: '#FF6B6B', borderRadius: 6, paddingHorizontal: 5, paddingVertical: 2 },
  newBadgeText:    { color: '#FFF', fontSize: 8, fontWeight: '800', letterSpacing: 0.5 },
  equippedBadge:   { backgroundColor: '#A8FF78', borderRadius: 6, paddingHorizontal: 5, paddingVertical: 2 },
  equippedBadgeText:{ color: '#080810', fontSize: 8, fontWeight: '800' },
  itemPreview:     { fontSize: 42, marginBottom: 8, marginTop: 6 },
  itemName:        { color: '#FFF', fontSize: 13, fontWeight: '700', marginBottom: 5, textAlign: 'center' },
  rarityPill:      { borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3, marginBottom: 8 },
  rarityText:      { fontSize: 10, fontWeight: '700', letterSpacing: 0.3 },
  ownedRow:        { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ownedText:       { color: '#A8FF78', fontSize: 12, fontWeight: '700' },
  costRow:         { flexDirection: 'row', alignItems: 'center', gap: 4 },
  costRowDim:      { opacity: 0.7 },
  costGem:         { fontSize: 13 },
  costVal:         { color: '#88EEFF', fontSize: 14, fontWeight: '800' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: '#12121E',
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 24, paddingBottom: 44,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center', overflow: 'hidden',
  },
  modalHandle:   { width: 40, height: 4, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 2, marginBottom: 20 },
  modalGlow:     { position: 'absolute', top: -60, width: 200, height: 200, borderRadius: 100 },
  modalPreview:  { fontSize: 80, marginBottom: 14 },
  modalRarityPill:{ borderRadius: 10, paddingHorizontal: 12, paddingVertical: 4, borderWidth: 1, marginBottom: 8 },
  modalRarityText:{ fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  modalName:     { color: '#FFF', fontSize: 26, fontWeight: '800', letterSpacing: -0.6, marginBottom: 6 },
  modalDesc:     { color: 'rgba(255,255,255,0.4)', fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 8 },
  modalCategory: { color: 'rgba(255,255,255,0.25)', fontSize: 13, marginBottom: 20 },
  modalCostRow:  {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    width: '100%', backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14, padding: 14, marginBottom: 8,
  },
  modalCostLabel:  { color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: '600' },
  modalCostRight:  { flexDirection: 'row', alignItems: 'center', gap: 5 },
  modalGemIcon:    { fontSize: 18 },
  modalCostVal:    { color: '#88EEFF', fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  cantAffordNote:  { color: '#FF6B6B', fontSize: 12, textAlign: 'center', marginBottom: 10 },
  actionBtn: {
    width: '100%', backgroundColor: '#A8FF78',
    borderRadius: 16, paddingVertical: 16,
    alignItems: 'center', marginBottom: 10,
  },
  actionBtnEquipped: { backgroundColor: 'rgba(168,255,120,0.15)', borderWidth: 1, borderColor: 'rgba(168,255,120,0.3)' },
  actionBtnDisabled: { backgroundColor: 'rgba(255,255,255,0.06)' },
  actionBtnText:     { color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: '800' },
  modalCloseBtn:     { width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  modalCloseBtnText: { color: 'rgba(255,255,255,0.35)', fontSize: 15, fontWeight: '600' },
});