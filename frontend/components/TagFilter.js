import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TagFilter = ({ tags = [], selectedTags = [], onChange }) => {
  const toggleTag = (tagName) => {
    if (selectedTags.includes(tagName)) {
      onChange(selectedTags.filter((t) => t !== tagName));
    } else {
      onChange([...selectedTags, tagName]);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Filter op tags:</Text>
      <View style={styles.tagContainer}>
        {tags.map((tag) => (
          <TouchableOpacity
            key={tag.id}
            style={[
              styles.tag,
              selectedTags.includes(tag.name) && styles.tagSelected,
            ]}
            onPress={() => toggleTag(tag.name)}
          >
            <Text
              style={[
                styles.tagText,
                selectedTags.includes(tag.name) && styles.tagTextSelected,
              ]}
            >
              {tag.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TagFilter;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagSelected: {
    backgroundColor: '#007bff',
  },
  tagText: {
    color: '#333',
    fontWeight: '500',
  },
  tagTextSelected: {
    color: '#fff',
  },
});
