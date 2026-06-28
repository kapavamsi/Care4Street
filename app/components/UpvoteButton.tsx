'use client';

import { useState, useEffect } from 'react';

interface UpvoteButtonProps {
  reportId: string;
  initialUpvotes: number;
}

export default function UpvoteButton({ reportId, initialUpvotes }: UpvoteButtonProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [loading, setLoading] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  // Check if user already upvoted
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const key = `upvoted_${reportId}`;
      setHasUpvoted(localStorage.getItem(key) === 'true');
    }
  }, [reportId]);

  const handleUpvote = async () => {
    if (loading || hasUpvoted) return;

    setLoading(true);
    try {
      let userId = localStorage.getItem('userId');
      if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem('userId', userId);
      }

      const response = await fetch('/api/reports/upvote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId, userId })
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 409) {
          setHasUpvoted(true);
          localStorage.setItem(`upvoted_${reportId}`, 'true');
        }
        throw new Error(data.error || 'Failed to upvote');
      }

      const data = await response.json();
      setUpvotes(data.upvoteCount);
      setHasUpvoted(true);
      localStorage.setItem(`upvoted_${reportId}`, 'true');
    } catch (error) {
      console.error('Error upvoting:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={loading || hasUpvoted}
      className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
        hasUpvoted
          ? 'bg-blue-100 text-blue-700'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
      }`}
    >
      <span>👍</span>
      <span>{upvotes}</span>
    </button>
  );
}
