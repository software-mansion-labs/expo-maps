import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ExampleListItem {
  onExampleSelect: () => any;
  name: string;
}

export default function ExampleListItem({
  onExampleSelect,
  name,
}: ExampleListItem) {
  return (
    <TouchableOpacity onPress={onExampleSelect}>
      <View style={styles.exampleListItem}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  exampleListItem: {
    height: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#999999',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
