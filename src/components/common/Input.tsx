import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  rightIcon?: React.ReactNode;
  labelColor?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  rightIcon,
  labelColor = '#333',
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text
          className="text-sm font-medium mb-2"
          style={{ color: labelColor }}
        >
          {label}
        </Text>
      )}
      <View
        className={[
          'flex-row items-center border rounded-lg bg-white',
          isFocused ? 'border-2 border-blue-500' : 'border border-neutral-200',
          error ? 'border-red-500' : '',
        ].join(' ')}
      >
        <TextInput
          className="flex-1 px-4 py-3 text-base text-neutral-800"
          placeholderTextColor="#999"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon && <View className="pr-3">{rightIcon}</View>}
      </View>
      {error && (
        <Text className="text-xs text-red-500 mt-1 ml-1">{error}</Text>
      )}
    </View>
  );
};

export default Input;