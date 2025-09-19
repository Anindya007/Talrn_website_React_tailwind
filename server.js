import { Resend } from 'resend';
import crypto from 'crypto';
import dotenv from 'dotenv';

// Load env locally; on Vercel, env vars are provided automatically
dotenv.config();

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory OTP storage (reset on cold start)
const otpStore = new Map();

// Utils
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

const sendOTPEmail = async (email, otp) => {
  try {
    await resend.emails.send({
      from: 'Talrn <onboarding@resend.dev>',
      to: email,
      subject: 'Verify your Talrn account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Verify your email address</h2>
          <p>Please use the following verification code to complete your registration:</p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
            <strong>${otp}</strong>
          </div>
          <p>This code will expire in 5 minutes.</p>
          <p style="color: #666; font-size: 12px;">If you didn't request this code, you can safely ignore this email.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send verification email');
  }
};

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

async function getBody(req) {
  // If body already parsed by the platform
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body || '{}'); } catch { return {}; }
  }

  // Fallback: parse stream
  return await new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  setCors(res);

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  const url = new URL(req.url || '/', 'http://localhost');
  let path = url.pathname || '/';
  // Normalize: strip /api prefix when routed via Vercel
  if (path.startsWith('/api')) path = path.slice(4) || '/';

  try {
    // Health check
    if (req.method === 'GET' && (path === '/health' || path === '/')) {
      return json(res, 200, { status: 'OK' });
    }

    // Send OTP
    if (req.method === 'POST' && path === '/send-otp') {
      const { email } = await getBody(req);
      if (!email) return json(res, 400, { message: 'Email is required' });

      const otp = generateOTP();
      otpStore.set(email, { otp, timestamp: Date.now(), attempts: 0 });
      await sendOTPEmail(email, otp);
      return json(res, 200, { message: 'OTP sent successfully' });
    }

    // Test Email
    if (req.method === 'POST' && path === '/test-email') {
      const { email } = await getBody(req);
      if (!email) return json(res, 400, { message: 'Email is required' });

      const testOTP = generateOTP();
      await sendOTPEmail(email, testOTP);
      return json(res, 200, { message: 'Test email sent successfully', otp: testOTP });
    }

    // Verify OTP
    if (req.method === 'POST' && path === '/verify-otp') {
      const { email, otp } = await getBody(req);
      if (!email || !otp) return json(res, 400, { message: 'Email and OTP are required' });

      const stored = otpStore.get(email);
      if (!stored) return json(res, 400, { message: 'OTP expired or not found' });

      // 5 minutes expiry
      if (Date.now() - stored.timestamp > 5 * 60 * 1000) {
        otpStore.delete(email);
        return json(res, 400, { message: 'OTP expired' });
      }

      // Attempts limit
      if (stored.attempts >= 3) {
        otpStore.delete(email);
        return json(res, 400, { message: 'Too many attempts. Please request a new OTP' });
      }

      if (stored.otp === otp) {
        otpStore.delete(email);
        return json(res, 200, { message: 'OTP verified successfully' });
      } else {
        stored.attempts += 1;
        return json(res, 400, { message: 'Invalid OTP' });
      }
    }

    return json(res, 404, { message: 'Not Found' });
  } catch (err) {
    console.error('Serverless handler error:', err);
    return json(res, 500, { message: 'Internal Server Error', error: err?.message || String(err) });
  }
}
