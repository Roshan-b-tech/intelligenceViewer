import { v4 as uuidv4 } from 'uuid';

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
    // ... (add the rest of your mockReports here, or import from a shared file)
];

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { reportType, industry, confidenceScore } = req.query;
    let filteredReports = [...mockReports];

    if (reportType) {
        filteredReports = filteredReports.filter(report => report.reportType === reportType);
    }
    if (industry) {
        filteredReports = filteredReports.filter(report => report.industry === industry);
    }
    if (confidenceScore) {
        const minScore = parseInt(confidenceScore);
        filteredReports = filteredReports.filter(report => report.confidenceScore >= minScore);
    }

    res.status(200).json({
        success: true,
        data: filteredReports,
        total: filteredReports.length,
        traceId: uuidv4()
    });
} 