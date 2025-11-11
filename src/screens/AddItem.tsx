import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image, ImageBackground } from 'react-native';
import { addMenuItem, getAllMenuItems, removeMenuItem, COURSES, MenuItem } from '../data/menu';
import { colors } from '../theme';
import * as ImagePicker from 'expo-image-picker';

export default function AddItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(COURSES[0]);
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [pickedUri, setPickedUri] = useState<string | null>(null);
  const [items, setItems] = useState<MenuItem[]>(getAllMenuItems());

  const handleAdd = () => {
    const num = parseFloat(price) || 0;
    if (!name) return;
  // prefer pickedUri (local file URI) if available, otherwise use imageUrl (remote)
  const imageValue = pickedUri ? pickedUri : (imageUrl || undefined);
  addMenuItem({ name, description, course, price: num, image: imageValue as any });
    setItems(getAllMenuItems());
    setName(''); setDescription(''); setPrice(''); setCourse(COURSES[0]); setImageUrl('');
  setPickedUri(null);
  };

  const handleRemove = (id: string) => {
    Alert.alert('Remove item', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => { removeMenuItem(id); setItems(getAllMenuItems()); } }
    ]);
  };

  return (
  <ImageBackground source={require('../../assets/additem background.jpg')} style={{ flex: 1 }} resizeMode="cover">
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={{ padding: 18 }}>
          <View style={styles.card}>
      <Text style={styles.label}>Dish Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />

      <Text style={styles.label}>Course</Text>
      <View style={styles.courseRow}>
        {COURSES.map(c => (
          <TouchableOpacity key={c} style={[styles.courseBtn, course === c && styles.courseBtnActive]} onPress={() => setCourse(c)}>
            <Text style={[styles.courseBtnText, course === c && styles.courseBtnTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Price (R)</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />

      <Text style={styles.label}>Image URL (optional)</Text>
      <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} placeholder="https://...jpg" />

      <View style={{ marginTop: 10 }}>
        <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.midBrown }]} onPress={async () => {
          const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
          // permission result may have 'granted' or 'status'
          if ((perm as any).granted === false || (perm as any).status === 'denied') {
            Alert.alert('Permission required', 'We need permission to access your photos.');
            return;
          }
          const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 0.7 });
          // modern result shape: { canceled: boolean, assets: [{ uri, ... }] }
          if ((res as any).canceled) return;
          const assets = (res as any).assets;
          const uri = assets && assets.length > 0 ? assets[0].uri : undefined;
          if (uri) setPickedUri(uri);
        }}>
          <Text style={styles.addBtnText}>Pick an image from device</Text>
        </TouchableOpacity>

        {pickedUri ? (
          <Image source={{ uri: pickedUri }} style={{ width: 200, height: 140, marginTop: 8, borderRadius: 8 }} />
        ) : null}
      </View>

      <View style={{ marginVertical: 12 }}>
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>Add to Menu</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontWeight: '700', marginTop: 10 }}>Current items</Text>
      {items.map((i: MenuItem) => (
        <View key={i.id} style={styles.itemRow}>
          <Text>{i.name} — R{i.price.toFixed(2)}</Text>
          <TouchableOpacity onPress={() => handleRemove(i.id)} style={styles.removeBtn}><Text style={styles.removeBtnText}>Remove</Text></TouchableOpacity>
        </View>
      ))}
          <Text style={styles.credit}>Background image: provided by user</Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: colors.beige },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },
  card: { backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 12, padding: 12 },
  credit: { marginTop: 12, fontSize: 12, color: '#eee', textAlign: 'center' },
  label: { marginTop: 8, fontWeight: '700' },
  input: { backgroundColor: '#fff', padding: 8, borderRadius: 6, marginTop: 6 },
  courseRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }
  ,courseBtn: { paddingVertical: 8, paddingHorizontal: 10, backgroundColor: '#fff', borderRadius: 6 },
  courseBtnActive: { backgroundColor: colors.midBrown },
  courseBtnText: { color: colors.text, fontWeight: '700' },
  courseBtnTextActive: { color: '#fff' },
  addBtn: { backgroundColor: colors.darkBrown, padding: 12, borderRadius: 8, alignItems: 'center' },
  addBtnText: { color: '#fff', fontWeight: '800' },
  removeBtn: { backgroundColor: '#fff', padding: 8, borderRadius: 6, borderColor: '#faa', borderWidth: 1 },
  removeBtnText: { color: '#a00', fontWeight: '700' }
});
