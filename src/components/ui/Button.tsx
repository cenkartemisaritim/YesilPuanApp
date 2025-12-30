import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  View,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const getVariantStyles = (variant: ButtonVariant, disabled?: boolean) => {
  const baseOpacity = disabled ? 'opacity-50' : '';

  switch (variant) {
    case 'primary':
      return {
        container: `bg-primary-500 ${baseOpacity}`,
        text: 'text-white',
      };
    case 'secondary':
      return {
        container: `bg-secondary-500 ${baseOpacity}`,
        text: 'text-white',
      };
    case 'outline':
      return {
        container: `border-2 border-primary-500 bg-transparent ${baseOpacity}`,
        text: 'text-primary-500',
      };
    case 'ghost':
      return {
        container: `bg-transparent ${baseOpacity}`,
        text: 'text-primary-500',
      };
    case 'danger':
      return {
        container: `bg-error ${baseOpacity}`,
        text: 'text-white',
      };
    default:
      return {
        container: `bg-primary-500 ${baseOpacity}`,
        text: 'text-white',
      };
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'sm':
      return {
        container: 'px-4 py-2',
        text: 'text-sm',
      };
    case 'md':
      return {
        container: 'px-6 py-3',
        text: 'text-base',
      };
    case 'lg':
      return {
        container: 'px-8 py-4',
        text: 'text-lg',
      };
    default:
      return {
        container: 'px-6 py-3',
        text: 'text-base',
      };
  }
};

export const Button: React.FC<ButtonProps> = ({
  title,
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className,
  ...props
}) => {
  const variantStyles = getVariantStyles(variant, disabled || loading);
  const sizeStyles = getSizeStyles(size);

  const renderContent = () => {
    if (children) {
      return typeof children === 'string' ? (
        <Text className={`font-semibold ${variantStyles.text} ${sizeStyles.text}`}>
          {children}
        </Text>
      ) : (
        children
      );
    }

    return (
      <Text className={`font-semibold ${variantStyles.text} ${sizeStyles.text}`}>
        {title}
      </Text>
    );
  };

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      className={`
        flex-row items-center justify-center rounded-xl
        ${variantStyles.container}
        ${sizeStyles.container}
        ${fullWidth ? 'w-full' : ''}
        ${className || ''}
      `}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? '#4CAF50' : '#FFFFFF'}
        />
      ) : (
        <>
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          {renderContent()}
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
