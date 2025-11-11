import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';
import Logo from '../components/Logo';

const heroImage = { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80' };
const { width } = Dimensions.get('window');

export default function Home() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground source={heroImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Logo size={64} />
          <Text style={styles.heroKicker}>welcome to our delicious corner</Text>
          <Text style={styles.heroTitle}>BEHIND THE DISHES</Text>
          <Text style={styles.heroLead}>Curated dishes for unforgettable evenings</Text>

          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.cta, { backgroundColor: colors.accent }]} onPress={() => navigation.navigate('AddItem' as any)}>
              <Text style={styles.ctaText}>Add Items</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cta, { backgroundColor: colors.midBrown }]} onPress={() => navigation.navigate('GuestFilter' as any)}>
              <Text style={styles.ctaText}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cta, { backgroundColor: colors.darkBrown }]} onPress={() => navigation.navigate('Changelog' as any)}>
              <Text style={styles.ctaText}>Changelog</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.contentArea}>
        {/* Average price by course removed per request */}
        {/* Menu list removed per request */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.beige },
  hero: { width: '100%', height: Math.round(width * 0.55), justifyContent: 'center', alignItems: 'center' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(6,10,12,0.55)' },
  heroContent: { alignItems: 'center', paddingHorizontal: 20, zIndex: 2 },
  heroKicker: { color: '#f1e7df', fontSize: 12, textTransform: 'lowercase', marginTop: 8 },
  heroTitle: { color: '#fff', fontSize: 36, fontWeight: '900', letterSpacing: 1.2, marginTop: 8 },
  heroLead: { color: '#e6d9cc', marginTop: 8, textAlign: 'center' },
  actionRow: { flexDirection: 'row', marginTop: 14 },
  cta: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 6, marginHorizontal: 6 },
  ctaText: { color: '#fff', fontWeight: '700' },
    contentArea: { padding: 16 },
    stats: { padding: 12, backgroundColor: '#fff', borderRadius: 10, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6 },
    statText: { color: '#2b2b2b', fontSize: 14, fontWeight: '600' },
    statNumber: { fontSize: 18, fontWeight: '800', color: colors.darkBrown },
  });