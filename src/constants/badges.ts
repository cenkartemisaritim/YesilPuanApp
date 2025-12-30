export interface Badge {
  id: string;
  nameKey: string;
  descriptionKey: string;
  icon: string;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirement: {
    type: string;
    value: number;
    unit?: string;
  };
}

export const badges: Badge[] = [
  {
    id: 'first_step',
    nameKey: 'badges.first_step.name',
    descriptionKey: 'badges.first_step.description',
    icon: '🌱',
    xpReward: 50,
    rarity: 'common',
    requirement: { type: 'stays', value: 1 },
  },
  {
    id: 'water_friend',
    nameKey: 'badges.water_friend.name',
    descriptionKey: 'badges.water_friend.description',
    icon: '💧',
    xpReward: 100,
    rarity: 'common',
    requirement: { type: 'water_below_benchmark', value: 3 },
  },
  {
    id: 'energy_master',
    nameKey: 'badges.energy_master.name',
    descriptionKey: 'badges.energy_master.description',
    icon: '⚡',
    xpReward: 100,
    rarity: 'common',
    requirement: { type: 'electricity_below_benchmark', value: 3 },
  },
  {
    id: 'eco_traveler',
    nameKey: 'badges.eco_traveler.name',
    descriptionKey: 'badges.eco_traveler.description',
    icon: '🌍',
    xpReward: 300,
    rarity: 'rare',
    requirement: { type: 'countries', value: 5 },
  },
  {
    id: 'top10_regional',
    nameKey: 'badges.top10_regional.name',
    descriptionKey: 'badges.top10_regional.description',
    icon: '🏆',
    xpReward: 200,
    rarity: 'rare',
    requirement: { type: 'leaderboard_rank', value: 10, unit: 'regional' },
  },
  {
    id: 'tree_100',
    nameKey: 'badges.tree_100.name',
    descriptionKey: 'badges.tree_100.description',
    icon: '🌳',
    xpReward: 500,
    rarity: 'epic',
    requirement: { type: 'trees_equivalent', value: 100 },
  },
  {
    id: 'platinum_member',
    nameKey: 'badges.platinum_member.name',
    descriptionKey: 'badges.platinum_member.description',
    icon: '💎',
    xpReward: 1000,
    rarity: 'legendary',
    requirement: { type: 'stays', value: 50 },
  },
  {
    id: 'perfectionist',
    nameKey: 'badges.perfectionist.name',
    descriptionKey: 'badges.perfectionist.description',
    icon: '🎯',
    xpReward: 250,
    rarity: 'rare',
    requirement: { type: 'consecutive_80_plus', value: 10 },
  },
  {
    id: 'fire_streak',
    nameKey: 'badges.fire_streak.name',
    descriptionKey: 'badges.fire_streak.description',
    icon: '🔥',
    xpReward: 400,
    rarity: 'epic',
    requirement: { type: 'active_streak', value: 30 },
  },
  {
    id: 'star_guest',
    nameKey: 'badges.star_guest.name',
    descriptionKey: 'badges.star_guest.description',
    icon: '🌟',
    xpReward: 300,
    rarity: 'rare',
    requirement: { type: '5star_90_plus', value: 1 },
  },
  {
    id: 'carbon_hero',
    nameKey: 'badges.carbon_hero.name',
    descriptionKey: 'badges.carbon_hero.description',
    icon: '🌎',
    xpReward: 350,
    rarity: 'epic',
    requirement: { type: 'carbon_saved', value: 100, unit: 'kg' },
  },
  {
    id: 'social_butterfly',
    nameKey: 'badges.social_butterfly.name',
    descriptionKey: 'badges.social_butterfly.description',
    icon: '📢',
    xpReward: 150,
    rarity: 'common',
    requirement: { type: 'shares', value: 10 },
  },
  {
    id: 'early_adopter',
    nameKey: 'badges.early_adopter.name',
    descriptionKey: 'badges.early_adopter.description',
    icon: '🚀',
    xpReward: 200,
    rarity: 'rare',
    requirement: { type: 'join_before', value: 2026 },
  },
  {
    id: 'consistency_king',
    nameKey: 'badges.consistency_king.name',
    descriptionKey: 'badges.consistency_king.description',
    icon: '👑',
    xpReward: 600,
    rarity: 'epic',
    requirement: { type: 'avg_score_above', value: 75 },
  },
  {
    id: 'referral_master',
    nameKey: 'badges.referral_master.name',
    descriptionKey: 'badges.referral_master.description',
    icon: '🤝',
    xpReward: 400,
    rarity: 'rare',
    requirement: { type: 'referrals', value: 10 },
  },
  {
    id: 'night_owl',
    nameKey: 'badges.night_owl.name',
    descriptionKey: 'badges.night_owl.description',
    icon: '🦉',
    xpReward: 100,
    rarity: 'common',
    requirement: { type: 'total_nights', value: 100 },
  },
  {
    id: 'green_champion',
    nameKey: 'badges.green_champion.name',
    descriptionKey: 'badges.green_champion.description',
    icon: '🏅',
    xpReward: 800,
    rarity: 'legendary',
    requirement: { type: 'top1_any_scope', value: 1 },
  },
  {
    id: 'hotel_hopper',
    nameKey: 'badges.hotel_hopper.name',
    descriptionKey: 'badges.hotel_hopper.description',
    icon: '🏨',
    xpReward: 250,
    rarity: 'rare',
    requirement: { type: 'different_hotels', value: 20 },
  },
  {
    id: 'savings_master',
    nameKey: 'badges.savings_master.name',
    descriptionKey: 'badges.savings_master.description',
    icon: '💰',
    xpReward: 300,
    rarity: 'rare',
    requirement: { type: 'total_savings_kwh', value: 500 },
  },
  {
    id: 'eco_legend',
    nameKey: 'badges.eco_legend.name',
    descriptionKey: 'badges.eco_legend.description',
    icon: '🌿',
    xpReward: 2000,
    rarity: 'legendary',
    requirement: { type: 'all_badges', value: 19 },
  },
];

export const getRarityColor = (rarity: Badge['rarity']): string => {
  switch (rarity) {
    case 'common':
      return '#9E9E9E';
    case 'rare':
      return '#2196F3';
    case 'epic':
      return '#9C27B0';
    case 'legendary':
      return '#FF9800';
    default:
      return '#9E9E9E';
  }
};
