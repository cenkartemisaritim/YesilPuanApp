import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { getScoreColor, getScoreCategory } from '../../constants/colors';

export interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  showScore?: boolean;
  showCategory?: boolean;
  showEmoji?: boolean;
  animated?: boolean;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 10,
  color: customColor,
  showScore = true,
  showCategory = true,
  showEmoji = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const center = size / 2;

  const color = customColor || getScoreColor(progress);
  const category = getScoreCategory(progress);

  return (
    <View className="items-center justify-center">
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, ${center}, ${center})`}
        />
      </Svg>
      <View
        className="absolute items-center justify-center"
        style={{ width: size, height: size }}
      >
        {showEmoji && (
          <Text className="text-2xl mb-1">{category.emoji}</Text>
        )}
        {showScore && (
          <Text
            className="text-3xl font-bold"
            style={{ color }}
          >
            {Math.round(progress)}
          </Text>
        )}
        {showCategory && (
          <Text className="text-xs text-text-secondary mt-1">
            Yeşil Puan
          </Text>
        )}
      </View>
    </View>
  );
};

export default ProgressRing;
