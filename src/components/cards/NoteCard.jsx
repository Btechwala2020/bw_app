import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';

const NoteCard = ({ title, price }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: 'https://via.placeholder.com/300x180' }}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
    </TouchableOpacity>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  card: {
    width: 180,
    backgroundColor: COLORS.glass,
    borderRadius: 18,
    marginLeft: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 14,
    marginBottom: 10,
  },
  title: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },
  price: {
    color: COLORS.success,
    marginTop: 6,
    fontWeight: '600',
  },
});
