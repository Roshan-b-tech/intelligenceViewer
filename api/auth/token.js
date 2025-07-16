import jwt from 'jsonwebtoken';

const JWT_SECRET = 'perceive-now-secret-key';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username } = req.body;

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

    res.status(200).json({
        success: true,
        token,
        user: {
            username,
            role: validCredentials[username]
        }
    });
} 