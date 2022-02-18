import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';

export default function SettingsContainer({
  children,
  style,
}: PropsWithChildren<{}> & ViewProps) {
  return <View style={[styles.settingsContainer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  settingsContainer: {
    padding: 20,
    backgroundColor: '#808080',
  },
});
