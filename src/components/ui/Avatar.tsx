import React from 'react';
import { View, Image, Text } from 'react-native';

export interface AvatarProps {
  source?: string | null;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  badge?: React.ReactNode;
  className?: string;
}

const getSizeStyles = (size: AvatarProps['size']) => {
  switch (size) {
    case 'xs':
      return { container: 'w-8 h-8', text: 'text-xs' };
    case 'sm':
      return { container: 'w-10 h-10', text: 'text-sm' };
    case 'lg':
      return { container: 'w-16 h-16', text: 'text-xl' };
    case 'xl':
      return { container: 'w-24 h-24', text: 'text-3xl' };
    default:
      return { container: 'w-12 h-12', text: 'text-base' };
  }
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const getColorFromName = (name: string): string => {
  const colors = [
    '#4CAF50', '#2196F3', '#FF9800', '#9C27B0',
    '#00BCD4', '#FF5722', '#3F51B5', '#E91E63',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name = '',
  size = 'md',
  badge,
  className,
}) => {
  const sizeStyles = getSizeStyles(size);
  const initials = getInitials(name);
  const backgroundColor = getColorFromName(name);

  return (
    <View className={`relative ${className || ''}`}>
      {source ? (
        <Image
          source={{ uri: source }}
          className={`${sizeStyles.container} rounded-full`}
          resizeMode="cover"
        />
      ) : (
        <View
          className={`${sizeStyles.container} rounded-full items-center justify-center`}
          style={{ backgroundColor }}
        >
          <Text className={`${sizeStyles.text} font-semibold text-white`}>
            {initials}
          </Text>
        </View>
      )}
      {badge && (
        <View className="absolute -bottom-1 -right-1">
          {badge}
        </View>
      )}
    </View>
  );
};

export default Avatar;
