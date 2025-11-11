import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../theme';

export default function Logo({ size = 56 }: { size?: number }) {
  let logoSource: any = null;
  try {
    // try to require the asset (bundled local file)
    logoSource = require('../../assets/logo.png');
  } catch (e) {
    logoSource = null;
  }

  return (
    <View style={[styles.container, { width: size, height: size }]}> 
      {logoSource ? (
        <Image source={logoSource} style={{ width: size, height: size, resizeMode: 'contain' }} />
      ) : (
        <Text style={styles.letter}>C</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.midBrown,
    justifyContent: 'center',
    alignItems: 'center'
  },
  letter: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 22
  }
});
