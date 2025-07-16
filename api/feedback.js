import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { reportId, userComment, flaggedSection, rating } = req.body;

    if (!reportId || !userComment) {
        return res.status(400).json({ error: 'reportId and userComment are required' });
    }

    const feedback = {
        id: uuidv4(),
        reportId,
        userComment,
        flaggedSection,
        rating,
        timestamp: new Date().toISOString(),
        traceId: uuidv4()
    };

    res.status(200).json({
        success: true,
        data: feedback,
        message: 'Feedback submitted successfully'
    });
} 