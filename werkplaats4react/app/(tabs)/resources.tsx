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
];

const resource_types = ['All', 'Video', 'Book', 'Article', 'Online Course']

const ResourcesScreen = () => {
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resources, setResources] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 1000));
    setResources(DUMMY_RESOURCES);
    setIsLoading(false);
  };

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResourcePress = (resource) => {

  };

  const handleRefresh = () => {
      setRefreshing(true)
      fetchResources()
  }

  const renderResourceItem = ({ item }) => (
      <TouchableOpacity
          style={styles.resourceItem}
          onPress={() => navigation.navigate('ResourceDet', {resource:item})}
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

  const renderEmpty = () => (
    <View style={styles.center}>
      <Ionicons name="document-text-outline" size={60} color="#ccc" />
      <Text style={styles.emptyText}>Geen bronnen gevonden</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.icon} />
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
            contentContainerStyle={{ paddingHorizontal: 10 }}
        />


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
        )
        }
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  searchContainer: {
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
  icon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: { fontSize: 16, color: '#666', marginTop: 10 },
  list: { paddingHorizontal: 15, paddingBottom: 20 },
    selectedTypeBlock: {
      color: '#fff', fontWeight: '500'
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
