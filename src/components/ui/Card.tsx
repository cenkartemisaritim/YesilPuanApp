import React from 'react';
import { View, ViewProps, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

interface PressableCardProps extends TouchableOpacityProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const getVariantStyles = (variant: CardProps['variant']) => {
  switch (variant) {
    case 'elevated':
      return 'bg-surface shadow-lg shadow-black/10';
    case 'outlined':
      return 'bg-surface border border-border';
    default:
      return 'bg-surface shadow-sm shadow-black/5';
  }
};

const getPaddingStyles = (padding: CardProps['padding']) => {
  switch (padding) {
    case 'none':
      return '';
    case 'sm':
      return 'p-3';
    case 'lg':
      return 'p-6';
    default:
      return 'p-4';
  }
};

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <View
      className={`
        rounded-2xl
        ${getVariantStyles(variant)}
        ${getPaddingStyles(padding)}
        ${className || ''}
      `}
      {...props}
    >
      {children}
    </View>
  );
};

export const PressableCard: React.FC<PressableCardProps> = ({
  variant = 'default',
  padding = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`
        rounded-2xl
        ${getVariantStyles(variant)}
        ${getPaddingStyles(padding)}
        ${className || ''}
      `}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Card;
