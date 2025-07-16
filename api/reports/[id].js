import { v4 as uuidv4 } from 'uuid';

const mockReports = [
    // ... (copy the mockReports array from api/reports.js)
];

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { id } = req.query;
    const report = mockReports.find(r => r.id === id);

    if (!report) {
        return res.status(404).json({ error: 'Report not found' });
    }

    res.status(200).json({
        success: true,
        data: report,
        traceId: uuidv4()
    });
} 