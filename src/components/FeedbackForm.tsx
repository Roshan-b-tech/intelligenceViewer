import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Star, Flag, MessageCircle } from 'lucide-react';
import { Feedback } from '../types';

interface FeedbackFormProps {
  reportId: string;
  onSubmit: (feedback: Feedback) => void;
  onClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ reportId, onSubmit, onClose }) => {
  const [comment, setComment] = useState('');
  const [flaggedSection, setFlaggedSection] = useState('');
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      const feedback: Feedback = {
        reportId,
        userComment: comment,
        flaggedSection: flaggedSection || undefined,
        rating: rating || undefined,
      };

      await onSubmit(feedback);
      // Do not call onClose here; let parent handle closing after showing success popup
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-4 sm:p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="w-5 h-5 text-perceive-gold" />
        <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text)]">
          Executive Feedback
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[var(--color-text)] mb-2">
            Report Quality Rating
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`p-1 sm:p-1.5 rounded transition-colors ${star <= rating
                  ? 'text-perceive-gold'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                  }`}
              >
                <Star className="w-6 h-6" fill={star <= rating ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-xs sm:text-sm font-medium text-[var(--color-text)] mb-2">
            Comments & Suggestions
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your insights on report quality, accuracy, or suggested improvements..."
            className="w-full h-28 sm:h-32 px-3 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-perceive-purple/50 focus:border-transparent resize-none text-xs sm:text-sm"
            required
          />
        </div>

        {/* Flagged Section */}
        <div>
          <label htmlFor="flagged" className="block text-xs sm:text-sm font-medium text-[var(--color-text)] mb-2">
            <div className="flex items-center space-x-2">
              <Flag className="w-4 h-4 text-red-400" />
              <span>Flag Specific Section (Optional)</span>
            </div>
          </label>
          <input
            id="flagged"
            type="text"
            value={flaggedSection}
            onChange={(e) => setFlaggedSection(e.target.value)}
            placeholder="e.g., 'Market analysis section' or 'Source reliability data'"
            className="w-full px-3 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-perceive-purple/50 focus:border-transparent text-xs sm:text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-2 sm:pt-4">
          <button
            type="submit"
            disabled={submitting || !comment.trim()}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 sm:py-2 bg-perceive-purple hover:bg-perceive-purple-light disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-xs sm:text-sm"
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? 'Submitting...' : 'Submit Feedback'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-gray-400 rounded-lg transition-colors text-xs sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default FeedbackForm;