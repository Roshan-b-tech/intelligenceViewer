import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    res.status(200).json({
        success: true,
        service: 'Perceive Now Intelligence API',
        timestamp: new Date().toISOString(),
        traceId: uuidv4()
    });
} 