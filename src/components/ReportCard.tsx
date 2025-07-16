import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, TrendingUp } from 'lucide-react';
import { Report } from '../types';
import ConfidenceMeter from './ConfidenceMeter';

interface ReportCardProps {
  report: Report;
  onClick: (report: Report) => void;
  index: number;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onClick, index }) => {
  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'market-analysis':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'competitive-analysis':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'risk-assessment':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'investment-analysis':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => onClick(report)}
      className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-4 sm:p-6 cursor-pointer hover:border-perceive-purple/50 hover:bg-[var(--color-bg-tertiary)]/50 transition-all duration-200 group"
    >
      <div className="flex flex-col md:flex-row items-start justify-between mb-4 gap-2 md:gap-0">
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text)] group-hover:text-perceive-gold transition-colors">
            {report.title}
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 mt-2 text-xs sm:text-sm text-[var(--color-text-secondary)]">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{report.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(report.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="ml-0 md:ml-4 mt-2 md:mt-0">
          <ConfidenceMeter score={report.confidenceScore} size="sm" animated={false} />
        </div>
      </div>

      <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mb-4 leading-relaxed">
        {report.summary}
      </p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getReportTypeColor(report.reportType)}`}>
            {report.reportType.replace('-', ' ')}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-perceive-purple/20 text-perceive-gold border border-perceive-purple/30 capitalize">
            {report.industry}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-[var(--color-text-secondary)]">
          <TrendingUp className="w-4 h-4" />
          <span className="text-xs sm:text-sm">
            {report.sources.length} sources
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {report.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 rounded text-xs bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </span>
        ))}
        {report.tags.length > 3 && (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
            +{report.tags.length - 3} more
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ReportCard;