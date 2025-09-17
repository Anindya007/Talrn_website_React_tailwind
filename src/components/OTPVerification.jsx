import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

const OTPVerification = ({ email, onVerificationComplete, onResendOTP }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [timeLeft, setTimeLeft] = useState(30); // 30 seconds countdown
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const handleVerify = async () => {
        if (!otp.trim()) {
            setError('Please enter the OTP');
            return;
        }

        try {
            const response = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (response.ok) {
                onVerificationComplete();
            } else {
                setError(data.message || 'Invalid OTP. Please try again.');
            }
        } catch (error) {
            setError('Failed to verify OTP. Please try again.');
        }
    };

    const handleResend = async () => {
        if (!canResend) return;
        
        try {
            await onResendOTP();
            setTimeLeft(30);
            setCanResend(false);
            setError('');
        } catch (error) {
            setError('Failed to resend OTP. Please try again.');
        }
    };

    return (
        <Card className="p-6 max-w-md mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Email Verification</h2>
                <p className="text-gray-600">
                    We've sent a verification code to<br />
                    <span className="font-medium">{email}</span>
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <Input
                        type="text"
                        value={otp}
                        onChange={(e) => {
                            setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                            setError('');
                        }}
                        placeholder="Enter 6-digit OTP"
                        className="text-center text-lg tracking-widest"
                        maxLength={6}
                    />
                    {error && (
                        <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                </div>

                <Button
                    onClick={handleVerify}
                    className="w-full bg-[#5271ff] hover:bg-blue-700"
                >
                    Verify OTP
                </Button>

                <div className="text-center">
                    <button
                        onClick={handleResend}
                        disabled={!canResend}
                        className={`text-sm ${
                            canResend
                                ? 'text-[#5271ff] hover:text-blue-700 cursor-pointer'
                                : 'text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        {canResend
                            ? 'Resend OTP'
                            : `Resend OTP in ${timeLeft}s`}
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default OTPVerification;