import React from 'react';
import { Switch, View, StyleSheet, Text } from 'react-native';

interface SwitchContainerProps {
  title: string;
  onValueChange: () => void;
  value: boolean;
  textColor: string;
}

export default function SwitchContainer({
  title,
  onValueChange,
  value,
  textColor,
}: SwitchContainerProps) {
  return (
    <View style={styles.switchContainer}>
      <Text style={{ color: textColor }}>{title}</Text>
      <Switch
        value={value}
        onValueChange={() => onValueChange()}
        trackColor={{ true: 'green', false: 'red' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
