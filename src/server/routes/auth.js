import express from 'express';
import { Resend } from 'resend';
import crypto from 'crypto';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const router = express.Router();

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory OTP storage (replace with a database in production)
const otpStore = new Map();

// Generate OTP
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

// Send OTP email
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

// Send OTP endpoint
router.post('/send-otp', async (req, res) => {
    try {
        const { email } = req.body;
        const otp = generateOTP();
        
        // Store OTP with timestamp
        otpStore.set(email, {
            otp,
            timestamp: Date.now(),
            attempts: 0,
        });

        await sendOTPEmail(email, otp);

        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
});

// Test email route
router.post('/test-email', async (req, res) => {
    try {
        const testOTP = generateOTP();
        console.log(req.body)
        await sendOTPEmail(req.body.email, testOTP);
        res.json({ message: 'Test email sent successfully', otp: testOTP });
    } catch (error) {
        console.error('Error sending test email:', error);
        res.status(500).json({ message: 'Failed to send test email', error: error.message });
    }
});

// Verify OTP endpoint
router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    const storedData = otpStore.get(email);
    
    if (!storedData) {
        return res.status(400).json({ message: 'OTP expired or not found' });
    }
    
    // Check if OTP is expired (5 minutes)
    if (Date.now() - storedData.timestamp > 5 * 60 * 1000) {
        otpStore.delete(email);
        return res.status(400).json({ message: 'OTP expired' });
    }
   
    // Check attempts
    if (storedData.attempts >= 3) {
        otpStore.delete(email);
        return res.status(400).json({ message: 'Too many attempts. Please request a new OTP' });
    }
    
    // Verify OTP
    if (storedData.otp === otp) {
        otpStore.delete(email);
        res.json({ message: 'OTP verified successfully' });
    } else {
        storedData.attempts += 1;
        res.status(400).json({ message: 'Invalid OTP' });
    }
});

export default router;