import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  loading = false,
  variant = 'primary',
  disabled,
  className = 'bg-orange-600 rounded-xl py-4 mb-6 shadow-lg',
  ...props
}) => {
  let variantClass = '';
  let textClass = 'text-base font-semibold';

  if (variant === 'primary') {
    variantClass = 'bg-orange-600';
    textClass += ' text-white';
  } else if (variant === 'secondary') {
    variantClass = 'bg-green-500';
    textClass += ' text-white';
  } else if (variant === 'outline') {
    variantClass = 'bg-transparent border-2 border-orange-600';
    textClass += ' text-orange-600';
  }

  if (disabled || loading) {
    variantClass += ' opacity-50';
  }

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center min-h-12 rounded-xl px-6 py-4 mb-6 shadow-lg ${variantClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#ea580c' : '#fff'} size="small" />
      ) : (
        <Text className={textClass}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;