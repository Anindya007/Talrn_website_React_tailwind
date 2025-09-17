import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import OTPVerification from './OTPVerification';
import Header from '../Header';
import Footer from '../Footer';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        accountType: 'organisation', // or 'individual'
        firstName: '',
        lastName: '',
        jobTitle: '',
        organization: '',
        website: '',
        workEmail: '',
        phoneNumber: '',
        city: '',
        corporateRegistrationNumber: '',
        referralCode: ''
    });

    const [errors, setErrors] = useState({ required: {}, invalid: {}, submit: '' });
    const [formSuccess, setFormSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [verificationStep, setVerificationStep] = useState('form'); // 'form', 'otp', 'success'

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAccountTypeChange = (type) => {
        setFormData(prev => ({
            ...prev,
            accountType: type
        }));
    };

    const validateForm = () => {
        const newErrors = { required: {}, invalid: {}, submit: '' };

        // Required field validation
        const requiredFields = ['firstName', 'lastName', 'workEmail', 'phoneNumber', 'city'];
        if (formData.accountType === 'organisation') {
            requiredFields.push('jobTitle', 'organization', 'website', 'corporateRegistrationNumber');
        }

        requiredFields.forEach(field => {
            if (!String(formData[field] || '').trim()) {
                newErrors.required[field] = 'This field is required';
            }
        });

        // Email validation (only if provided and not empty)
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (String(formData.workEmail || '').trim() && !emailRegex.test(formData.workEmail)) {
            newErrors.invalid.workEmail = 'Invalid email address';
        }

        // Phone validation
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (String(formData.phoneNumber || '').trim() && !phoneRegex.test(formData.phoneNumber)) {
            newErrors.invalid.phoneNumber = 'Invalid phone number';
        }

        // Website validation (organisation only)
        if (formData.accountType === 'organisation') {
            // Accepts: domain.com, www.domain.com, https://domain.com/path
            const websiteRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
            if (String(formData.website || '').trim() && !websiteRegex.test(formData.website)) {
                newErrors.invalid.website = 'Invalid website URL';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors.required).length === 0 && Object.keys(newErrors.invalid).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (validateForm()) {
            try {
                // Send OTP to user's email
                const response = await fetch('/api/send-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: formData.workEmail }),
                });

                if (!response.ok) {
                    throw new Error('Failed to send verification code');
                }

                setVerificationStep('otp');
            } catch (error) {
                setErrors(prev => ({
                    ...prev,
                    submit: 'Failed to send verification code. Please try again.',
                }));
            }
        }

        setIsSubmitting(false);
    };

    const handleResendOTP = async () => {
        try {
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.workEmail }),
            });

            if (!response.ok) {
                throw new Error('Failed to resend verification code');
            }
        } catch (error) {
            throw new Error('Failed to resend verification code');
        }
    };

    const handleVerificationComplete = () => {
        setFormSuccess(true);
        setVerificationStep('success');
    };

    if (verificationStep === 'otp') {
        return (
            <>
                <Header />
                <div className="container mx-auto px-4 py-8">
                    <OTPVerification
                        email={formData.workEmail}
                        onVerificationComplete={handleVerificationComplete}
                        onResendOTP={handleResendOTP}
                    />
                </div>
                <Footer />
            </>
        );
    }

    if (verificationStep === 'success') {
        return (
            <>
                <Header />
                <div className="container mx-auto px-4 py-8">
                    <Card className="max-w-2xl mx-auto p-6 text-center">
                        <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
                        <p className="text-gray-600">Thank you for creating your Talrn account.</p>
                    </Card>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="max-w-4xl mx-auto px-4 mb-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Create your Talrn Account</h1>
                    <p className="text-gray-600">
                        Talrn is an exclusive network of the world's top talent.
                        <br />
                        We provide access to top companies and resources that can help accelerate your growth.
                    </p>
                </div>

                <Card className="p-6">
                    <RadioGroup
                        defaultValue={formData.accountType}
                        onValueChange={handleAccountTypeChange}
                        className="flex justify-center gap-8 mb-6"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="organisation" id="organisation" />
                            <label htmlFor="organisation" className="text-sm font-medium leading-none cursor-pointer">
                                Organisation
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="individual" id="individual" />
                            <label htmlFor="individual" className="text-sm font-medium leading-none cursor-pointer">
                                Individual
                            </label>
                        </div>
                    </RadioGroup>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First Name *"
                                    
                                    className={(errors.required.firstName || errors.invalid.firstName) ? 'border-red-500' : ''}
                                />
                                {errors.required.firstName && (
                                    <p className="text-red-500 text-sm">This field is required</p>
                                )}
                                {errors.invalid.firstName && (
                                    <p className="text-red-500 text-sm">{errors.invalid.firstName}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last Name *"
                                
                                    className={(errors.required.lastName || errors.invalid.lastName) ? 'border-red-500' : ''}
                                />
                                {errors.required.lastName && (
                                    <p className="text-red-500 text-sm">This field is required</p>
                                )}
                                {errors.invalid.lastName && (
                                    <p className="text-red-500 text-sm">{errors.invalid.lastName}</p>
                                )}
                            </div>
                        </div>

                        {formData.accountType === 'organisation' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Input
                                        name="jobTitle"
                                        value={formData.jobTitle}
                                        onChange={handleInputChange}
                                        placeholder="Job title *"
                                        
                                        className={(errors.required.jobTitle || errors.invalid.jobTitle) ? 'border-red-500' : ''}
                                    />
                                    {errors.required.jobTitle && (
                                        <p className="text-red-500 text-sm">This field is required</p>
                                    )}
                                    {errors.invalid.jobTitle && (
                                        <p className="text-red-500 text-sm">{errors.invalid.jobTitle}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Input
                                        name="organization"
                                        value={formData.organization}
                                        onChange={handleInputChange}
                                        placeholder="Organization *"
                                    
                                        className={(errors.required.organization || errors.invalid.organization) ? 'border-red-500' : ''}
                                    />
                                    {errors.required.organization && (
                                        <p className="text-red-500 text-sm">This field is required</p>
                                    )}
                                    {errors.invalid.organization && (
                                        <p className="text-red-500 text-sm">{errors.invalid.organization}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formData.accountType === 'organisation' && (
                                <div className="space-y-1">
                                    <Input
                                        name="website"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        placeholder="Website *"
                                        
                                        className={(errors.required.website || errors.invalid.website) ? 'border-red-500' : ''}
                                    />
                                
                                    {errors.required.website && (
                                        <p className="text-red-500 text-sm">This field is required</p>
                                    )}
                                    {errors.invalid.website && (
                                        <p className="text-red-500 text-sm">{errors.invalid.website}</p>
                                    )}
                                    </div>
                                )}
                            <div className="space-y-1">
                                <div className="relative">
                                    <Input
                                        name="workEmail"
                                        type="email"
                                        value={formData.workEmail}
                                        onChange={handleInputChange}
                                        placeholder="Work email *"
                                        
                                        className={(errors.required.workEmail || errors.invalid.workEmail) ? 'border-red-500' : ''}
                                    />
                                    <span className="absolute right-3 top-1/5 transform -translate-y-1 text-gray-500">
                                        @website.com
                                    </span>
                                    {errors.required.workEmail && (
                                        <p className="text-red-500 text-sm">This field is required</p>
                                    )}
                                    {errors.invalid.workEmail && (
                                        <p className="text-red-500 text-sm">{errors.invalid.workEmail}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Input
                                    name="phoneNumber"
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="Phone number *"
                                    className={(errors.required.phoneNumber || errors.invalid.phoneNumber) ? 'border-red-500' : ''}
                                />
                                {errors.required.phoneNumber && (
                                    <p className="text-red-500 text-sm">This field is required</p>
                                )}
                                {errors.invalid.phoneNumber && (
                                    <p className="text-red-500 text-sm">{errors.invalid.phoneNumber}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Input
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="City *"
                                    className={(errors.required.city || errors.invalid.city) ? 'border-red-500' : ''}
                                />
                                {errors.required.city && (
                                    <p className="text-red-500 text-sm">This field is required</p>
                                )}
                                {errors.invalid.city && (
                                    <p className="text-red-500 text-sm">{errors.invalid.city}</p>
                                )}
                            </div>
                        </div>

                        {formData.accountType === 'organisation' && (
                            <div className="space-y-1">
                                <Input
                                    name="corporateRegistrationNumber"
                                    value={formData.corporateRegistrationNumber}
                                    onChange={handleInputChange}
                                    placeholder="Corporate Registration Number *"
                                    className={(errors.required.corporateRegistrationNumber || errors.invalid.corporateRegistrationNumber) ? 'border-red-500' : ''}
                                />
                                {errors.required.corporateRegistrationNumber && (
                                    <p className="text-red-500 text-sm">This field is required</p>
                                )}
                                {errors.invalid.corporateRegistrationNumber && (
                                    <p className="text-red-500 text-sm">{errors.invalid.corporateRegistrationNumber}</p>
                                )}
                            </div>
                        )}

                        <Input
                            name="referralCode"
                            value={formData.referralCode}
                            onChange={handleInputChange}
                            placeholder="Referral code"
                        />

                        {errors.submit && (
                            <p className="text-red-500 text-sm text-center">{errors.submit}</p>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-[#5271ff] hover:bg-blue-700 text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </Button>
                    </form>
                </Card>
            </div>
            <Footer />
        </>
    );
};

export default RegisterForm;