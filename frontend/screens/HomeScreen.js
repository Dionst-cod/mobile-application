import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '../config/apiconfig';
import ResourceCard from '../components/ResourceCard';
import TagFilter from '../components/TagFilter';
import SearchBar from '../components/SearchBar'; 

const HomeScreen = () => {
  const navigation = useNavigation();
  const [resources, setResources] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    try {
      const userRes = await axios.get(`${API_BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userRes.data);

      const resRes = await axios.get(`${API_BASE_URL}/resources`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources(resRes.data);

      const favRes = await axios.get(`${API_BASE_URL}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(favRes.data);

      const tagRes = await axios.get(`${API_BASE_URL}/tags`);
      setTags(tagRes.data);
    } catch (error) {
      console.error('Fout bij laden:', error.response?.data || error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const isFavorite = (resourceId) => favorites.includes(resourceId);

  const toggleFavorite = async (resourceId) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    try {
      await axios.post(`${API_BASE_URL}/favorites/${resourceId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const favRes = await axios.get(`${API_BASE_URL}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(favRes.data);
    } catch (error) {
      console.error('Favoriet toggle fout:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (err) {
      Alert.alert('Fout bij uitloggen', err.message);
    }
  };

  const filterResources = () => {
    return resources.filter((res) => {
      const matchesSearch =
        res.title.toLowerCase().includes(search.toLowerCase()) ||
        res.description?.toLowerCase().includes(search.toLowerCase());

      const matchesFavorite = !showOnlyFavorites || isFavorite(res.id);

      const matchesTags =
        selectedTags.length === 0 ||
        (res.resourceTags && res.resourceTags.some(rt => selectedTags.includes(rt.tag.name)));

      return matchesSearch && matchesFavorite && matchesTags;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcomeText}>Welkom, <Text style={styles.name}>{user?.displayName || 'gebruiker'}</Text>!</Text>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Zoek op titel of beschrijving..."
      />

      <TagFilter
        tags={tags}
        selectedTags={selectedTags}
        onChange={setSelectedTags}
      />

      <TouchableOpacity onPress={() => setShowOnlyFavorites(prev => !prev)}>
        <Text style={styles.toggleText}>{showOnlyFavorites ? 'Toon alles' : 'Toon alleen favorieten'}</Text>
      </TouchableOpacity>

      {filterResources().length === 0 ? (
        <Text style={styles.emptyText}>Geen bronnen gevonden.</Text>
      ) : (
        filterResources().map((res) => (
          <View key={res.id} style={styles.cardWrapper}>
            <ResourceCard
              item={res}
              isFavorite={isFavorite(res.id)}
              onToggleFavorite={() => toggleFavorite(res.id)}
            />
          </View>
        ))
      )}

      <TouchableOpacity onPress={() => navigation.navigate("AddResource")}>
        <Text style={styles.actionLink}>➕ Deel een resource</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Profiel")}>
        <Text style={styles.actionLink}>👤 Ga naar profiel</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout}>
        <Text style={[styles.actionLink, { color: 'red' }]}>🚪 Uitloggen</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    minHeight: '100%'
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  name: {
    color: '#007bff',
  },
  toggleText: {
    color: '#007bff',
    marginBottom: 16,
    fontWeight: '600',
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
    fontStyle: 'italic',
  },
  cardWrapper: {
    marginBottom: 12,
  },
  actionLink: {
    color: '#007bff',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center'
  },
});
