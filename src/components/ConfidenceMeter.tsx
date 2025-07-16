import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfidenceMeterProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  score,
  size = 'md',
  animated = true
}) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayScore(prev => {
            if (prev >= score) {
              clearInterval(interval);
              return score;
            }
            return prev + 1;
          });
        }, 20);
        return () => clearInterval(interval);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setDisplayScore(score);
    }
  }, [score, animated]);

  const getColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-perceive-gold';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStrokeColor = (score: number) => {
    if (score >= 90) return 'stroke-green-400';
    if (score >= 80) return 'stroke-perceive-gold';
    if (score >= 70) return 'stroke-yellow-400';
    return 'stroke-red-400';
  };

  const sizeConfig = {
    sm: { radius: 34, strokeWidth: 4, percentFont: 'text-lg', labelFont: 'text-xs', box: 88 },
    md: { radius: 48, strokeWidth: 6, percentFont: 'text-2xl', labelFont: 'text-sm', box: 120 },
    lg: { radius: 68, strokeWidth: 7, percentFont: 'text-4xl', labelFont: 'text-base', box: 160 }
  };

  const config = sizeConfig[size];
  const circumference = 2 * Math.PI * config.radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: config.box, height: config.box }}
    >
      <svg
        width={config.box}
        height={config.box}
        className="absolute top-0 left-0 transform -rotate-90"
        style={{ display: 'block' }}
      >
        {/* Background circle */}
        <circle
          cx={config.box / 2}
          cy={config.box / 2}
          r={config.radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          className="text-gray-700"
        />
        {/* Progress circle */}
        <motion.circle
          cx={config.box / 2}
          cy={config.box / 2}
          r={config.radius}
          fill="none"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          className={getStrokeColor(score)}
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      {/* Centered text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
        <span className={`font-bold ${config.percentFont} ${getColor(score)} leading-none`} style={{ lineHeight: 1 }}>
          {displayScore}%
        </span>
        <span className={`${config.labelFont} text-gray-400 mt-1 truncate max-w-full`} style={{ lineHeight: 1.1 }}>
          confidence
        </span>
      </div>
    </div>
  );
};

export default ConfidenceMeter;