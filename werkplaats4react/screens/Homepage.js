import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Mock data for demonstration purposes
// In a real app, this would come from your API
const MOCK_RESOURCES = [
  {
    id: '1',
    title: 'React Native Crash Course',
    type: 'video',
    description: 'Complete guide to React Native development',
    author: 'S1234567',
    rating: 4.5,
    tags: ['React Native', 'Mobile Development', 'JavaScript'],
    thumbnail: 'https://via.placeholder.com/150',
    duration: '45 min'
  },
  {
    id: '2',
    title: 'Database Design Fundamentals',
    type: 'book',
    description: 'Learn how to design efficient databases',
    author: 'S7654321',
    rating: 4.8,
    tags: ['Database', 'SQL', 'Design'],
    thumbnail: 'https://via.placeholder.com/150',
    isbn: '978-3-16-148410-0'
  },
  {
    id: '3',
    title: 'Advanced Docker Concepts',
    type: 'article',
    description: 'Deep dive into Docker containers and orchestration',
    author: 'S2468135',
    rating: 4.2,
    tags: ['Docker', 'DevOps', 'Containers'],
    thumbnail: 'https://via.placeholder.com/150',
    readTime: '15 min'
  },
  {
    id: '4',
    title: 'Complete Web Development Bootcamp',
    type: 'course',
    description: 'From beginner to professional web developer',
    author: 'S1357924',
    rating: 4.9,
    tags: ['Web Development', 'HTML', 'CSS', 'JavaScript'],
    thumbnail: 'https://via.placeholder.com/150',
    duration: '30 hours'
  },
];

// Resource card component
const ResourceCard = ({ item, onPress }) => {
  const renderResourceSpecifics = () => {
    switch(item.type) {
      case 'video':
        return <Text style={styles.resourceMeta}>Duration: {item.duration}</Text>;
      case 'book':
        return <Text style={styles.resourceMeta}>ISBN: {item.isbn}</Text>;
      case 'article':
        return <Text style={styles.resourceMeta}>Read time: {item.readTime}</Text>;
      case 'course':
        return <Text style={styles.resourceMeta}>Duration: {item.duration}</Text>;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.resourceType}>{item.type.toUpperCase()}</Text>
          <Text style={styles.resourceAuthor}>By: {item.author}</Text>
          {renderResourceSpecifics()}
          <Text style={styles.resourceRating}>★ {item.rating.toFixed(1)}</Text>
        </View>
        <View style={styles.tagContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Search bar component
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (text) => {
    setQuery(text);
    onSearch(text);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search resources..."
        value={query}
        onChangeText={handleSearch}
      />
    </View>
  );
};

// Filter component
const FilterSection = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'video', label: 'Videos' },
    { id: 'book', label: 'Books' },
    { id: 'article', label: 'Articles' },
    { id: 'course', label: 'Courses' },
  ];

  const handleFilterPress = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <View style={styles.filterContainer}>
      <FlatList
        horizontal
        data={filters}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === item.id && styles.activeFilterButton
            ]}
            onPress={() => handleFilterPress(item.id)}
          >
            <Text
              style={[
                styles.filterButtonText,
                activeFilter === item.id && styles.activeFilterButtonText
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const HomePage = ({ navigation }) => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    // Simulating API call with a timeout
    const fetchData = () => {
      setTimeout(() => {
        setResources(MOCK_RESOURCES);
        setFilteredResources(MOCK_RESOURCES);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const handleResourcePress = (resource) => {
    // In a complete app, this would navigate to a detail page
    console.log('Resource pressed:', resource);
    // If navigation was set up:
    // navigation.navigate('ResourceDetail', { resourceId: resource.id });
    alert(`You selected: ${resource.title}`);
  };

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setFilteredResources(resources);
    } else {
      const searchResult = resources.filter(
        (resource) =>
          resource.title.toLowerCase().includes(query.toLowerCase()) ||
          resource.description.toLowerCase().includes(query.toLowerCase()) ||
          resource.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredResources(searchResult);
    }
  };

  const handleFilterChange = (filter) => {
    if (filter === 'all') {
      setFilteredResources(resources);
    } else {
      const filtered = resources.filter((resource) => resource.type === filter);
      setFilteredResources(filtered);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>RACademic</Text>
        <Text style={styles.headerSubtitle}>Find study resources shared by HR students</Text>
      </View>

      <SearchBar onSearch={handleSearch} />
      <FilterSection onFilterChange={handleFilterChange} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
          <Text style={styles.loadingText}>Loading resources...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredResources}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ResourceCard item={item} onPress={handleResourcePress} />
          )}
          contentContainerStyle={styles.resourceList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyList}>
              <Text style={styles.emptyListText}>No resources found</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#0066CC',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  searchContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  filterContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
  },
  activeFilterButton: {
    backgroundColor: '#0066CC',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#333',
  },
  activeFilterButtonText: {
    color: 'white',
  },
  resourceList: {
    padding: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
  },
  thumbnail: {
    width: 100,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  resourceType: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: 'bold',
    marginRight: 10,
  },
  resourceAuthor: {
    fontSize: 12,
    color: '#666',
    marginRight: 10,
  },
  resourceMeta: {
    fontSize: 12,
    color: '#666',
    marginRight: 10,
  },
  resourceRating: {
    fontSize: 12,
    color: '#f8c100',
    fontWeight: 'bold',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 10,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyListText: {
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
});

export default HomePage;