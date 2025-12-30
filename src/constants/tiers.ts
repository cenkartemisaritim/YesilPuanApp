export interface Tier {
  level: number;
  nameKey: string;
  icon: string;
  minXp: number;
  maxXp: number;
  color: string;
  benefits: string[];
}

export const tiers: Tier[] = [
  {
    level: 1,
    nameKey: 'tiers.green_curious',
    icon: '🌱',
    minXp: 0,
    maxXp: 499,
    color: '#A5D6A7',
    benefits: ['tiers.benefits.basic_access'],
  },
  {
    level: 2,
    nameKey: 'tiers.eco_traveler',
    icon: '🚶',
    minXp: 500,
    maxXp: 1499,
    color: '#81C784',
    benefits: ['tiers.benefits.basic_access', 'tiers.benefits.leaderboard_access'],
  },
  {
    level: 3,
    nameKey: 'tiers.green_voyager',
    icon: '✈️',
    minXp: 1500,
    maxXp: 2999,
    color: '#66BB6A',
    benefits: [
      'tiers.benefits.basic_access',
      'tiers.benefits.leaderboard_access',
      'tiers.benefits.exclusive_tips',
    ],
  },
  {
    level: 4,
    nameKey: 'tiers.eco_champion',
    icon: '🏆',
    minXp: 3000,
    maxXp: 5999,
    color: '#4CAF50',
    benefits: [
      'tiers.benefits.basic_access',
      'tiers.benefits.leaderboard_access',
      'tiers.benefits.exclusive_tips',
      'tiers.benefits.bonus_points_10',
    ],
  },
  {
    level: 5,
    nameKey: 'tiers.sustainability_master',
    icon: '🌍',
    minXp: 6000,
    maxXp: 9999,
    color: '#43A047',
    benefits: [
      'tiers.benefits.basic_access',
      'tiers.benefits.leaderboard_access',
      'tiers.benefits.exclusive_tips',
      'tiers.benefits.bonus_points_15',
      'tiers.benefits.priority_support',
    ],
  },
  {
    level: 6,
    nameKey: 'tiers.green_ambassador',
    icon: '🌿',
    minXp: 10000,
    maxXp: 19999,
    color: '#388E3C',
    benefits: [
      'tiers.benefits.basic_access',
      'tiers.benefits.leaderboard_access',
      'tiers.benefits.exclusive_tips',
      'tiers.benefits.bonus_points_20',
      'tiers.benefits.priority_support',
      'tiers.benefits.exclusive_rewards',
    ],
  },
  {
    level: 7,
    nameKey: 'tiers.eco_legend',
    icon: '👑',
    minXp: 20000,
    maxXp: Infinity,
    color: '#2E7D32',
    benefits: [
      'tiers.benefits.basic_access',
      'tiers.benefits.leaderboard_access',
      'tiers.benefits.exclusive_tips',
      'tiers.benefits.bonus_points_25',
      'tiers.benefits.priority_support',
      'tiers.benefits.exclusive_rewards',
      'tiers.benefits.vip_events',
    ],
  },
];

export function getTierByXp(xp: number): Tier {
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (xp >= tiers[i].minXp) {
      return tiers[i];
    }
  }
  return tiers[0];
}

export function getNextTier(currentTier: Tier): Tier | null {
  const index = tiers.findIndex((t) => t.level === currentTier.level);
  if (index < tiers.length - 1) {
    return tiers[index + 1];
  }
  return null;
}

export function getXpProgress(xp: number): {
  currentTier: Tier;
  nextTier: Tier | null;
  progress: number;
  xpToNext: number;
} {
  const currentTier = getTierByXp(xp);
  const nextTier = getNextTier(currentTier);

  if (!nextTier) {
    return {
      currentTier,
      nextTier: null,
      progress: 100,
      xpToNext: 0,
    };
  }

  const tierRange = nextTier.minXp - currentTier.minXp;
  const xpInTier = xp - currentTier.minXp;
  const progress = Math.min(100, (xpInTier / tierRange) * 100);
  const xpToNext = nextTier.minXp - xp;

  return {
    currentTier,
    nextTier,
    progress,
    xpToNext,
  };
}
