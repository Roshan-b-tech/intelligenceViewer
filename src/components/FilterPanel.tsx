import React from 'react';
import { Filter, X } from 'lucide-react';
import { FilterState } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange, onClearFilters }) => {
  const reportTypes = [
    { value: '', label: 'All Types' },
    { value: 'market-analysis', label: 'Market Analysis' },
    { value: 'competitive-analysis', label: 'Competitive Analysis' },
    { value: 'risk-assessment', label: 'Risk Assessment' },
    { value: 'investment-analysis', label: 'Investment Analysis' },
  ];

  const industries = [
    { value: '', label: 'All Industries' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'energy', label: 'Energy' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
  ];

  const confidenceScores = [
    { value: 0, label: 'All Confidence Levels' },
    { value: 70, label: '70%+ Confidence' },
    { value: 80, label: '80%+ Confidence' },
    { value: 90, label: '90%+ Confidence' },
  ];

  const hasActiveFilters = filters.reportType || filters.industry || filters.confidenceScore > 0;

  return (
    <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-perceive-gold" />
          <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text)]">Filter Reports</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)] hover:border-gray-400 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Report Type */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[var(--color-text)] mb-2">
            Report Type
          </label>
          <select
            value={filters.reportType}
            onChange={(e) => onFiltersChange({ ...filters, reportType: e.target.value })}
            className="w-full px-3 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-perceive-purple/50 focus:border-transparent"
          >
            {reportTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Industry */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[var(--color-text)] mb-2">
            Industry
          </label>
          <select
            value={filters.industry}
            onChange={(e) => onFiltersChange({ ...filters, industry: e.target.value })}
            className="w-full px-3 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-perceive-purple/50 focus:border-transparent"
          >
            {industries.map((industry) => (
              <option key={industry.value} value={industry.value}>
                {industry.label}
              </option>
            ))}
          </select>
        </div>

        {/* Confidence Score */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[var(--color-text)] mb-2">
            Confidence Score
          </label>
          <select
            value={filters.confidenceScore}
            onChange={(e) => onFiltersChange({ ...filters, confidenceScore: parseInt(e.target.value) })}
            className="w-full px-3 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-perceive-purple/50 focus:border-transparent"
          >
            {confidenceScores.map((score) => (
              <option key={score.value} value={score.value}>
                {score.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;