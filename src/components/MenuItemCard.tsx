import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MenuItem } from '../data/menu';
import { colors } from '../theme';

export default function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <View style={styles.card}>
      {item.image ? (
        // If image is a number, it's a local require() result; otherwise treat as URI
        typeof item.image === 'number' ? (
          <Image source={item.image} style={styles.imagePlaceholder} />
        ) : (
          <Image source={{ uri: item.image }} style={styles.imagePlaceholder} />
        )
      ) : (
        <Image source={require('../../assets/placeholder.png')} style={styles.imagePlaceholder} />
      )}
      <View style={{ flex: 1 }}>
        <View style={styles.rowTop}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
        </View>
        <Text style={styles.course}>{item.course}</Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 1
  },
  imagePlaceholder: {
    width: 120,
    height: 90,
    backgroundColor: colors.lightBrown,
    borderRadius: 8,
    marginRight: 12,
    resizeMode: 'cover'
  },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontWeight: '800', marginBottom: 4, color: colors.darkBrown, fontSize: 16 },
  course: { color: colors.midBrown, fontWeight: '600', marginBottom: 6 },
  desc: { color: '#444', marginBottom: 6 },
  price: { color: colors.darkBrown, fontWeight: '800' }
});
