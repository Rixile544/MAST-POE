import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import MenuList from '../components/MenuList';
import { COURSES, getAllMenuItems } from '../data/menu';
import { colors } from '../theme';

export default function GuestFilter() {
  const [filter, setFilter] = useState<'All' | (typeof COURSES[number])>('All');
  const all = getAllMenuItems();
  const items = filter === 'All' ? all : all.filter(i => i.course === filter);

  return (
    <ImageBackground source={require('../../assets/filter background.jpg')} style={{ flex: 1 }} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.cardHeader}>
            <View style={styles.row}>
              <Button title="All" onPress={() => setFilter('All')} color={filter === 'All' ? colors.darkBrown : colors.lightBrown} />
              {COURSES.map(c => (
                <Button key={c} title={c} onPress={() => setFilter(c)} color={filter === c ? colors.darkBrown : colors.lightBrown} />
              ))}
            </View>

            <Text style={styles.credit}>Filter by course — background provided by user</Text>
          </View>

          <Text style={{ marginVertical: 8, color: '#fff' }}>Showing: {filter}</Text>
          <MenuList items={items} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  cardHeader: { backgroundColor: 'rgba(255,255,255,0.95)', padding: 10, borderRadius: 10, marginBottom: 8 },
  credit: { marginTop: 6, fontSize: 12, color: '#333', textAlign: 'center' }
});
