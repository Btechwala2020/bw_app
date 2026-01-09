import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={[
        '#020617', // dark
        '#030a1f', // dark-soft
      ]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      {/* GREEN GLOW SHAPES */}
      <View style={[styles.shape, styles.shape1]} />
      <View style={[styles.shape, styles.shape2]} />
      <View style={[styles.shape, styles.shape3]} />

      {children}
    </LinearGradient>
  );
};

export default GradientBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* ===== SHARED SHAPE ===== */
  shape: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.22,
  },

  /* ===== SAME AS CSS SHAPES ===== */
  shape1: {
    width: 280,
    height: 280,
    backgroundColor: 'rgba(207, 36, 65, 0.55)',
    top: -120,
    left: -120,
  },

  shape2: {
    width: 240,
    height: 240,
    backgroundColor: 'rgba(207, 36, 36, 0.35)',
    right: -120,
    top: '35%',
  },

  shape3: {
    width: 260,
    height: 260,
    backgroundColor: 'rgba(207, 36, 36, 0.25)',
    bottom: -140,
    left: '40%',
  },
});
