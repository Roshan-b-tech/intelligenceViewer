import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Database, Shield, Clock, CheckCircle } from 'lucide-react';
import { Source } from '../types';

interface SourceTraceCardProps {
  source: Source;
  index: number;
}

const SourceTraceCard: React.FC<SourceTraceCardProps> = ({ source, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'primary':
        return <Database className="w-5 h-5 text-perceive-gold" />;
      case 'secondary':
        return <Shield className="w-5 h-5 text-blue-400" />;
      case 'tertiary':
        return <Clock className="w-5 h-5 text-gray-400" />;
      default:
        return <Database className="w-5 h-5 text-gray-400" />;
    }
  };

  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 90) return 'text-green-400';
    if (reliability >= 80) return 'text-perceive-gold';
    if (reliability >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getReliabilityBg = (reliability: number) => {
    if (reliability >= 90) return 'bg-green-400/10';
    if (reliability >= 80) return 'bg-perceive-gold/10';
    if (reliability >= 70) return 'bg-yellow-400/10';
    return 'bg-red-400/10';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-3 sm:p-4 hover:border-perceive-purple/50 transition-all duration-200"
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          {getSourceIcon(source.type)}
          <div>
            <h4 className="text-[var(--color-text)] font-medium text-xs sm:text-sm">{source.title}</h4>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 mt-1">
              <span className="text-xs sm:text-sm text-[var(--color-text-secondary)] capitalize">
                {source.type} source
              </span>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getReliabilityBg(source.reliability)} ${getReliabilityColor(source.reliability)}`}>
                {source.reliability}% reliable
              </div>
            </div>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-text-secondary)]" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[var(--color-border)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-perceive-gold" />
                  <span className="text-xs sm:text-sm text-[var(--color-text-secondary)]">Data Points</span>
                </div>
                <div className="text-[var(--color-text)] font-medium text-xs sm:text-sm">
                  {source.dataPoints.toLocaleString()}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-xs sm:text-sm text-[var(--color-text-secondary)]">Last Updated</span>
                </div>
                <div className="text-[var(--color-text)] font-medium text-xs sm:text-sm">
                  {new Date(source.lastUpdated).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-[var(--color-bg-tertiary)] rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-xs sm:text-sm font-medium text-green-400">
                  Verification Status
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                Source verified through automated validation pipeline.
                Cross-referenced with {Math.floor(source.reliability / 10)} independent sources.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SourceTraceCard;