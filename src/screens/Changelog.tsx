import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function Changelog() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Changelog</Text>
      <Text style={styles.entry}>- Part 1/2 features implemented: UI scaffolding and add-on-home (migrated to separate Add screen)</Text>
      <Text style={styles.entry}>- Added typed data store (src/data/menu.ts) with add/remove and averages</Text>
      <Text style={styles.entry}>- Refactored into components and screens</Text>
      <Text style={styles.entry}>- Theme updated to earthy colors and image placeholders added</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: colors.beige },
  title: { fontSize: 20, fontWeight: '800', color: colors.darkBrown, marginBottom: 12 },
  entry: { marginBottom: 8 }
});
