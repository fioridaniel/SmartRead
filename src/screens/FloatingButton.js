import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const FloatingButton = ({ onPress, icon, color = '#2196F3' }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.touchableOpacityStyle, { backgroundColor: color }]}
    >
      <View style={styles.floatingButtonStyle}>
        {icon ? (
          icon
        ) : (
          <Text style={styles.iconStyle}>+</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    borderRadius: 28,
    elevation: 8, // Para sombra no Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  floatingButtonStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    fontSize: 30,
    color: 'white',
  },
});

export default FloatingButton;