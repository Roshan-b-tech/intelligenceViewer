import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Calendar, Tag, MessageSquare, Shield, FileText } from 'lucide-react';
import { Report } from '../types';
import ConfidenceMeter from './ConfidenceMeter';
import SourceTraceCard from './SourceTraceCard';
import FeedbackForm from './FeedbackForm';

interface ReportPanelProps {
  report: Report;
  onClose: () => void;
  onFeedbackSubmit: (feedback: any) => void;
  userRole: string;
}

const ReportPanel: React.FC<ReportPanelProps> = ({ report, onClose, onFeedbackSubmit, userRole }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sources' | 'feedback'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'sources', label: 'Why We Trust This', icon: Shield },
  ];
  // Only add feedback tab for reviewers/executives
  if (userRole === 'Executive (Reviewer)' || userRole === 'reviewer') {
    tabs.push({ id: 'feedback', label: 'Executive Feedback', icon: MessageSquare });
  }

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="fixed right-0 top-0 h-full w-full sm:max-w-2xl bg-[var(--color-bg)] border-l border-[var(--color-border)] shadow-2xl z-50 overflow-hidden"
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                {report.title}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-[var(--color-text-secondary)]">
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
            <button
              onClick={onClose}
              className="ml-4 p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] overflow-x-auto">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.id
                    ? 'text-perceive-gold border-b-2 border-perceive-gold'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 sm:p-6 space-y-4 sm:space-y-6"
              >
                {/* Confidence Score */}
                <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2 sm:mb-0">
                      Intelligence Confidence
                    </h3>
                    {/* Responsive confidence meter */}
                    <div className="flex justify-center sm:justify-end w-full sm:w-auto">
                      <div className="block sm:hidden">
                        <ConfidenceMeter score={report.confidenceScore} size="sm" />
                      </div>
                      <div className="hidden sm:block">
                        <ConfidenceMeter score={report.confidenceScore} size="lg" />
                      </div>
                    </div>
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    Our multi-source validation pipeline has assigned this report a confidence score of {report.confidenceScore}%,
                    indicating high reliability for strategic decision-making.
                  </p>
                </div>

                {/* Summary */}
                <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
                    Executive Summary
                  </h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {report.summary}
                  </p>
                </div>

                {/* Metadata */}
                <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
                    Report Classification
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[var(--color-text-secondary)]">Type</label>
                      <div className="text-[var(--color-text)] font-medium capitalize">
                        {report.reportType.replace('-', ' ')}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-[var(--color-text-secondary)]">Industry</label>
                      <div className="text-[var(--color-text)] font-medium capitalize">
                        {report.industry}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
                    Key Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {report.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-perceive-purple/20 text-perceive-gold border border-perceive-purple/30"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'sources' && (
              <motion.div
                key="sources"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 sm:p-6 space-y-4 sm:space-y-6"
              >
                <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                    Source Traceability
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-6">
                    Complete audit trail of data sources used in this intelligence report.
                    Each source is validated through our automated verification pipeline.
                  </p>

                  <div className="space-y-4">
                    {report.sources.map((source, index) => (
                      <SourceTraceCard
                        key={source.id}
                        source={source}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'feedback' && (userRole === 'Executive (Reviewer)' || userRole === 'reviewer') && (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 sm:p-6"
              >
                <FeedbackForm
                  reportId={report.id}
                  onSubmit={onFeedbackSubmit}
                  onClose={() => { }} // Do nothing on submit, only close on cancel
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportPanel;