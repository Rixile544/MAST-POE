import React from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { MenuItem } from '../data/menu';
import MenuItemCard from './MenuItemCard';

type Props = { items: MenuItem[] };

const renderItem: ListRenderItem<MenuItem> = ({ item }) => <MenuItemCard item={item} />;

export default function MenuList({ items }: Props) {
  return <FlatList<MenuItem> data={items} keyExtractor={(i) => i.id} renderItem={renderItem} />;
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
    width: 64,
    height: 64,
    backgroundColor: '#CBB291',
    borderRadius: 6,
    marginRight: 12
  },
  name: { fontWeight: '700', marginBottom: 4 },
  desc: { color: '#444', marginBottom: 6 },
  price: { color: '#6B4C3B', fontWeight: '700' }
});
