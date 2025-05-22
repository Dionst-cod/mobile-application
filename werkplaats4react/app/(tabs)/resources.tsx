import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DUMMY_RESOURCES = [
    {
    id: '1',
    title: 'React Native Tutorial for Beginners',
    description: 'Learn the basics of React Native in this tutorial.',
    type: 'video',
    tags: ['react native', 'javascript', 'mobile development'],
    createdBy: 'john0042@hr.nl',
    metadata: { duration: '2h 15m' },
    rating: 4.8,
    ratingCount: 24,
  },
  {
    id: '2',
    title: 'The one and only one runs',
    description: 'where spongebob walks and runs',
    type: 'video',
    tags: ['react native', 'cartoon', 'mobile development'],
    createdBy: 'spongyFan022@hr.nl',
    metadata: { duration: '10h 59m' },
    rating: 2,
    ratingCount: 12,
  },
];

const resource_types = ['All', 'Video', 'Book', 'Article', 'Online Course']

const ResourcesScreen = () => {
  const navigation = useNavigation();
  const [filteredResources, setFilteredResources] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resources, setResources] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedType, resources]);

  const fetchResources = async () => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 1000));
    setResources(DUMMY_RESOURCES);
    setIsLoading(false);
    setRefreshing(false);
  };

  const applyFilters = () => {
    let results = [...resources];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(resource =>
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
          resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (selectedType !== 'All') {
      results = results.filter(resource => resource.type === selectedType);
    }
    setFilteredResources(results);
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedType('All')
  }

  const handleRefresh = () => {
      setRefreshing(true)
      fetchResources()
  }

  const renderResourceItem = ({ item }) => (
      <TouchableOpacity
          style={styles.resourceItem}

          >
          <View style={styles.resourceHead}>
              <Text style={styles.resourceTitle}>{item.title}</Text>
              <Text style={styles.resourceType}>{item.type}</Text>
          </View>
          <Text style={styles.resourceDescription}>{item.description}</Text>
          <Text style={styles.resourceAuthor}>gedeeld door : {item.createdBy}</Text>
      </TouchableOpacity>
  )

  const renderTypeItem = ({ item }) => (
      <TouchableOpacity
          style={[
              styles.typeBlock,
              selectedType === item && styles.selectedTypeBlock
          ]}
          onPress={() => setSelectedType(item)}
          >
          <Text style={[styles.typeText, selectedType === item && styles.selectedTypeText]}>{item}</Text>
      </TouchableOpacity>
  )

    if (isLoading && !refreshing) {
        return (
            <View style={styles.loaderContain}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        )
    }

  return (
    <View style={styles.container}>
      <View style={styles.filterContain}>
        <Text style={styles.filterTitle}>Zoek bronnen</Text>

        <View style={styles.searchContain}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Zoek op titel, beschrijving of tags..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
          ) : null}
              )

        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Zoek naar bronnen..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

        <Text style={styles.filterSub}>Filteren op type:</Text>
        <FlatList
            horizontal
            data={resource_types}
            renderItem={renderTypeItem}
            keyExtractor={item => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={ styles.typesList }
        />

        <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
          <Text style={styles.clearButtonText}>Filteren wissen</Text>
        </TouchableOpacity>
      </View>

        <Text style={styles.resultsText}>
          toont {filteredResources.length} resultaten van {resources.length} bronnen
        </Text>


        {filteredResources.length == 0 ? (
            <View style={styles.emptyContain}>
                <Ionicons name="document-text-outline" size={60} color="#ccc" />
                <Text style={styles.emptyText}>Geen bronnen gevonden - for now</Text>
            </View>
        ) : (
            <FlatList
            data={filteredResources}
            renderItem={renderResourceItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            style={styles.resourceList}
            contentContainerStyle={ styles.listCont }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#0066CC']}
              />
            }
            />
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  filterContain: {
    backgroundColor: 'white',
    margin: 15,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchContain: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: '#eee',
    borderWidth: 1,
    elevation: 2,
  },
  searchIcon: {
        marginRight: 10,
      },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
  typesList: { paddingVertical: 10 },
  listCont: { paddingBottom: 10 },
  resourceList: { flex: 1 },
  selectedTypeBlock: {
    color: '#fff', fontWeight: '500'
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  emptyContain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTypeText: {
    color: '#fff', fontWeight: '500'
  },
  resourceHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resourceItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    },
  resourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  resourceType: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  resourceDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  resourceAuthor: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  filterSub: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#007bff',
    borderRadius: 6,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  typeBlock: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  typeText: {
    fontSize: 14,
    color: '#666',
  },
});

export default ResourcesScreen;
