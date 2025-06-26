import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RatingStar = ({ score = 0, max = 5, size = 20, editable = false, onRate }) => {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    const star = (
      <TouchableOpacity
        key={i}
        disabled={!editable}
        onPress={() => editable && onRate && onRate(i)}
      >
        <Icon
          name={i <= score ? 'star' : 'star-border'}
          size={size}
          color={i <= score ? '#FFD700' : '#ccc'}
          style={{ marginRight: 2 }}
        />
      </TouchableOpacity>
    );
    stars.push(star);
  }

  return <View style={styles.container}>{stars}</View>;
};

export default RatingStar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 4,
  },
});
