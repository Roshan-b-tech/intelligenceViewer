import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 3001;
const JWT_SECRET = 'perceive-now-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const traceId = uuidv4();
  
  req.traceId = traceId;
  res.setHeader('X-Trace-ID', traceId);
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms - Trace: ${traceId}`);
  });
  
  next();
});

// Mock data
const mockReports = [
  {
    id: 'rpt-001',
    title: 'Q4 Market Intelligence: Emerging Tech Valuations',
    reportType: 'market-analysis',
    industry: 'technology',
    confidenceScore: 94,
    summary: 'Comprehensive analysis of emerging technology valuations showing significant growth potential in AI infrastructure and quantum computing sectors.',
    createdAt: '2024-01-15T10:30:00Z',
    author: 'Sarah Chen',
    tags: ['AI', 'quantum-computing', 'valuations', 'market-trends'],
    sources: [
      {
        id: 'src-001',
        type: 'primary',
        title: 'SEC Filing Analysis - Series D Rounds',
        reliability: 98,
        dataPoints: 1247,
        lastUpdated: '2024-01-14T18:45:00Z'
      },
      {
        id: 'src-002',
        type: 'secondary',
        title: 'Patent Filing Trends Q3-Q4',
        reliability: 87,
        dataPoints: 892,
        lastUpdated: '2024-01-13T12:20:00Z'
      },
      {
        id: 'src-003',
        type: 'tertiary',
        title: 'Industry Expert Interviews',
        reliability: 79,
        dataPoints: 156,
        lastUpdated: '2024-01-12T09:15:00Z'
      }
    ]
  },
  {
    id: 'rpt-002',
    title: 'Competitive Intelligence: Global Supply Chain Resilience',
    reportType: 'competitive-analysis',
    industry: 'manufacturing',
    confidenceScore: 87,
    summary: 'Analysis of supply chain vulnerabilities and competitor strategies for building resilient manufacturing networks.',
    createdAt: '2024-01-14T14:20:00Z',
    author: 'Michael Rodriguez',
    tags: ['supply-chain', 'manufacturing', 'resilience', 'competitive-analysis'],
    sources: [
      {
        id: 'src-004',
        type: 'primary',
        title: 'Global Trade Data Analysis',
        reliability: 92,
        dataPoints: 2341,
        lastUpdated: '2024-01-13T16:30:00Z'
      },
      {
        id: 'src-005',
        type: 'secondary',
        title: 'Competitor Public Disclosures',
        reliability: 85,
        dataPoints: 567,
        lastUpdated: '2024-01-12T11:45:00Z'
      }
    ]
  },
  {
    id: 'rpt-003',
    title: 'Risk Assessment: Cybersecurity Threat Landscape',
    reportType: 'risk-assessment',
    industry: 'cybersecurity',
    confidenceScore: 96,
    summary: 'Comprehensive threat analysis covering emerging attack vectors and defensive capabilities across major industry sectors.',
    createdAt: '2024-01-13T09:15:00Z',
    author: 'Dr. Emily Watson',
    tags: ['cybersecurity', 'threat-analysis', 'risk-assessment', 'defense'],
    sources: [
      {
        id: 'src-006',
        type: 'primary',
        title: 'Threat Intelligence Feeds',
        reliability: 96,
        dataPoints: 4523,
        lastUpdated: '2024-01-13T08:00:00Z'
      },
      {
        id: 'src-007',
        type: 'secondary',
        title: 'Incident Response Database',
        reliability: 88,
        dataPoints: 1876,
        lastUpdated: '2024-01-12T20:30:00Z'
      }
    ]
  },
  {
    id: 'rpt-004',
    title: 'Investment Intelligence: Clean Energy Opportunities',
    reportType: 'investment-analysis',
    industry: 'energy',
    confidenceScore: 91,
    summary: 'Strategic analysis of clean energy investment opportunities with focus on grid modernization and storage technologies.',
    createdAt: '2024-01-12T16:45:00Z',
    author: 'James Park',
    tags: ['clean-energy', 'investment', 'grid-modernization', 'storage'],
    sources: [
      {
        id: 'src-008',
        type: 'primary',
        title: 'Government Policy Database',
        reliability: 94,
        dataPoints: 987,
        lastUpdated: '2024-01-11T14:20:00Z'
      }
    ]
  },
  {
    id: 'rpt-005',
    title: 'Market Dynamics: Healthcare AI Adoption',
    reportType: 'market-analysis',
    industry: 'healthcare',
    confidenceScore: 83,
    summary: 'Analysis of AI adoption patterns in healthcare with emphasis on regulatory compliance and patient outcomes.',
    createdAt: '2024-01-11T11:30:00Z',
    author: 'Dr. Lisa Thompson',
    tags: ['healthcare', 'AI', 'adoption', 'regulatory'],
    sources: [
      {
        id: 'src-009',
        type: 'primary',
        title: 'Clinical Trial Database',
        reliability: 89,
        dataPoints: 2156,
        lastUpdated: '2024-01-10T19:45:00Z'
      },
      {
        id: 'src-010',
        type: 'secondary',
        title: 'Regulatory Filing Analysis',
        reliability: 82,
        dataPoints: 743,
        lastUpdated: '2024-01-09T13:20:00Z'
      }
    ]
  }
];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Routes
app.get('/api/reports', (req, res) => {
  const { reportType, industry, confidenceScore } = req.query;
  let filteredReports = [...mockReports];

  if (reportType) {
    filteredReports = filteredReports.filter(report => 
      report.reportType === reportType
    );
  }

  if (industry) {
    filteredReports = filteredReports.filter(report => 
      report.industry === industry
    );
  }

  if (confidenceScore) {
    const minScore = parseInt(confidenceScore);
    filteredReports = filteredReports.filter(report => 
      report.confidenceScore >= minScore
    );
  }

  res.json({
    success: true,
    data: filteredReports,
    total: filteredReports.length,
    traceId: req.traceId
  });
});

app.get('/api/reports/:id', (req, res) => {
  const report = mockReports.find(r => r.id === req.params.id);
  
  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }

  res.json({
    success: true,
    data: report,
    traceId: req.traceId
  });
});

app.post('/api/feedback', (req, res) => {
  const { reportId, userComment, flaggedSection, rating } = req.body;
  
  if (!reportId || !userComment) {
    return res.status(400).json({ error: 'reportId and userComment are required' });
  }

  // In a real app, this would save to database
  const feedback = {
    id: uuidv4(),
    reportId,
    userComment,
    flaggedSection,
    rating,
    timestamp: new Date().toISOString(),
    traceId: req.traceId
  };

  console.log('Feedback received:', feedback);

  res.json({
    success: true,
    data: feedback,
    message: 'Feedback submitted successfully'
  });
});

// Auth endpoints
app.post('/api/auth/token', (req, res) => {
  const { username, role } = req.body;
  
  // Hardcoded tokens for demo
  const validCredentials = {
    'exec@perceive.now': 'reviewer',
    'analyst@perceive.now': 'viewer'
  };

  if (!validCredentials[username]) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { 
      username, 
      role: validCredentials[username],
      iat: Math.floor(Date.now() / 1000)
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    success: true,
    token,
    user: {
      username,
      role: validCredentials[username]
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    service: 'Perceive Now Intelligence API',
    timestamp: new Date().toISOString(),
    traceId: req.traceId
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Perceive Now Intelligence API running on port ${PORT}`);
  console.log(`📊 Ready to serve intelligence reports with confidence`);
  console.log(`🔐 Demo credentials: exec@perceive.now (reviewer) | analyst@perceive.now (viewer)\n`);
});