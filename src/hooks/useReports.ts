import { useState, useEffect } from 'react';
import { Report, FilterState } from '../types';

export const useReports = (filters: FilterState) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        
        if (filters.reportType) queryParams.append('reportType', filters.reportType);
        if (filters.industry) queryParams.append('industry', filters.industry);
        if (filters.confidenceScore > 0) queryParams.append('confidenceScore', filters.confidenceScore.toString());

        const response = await fetch(`/api/reports?${queryParams.toString()}`);
        
        if (response.ok) {
          const data = await response.json();
          setReports(data.data);
          setError(null);
        } else {
          setError('Failed to fetch reports');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [filters]);

  return { reports, loading, error };
};