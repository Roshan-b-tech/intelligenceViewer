export interface Report {
  id: string;
  title: string;
  reportType: string;
  industry: string;
  confidenceScore: number;
  summary: string;
  createdAt: string;
  author: string;
  tags: string[];
  sources: Source[];
}

export interface Source {
  id: string;
  type: 'primary' | 'secondary' | 'tertiary';
  title: string;
  reliability: number;
  dataPoints: number;
  lastUpdated: string;
}

export interface Feedback {
  reportId: string;
  userComment: string;
  flaggedSection?: string;
  rating?: number;
}

export interface User {
  username: string;
  role: 'viewer' | 'reviewer';
}

export interface FilterState {
  reportType: string;
  industry: string;
  confidenceScore: number;
}