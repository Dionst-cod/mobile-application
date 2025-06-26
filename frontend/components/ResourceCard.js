import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RatingStars from './RatingStars';

const ResourceCard = ({ item, isFavorite, onToggleFavorite }) => {
  const [token, setToken] = useState(null);
  const [rating, setRating] = useState(item.rating || 0);
  console.log("Item ID:", item.id, "isFavorite?", isFavorite);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  const handleRating = async (score) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/resources/${item.id}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ score }),
      });

      if (!response.ok) throw new Error('Rating mislukt');

      const data = await response.json();

      setRating(score);

    } catch (error) {
      console.error("Fout bij stemmen:", error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <RatingStars
          score={rating}
          editable={true}
          onRate={handleRating}
        />
        <Text>{item.description}</Text>
      </View>
      <TouchableOpacity onPress={() => onToggleFavorite(item.id)}>
        <Icon
          name={isFavorite ? 'star' : 'star-border'}
          size={28}
          color={isFavorite ? '#FFD700' : '#888'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ResourceCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
});
