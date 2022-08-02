import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ExampleListItem {
  onExampleSelect: () => void;
  name: string;
}

export default function ExampleListItem({
  onExampleSelect,
  name,
}: ExampleListItem) {
  return (
    <TouchableOpacity onPress={onExampleSelect} style={{backgroundColor:"transparent"}}>
      <View style={styles.exampleListItem}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  exampleListItem: {
    flex:1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:10,
    marginHorizontal:30,
    borderRadius:10,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation:8,
    shadowColor:"rgba(0,0,0,0.36)",
    backgroundColor:"white"
  },
  nameText: {
    fontSize: 16,
    elevation:30,
  },
});
