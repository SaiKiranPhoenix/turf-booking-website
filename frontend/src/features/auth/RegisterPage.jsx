// src/features/auth/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import Checkbox from '../../components/Checkbox';
import { register } from '../../services/authService';
import TurfLogo from '../../assets/sportnest.png'; // Make sure to add your logo

const RegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('First name is required')
        .max(50, 'First name cannot be longer than 50 characters'),
      lastName: Yup.string()
        .required('Last name is required')
        .max(50, 'Last name cannot be longer than 50 characters'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
      agreeToTerms: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('You must accept the terms and conditions'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);
      
      try {
        // In a real app, this would call your API
        await register({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          password: values.password,
        });
        
        setSuccessMessage('Registration successful! You can now login with your credentials.');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (err) {
        setError(err.message || 'Failed to register. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white rounded-xl shadow-xl overflow-hidden"
      >
        <div className="px-8 pt-8 pb-6">
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-4 inline-block"
            >
              <img src={TurfLogo} alt="TurfBooker Logo" className="h-16 mx-auto" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
            <p className="text-gray-600 mb-6">Join our community and start booking turfs today</p>
          </div>
          
          {error && (
            <Alert 
              type="error" 
              message={error} 
              onClose={() => setError(null)}
              className="mb-4"
            />
          )}
          
          {successMessage && (
            <Alert 
              type="success" 
              message={successMessage}
              onClose={() => setSuccessMessage(null)}
              className="mb-4"
            />
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="firstName"
                name="firstName"
                type="text"
                label="First Name"
                placeholder="Enter your first name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName ? formik.errors.firstName : ""}
                touched={formik.touched.firstName}
                required
              />
              
              <Input
                id="lastName"
                name="lastName"
                type="text"
                label="Last Name"
                placeholder="Enter your last name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName ? formik.errors.lastName : ""}
                touched={formik.touched.lastName}
                required
              />
            </div>
            
            <Input
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email ? formik.errors.email : ""}
              touched={formik.touched.email}
              required
              icon={
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              }
            />
            
            <Input
              id="phone"
              name="phone"
              type="tel"
              label="Phone Number"
              placeholder="Enter your 10-digit phone number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone ? formik.errors.phone : ""}
              touched={formik.touched.phone}
              required
              icon={
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              }
            />
            
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Create a strong password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password ? formik.errors.password : ""}
              touched={formik.touched.password}
              required
              icon={
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              }
            />
            
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword ? formik.errors.confirmPassword : ""}
              touched={formik.touched.confirmPassword}
              required
              icon={
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              }
            />
            
            <div className="mt-6">
              <Checkbox
                id="agreeToTerms"
                name="agreeToTerms"
                label={
                  <span>
                    I agree to the{' '}
                    <Link to="/terms" className="text-green-600 hover:text-green-500 font-medium">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-green-600 hover:text-green-500 font-medium">
                      Privacy Policy
                    </Link>
                  </span>
                }
                checked={formik.values.agreeToTerms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.agreeToTerms ? formik.errors.agreeToTerms : ""}
                touched={formik.touched.agreeToTerms}
              />
            </div>
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isSubmitting}
              className="mt-6"
            >
              Create Account
            </Button>
          </form>
        </div>
        
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
