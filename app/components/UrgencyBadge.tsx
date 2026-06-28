'use client';

interface UrgencyBadgeProps {
  upvotes: number;
  createdAt: string;
}

export default function UrgencyBadge({ upvotes, createdAt }: UrgencyBadgeProps) {
  const calculateUrgency = () => {
    const daysOld = Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
    const score = (upvotes * 10) + (daysOld * 5);
    
    if (score > 50) return { level: 'Critical', color: 'bg-red-600 text-white', emoji: '🔴' };
    if (score > 25) return { level: 'High', color: 'bg-orange-500 text-white', emoji: '🟠' };
    if (score > 10) return { level: 'Medium', color: 'bg-yellow-500 text-white', emoji: '🟡' };
    return { level: 'Low', color: 'bg-green-500 text-white', emoji: '🟢' };
  };

  const urgency = calculateUrgency();

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgency.color}`}>
      {urgency.emoji} {urgency.level}
    </span>
  );
}
