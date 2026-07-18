import type { NextApiRequest, NextApiResponse } from 'next';
import { rateLimit } from '~/_utils/rateLimit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown') as string;
  const limitCheck = rateLimit(`newsletter-${ip}`, { windowMs: 60 * 1000, maxRequests: 5 });

  if (!limitCheck.success) {
    return res.status(429).json({ message: 'Too many requests, please try again later.' });
  }

  const { email } = req.body;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ message: 'Valid email is required.' });
  }

  try {
    const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000';
    
    const response = await fetch(`${payloadUrl}/api/newsletter-subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, active: true }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.errors && data.errors[0]?.data?.[0]?.field === 'email') {
        return res.status(400).json({ message: 'This email is already subscribed.' });
      }
      throw new Error(data.message || 'Failed to submit email');
    }

    return res.status(200).json({ message: 'Successfully subscribed!' });
  } catch (error: any) {
    console.error('Newsletter submission error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}
