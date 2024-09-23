import React from 'react';
import {TextInputProps, View, Text, TextInput} from 'react-native';
import {styles} from './styles';

interface NativeInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const NativeInput: React.FC<NativeInputProps> = ({label, error, ...props}) => {
  return (
    <View style={styles.inputWrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.errorInput]}
        {...props}
      />
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};

export {NativeInput};
