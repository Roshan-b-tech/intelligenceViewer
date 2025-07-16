import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './hooks/useAuth';
import { useReports } from './hooks/useReports';
import { FilterState, Report, Feedback } from './types';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import ReportCard from './components/ReportCard';
import ReportPanel from './components/ReportPanel';

function App() {
  const { user, login, logout, loading } = useAuth();
  const [filters, setFilters] = useState<FilterState>({
    reportType: '',
    industry: '',
    confidenceScore: 0,
  });
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const { reports, loading: reportsLoading, error } = useReports(filters);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const handleLogin = async (username: string) => {
    return await login(username);
  };

  const handleFeedbackSubmit = async (feedback: Feedback) => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });

      if (response.ok) {
        setFeedbackSuccess(true);
        setTimeout(() => {
          setFeedbackSuccess(false);
          setSelectedReport(null); // Close the feedback panel after popup
        }, 2500);
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  };

  const clearFilters = () => {
    setFilters({
      reportType: '',
      industry: '',
      confidenceScore: 0,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-[var(--color-text)]">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Feedback Success Popup */}
      {feedbackSuccess && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999]">
          <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-base animate-fade-in">
            Thank you for your feedback!
          </div>
        </div>
      )}
      <Header user={user} onLogout={logout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">
            Intelligence Reports
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Executive-grade intelligence with complete source traceability and confidence scoring.
          </p>
        </div>

        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={clearFilters}
        />

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <div className="text-red-400">
              Error loading reports: {error}
            </div>
          </div>
        )}

        {reportsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-dark-bg-secondary rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-4"></div>
                <div className="h-8 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <ReportCard
                key={report.id}
                report={report}
                onClick={setSelectedReport}
                index={index}
              />
            ))}
          </div>
        )}

        {!reportsLoading && reports.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              No reports match your current filters.
            </div>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-perceive-purple hover:bg-perceive-purple-light text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Report Panel */}
      <AnimatePresence>
        {selectedReport && (
          <ReportPanel
            report={selectedReport}
            onClose={() => setSelectedReport(null)}
            onFeedbackSubmit={handleFeedbackSubmit}
            userRole={user.role}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;