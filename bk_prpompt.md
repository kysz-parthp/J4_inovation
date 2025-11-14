# Complete Frontend Integration Prompt - Next.js + Spring Boot Backend

## 🎯 Complete Integration Guide for J4.Innovate

This document contains **EVERYTHING** you need to integrate the Spring Boot backend with your Next.js 16 + React 19 + TypeScript frontend.

---

## 📋 Table of Contents

1. [Backend API Overview](#backend-api-overview)
2. [Environment Setup](#environment-setup)
3. [TypeScript Types](#typescript-types)
4. [API Client Service](#api-client-service)
5. [Contact Form Integration](#contact-form-integration)
6. [Optional Endpoints Integration](#optional-endpoints-integration)
7. [Error Handling](#error-handling)
8. [Testing Guide](#testing-guide)
9. [Production Setup](#production-setup)
10. [Troubleshooting](#troubleshooting)

---

## 🔌 Backend API Overview

**Base URL:** `http://localhost:8080`  
**API Base:** `http://localhost:8080/api`  
**CORS:** Enabled for `http://localhost:3000`

### Required Endpoint

**POST `/api/contact`** - Submit contact form

**Request Body:**
```json
{
  "name": "string (required, 2-255 characters)",
  "email": "string (required, valid email format)",
  "message": "string (required, minimum 10 characters)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you for your message! We'll get back to you soon."
}
```

**Validation Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Email must be valid",
    "message": "Message must be at least 10 characters"
  }
}
```

**Rate Limit Error Response (429):**
```json
{
  "success": false,
  "message": "Too many requests. Please try again later."
}
```

**Rate Limit:** 3 requests per IP per hour

### Optional Endpoints

**GET `/api/services`**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Web Development",
      "description": "Modern, responsive websites...",
      "icon": "Code",
      "color": "from-blue-500 to-cyan-500",
      "orderIndex": 1,
      "isActive": true
    }
  ]
}
```

**GET `/api/portfolio`**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Smart AI Bot",
      "category": "AI/ML",
      "description": "Intelligent chatbot...",
      "imageUrl": "/portfolio1.jpg",
      "gradient": "from-blue-500 to-cyan-500",
      "liveUrl": "https://example.com",
      "githubUrl": "https://github.com/example",
      "orderIndex": 1,
      "isFeatured": false
    }
  ]
}
```

**GET `/api/testimonials`**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Sarah Johnson",
      "role": "CEO, TechStart Inc.",
      "content": "J4.Innovate transformed our business...",
      "rating": 5,
      "avatar": "SJ",
      "companyLogoUrl": "/logo.png",
      "orderIndex": 1,
      "isApproved": true
    }
  ]
}
```

**GET `/api/statistics`**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "number": "500+",
      "label": "Projects Completed",
      "icon": "Code2",
      "color": "from-blue-500 to-cyan-500",
      "orderIndex": 1,
      "isActive": true
    }
  ]
}
```

**GET `/api/faq`**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "question": "What services does J4.Innovate offer?",
      "answer": "We offer comprehensive software development...",
      "orderIndex": 1,
      "isActive": true
    }
  ]
}
```

---

## ⚙️ Environment Setup

### Step 1: Create `.env.local` file

Create `.env.local` in your Next.js project root:

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

**Important:** 
- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Restart Next.js dev server after changing environment variables

---

## 📝 TypeScript Types

### Create `types/api.ts`

```typescript
// types/api.ts

// ============================================
// Core API Response Structure
// ============================================

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string>;
}

// ============================================
// Contact Form Types
// ============================================

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse extends ApiResponse<void> {}

// ============================================
// Service Types
// ============================================

export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
  color?: string;
  orderIndex?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServicesResponse extends ApiResponse<Service[]> {}

// ============================================
// Portfolio Types
// ============================================

export interface Portfolio {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  gradient?: string;
  liveUrl?: string;
  githubUrl?: string;
  orderIndex?: number;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PortfolioResponse extends ApiResponse<Portfolio[]> {}

// ============================================
// Testimonial Types
// ============================================

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating?: number;
  avatar?: string;
  companyLogoUrl?: string;
  orderIndex?: number;
  isApproved?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestimonialsResponse extends ApiResponse<Testimonial[]> {}

// ============================================
// Statistics Types
// ============================================

export interface Statistics {
  id: number;
  number: string;
  label: string;
  icon?: string;
  color?: string;
  orderIndex?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface StatisticsResponse extends ApiResponse<Statistics[]> {}

// ============================================
// FAQ Types
// ============================================

export interface Faq {
  id: number;
  question: string;
  answer: string;
  orderIndex?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FaqResponse extends ApiResponse<Faq[]> {}
```

---

## 🔧 API Client Service

### Create `lib/api.ts` or `services/api.ts`

```typescript
// lib/api.ts or services/api.ts

import {
  ApiResponse,
  ContactRequest,
  ContactResponse,
  Service,
  Portfolio,
  Testimonial,
  Statistics,
  Faq,
} from '@/types/api';

// ============================================
// Configuration
// ============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

// ============================================
// Generic API Request Function
// ============================================

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    const data: ApiResponse<T> = await response.json();

    // Handle HTTP errors
    if (!response.ok) {
      // Rate limit error (429)
      if (response.status === 429) {
        throw new Error(data.message || 'Too many requests. Please try again later.');
      }
      
      // Validation errors (400)
      if (response.status === 400) {
        const errorMessage = data.errors 
          ? Object.values(data.errors).join(', ')
          : data.message || 'Validation failed';
        throw new Error(errorMessage);
      }
      
      // Server errors (500)
      if (response.status >= 500) {
        throw new Error(data.message || 'Server error. Please try again later.');
      }
      
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    // Network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your connection and ensure the backend is running.');
    }
    
    throw error;
  }
}

// ============================================
// Contact API
// ============================================

export const contactApi = {
  /**
   * Submit contact form
   * @param data Contact form data
   * @returns Promise with API response
   * @throws Error if request fails (network, validation, rate limit, server error)
   */
  submit: async (data: ContactRequest): Promise<ContactResponse> => {
    return apiRequest<void>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ============================================
// Services API
// ============================================

export const servicesApi = {
  /**
   * Get all active services
   * @returns Promise with services array
   */
  getAll: async (): Promise<ApiResponse<Service[]>> => {
    return apiRequest<Service[]>('/services');
  },
};

// ============================================
// Portfolio API
// ============================================

export const portfolioApi = {
  /**
   * Get all portfolio projects
   * @returns Promise with portfolio array
   */
  getAll: async (): Promise<ApiResponse<Portfolio[]>> => {
    return apiRequest<Portfolio[]>('/portfolio');
  },
};

// ============================================
// Testimonials API
// ============================================

export const testimonialsApi = {
  /**
   * Get all approved testimonials
   * @returns Promise with testimonials array
   */
  getAll: async (): Promise<ApiResponse<Testimonial[]>> => {
    return apiRequest<Testimonial[]>('/testimonials');
  },
};

// ============================================
// Statistics API
// ============================================

export const statisticsApi = {
  /**
   * Get all active statistics
   * @returns Promise with statistics array
   */
  getAll: async (): Promise<ApiResponse<Statistics[]>> => {
    return apiRequest<Statistics[]>('/statistics');
  },
};

// ============================================
// FAQ API
// ============================================

export const faqApi = {
  /**
   * Get all active FAQs
   * @returns Promise with FAQs array
   */
  getAll: async (): Promise<ApiResponse<Faq[]>> => {
    return apiRequest<Faq[]>('/faq');
  },
};
```

---

## 📧 Contact Form Integration

### Complete Contact Form Component

Create `components/ContactForm.tsx`:

```typescript
'use client';

import { useState, FormEvent } from 'react';
import { contactApi } from '@/lib/api';
import { ContactRequest } from '@/types/api';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactRequest>({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await contactApi.submit(formData);
      
      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: response.message || 'Thank you for your message! We\'ll get back to you soon.',
        });
        
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: response.message || 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      let errorMessage = 'Failed to send message. Please try again later.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Handle rate limit specifically
        if (error.message.includes('Too many requests')) {
          errorMessage = 'You have submitted too many requests. Please wait an hour before trying again.';
        }
      }
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (submitStatus.type === 'error') {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={255}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSubmitting}
            placeholder="Your full name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSubmitting}
            placeholder="your.email@example.com"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            minLength={10}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isSubmitting}
            placeholder="Your message (minimum 10 characters)"
          />
          <p className="mt-1 text-sm text-gray-500">
            {formData.message.length}/10 minimum characters
          </p>
        </div>

        {/* Status Message */}
        {submitStatus.type && (
          <div
            className={`p-4 rounded-lg ${
              submitStatus.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {submitStatus.type === 'success' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <p>{submitStatus.message}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
}
```

---

## 🎨 Optional Endpoints Integration

### Services Component

Create `components/ServicesSection.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { servicesApi } from '@/lib/api';
import { Service } from '@/types/api';

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesApi.getAll();
        if (response.success && response.data) {
          setServices(response.data);
        } else {
          setError('Failed to load services');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        Error: {error}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No services available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <div
          key={service.id}
          className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
        >
          {service.icon && (
            <div className="text-4xl mb-4">{service.icon}</div>
          )}
          <h3 className="text-xl font-bold mb-2">{service.title}</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Portfolio Component

Create `components/PortfolioSection.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { portfolioApi } from '@/lib/api';
import { Portfolio } from '@/types/api';

export default function PortfolioSection() {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await portfolioApi.getAll();
        if (response.success && response.data) {
          setPortfolio(response.data);
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading portfolio...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolio.map((item) => (
        <div key={item.id} className="border rounded-lg overflow-hidden shadow-md">
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <span className="text-sm text-gray-500 mb-2 block">{item.category}</span>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
            <div className="flex gap-4">
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Live Demo →
                </a>
              )}
              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  GitHub →
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Testimonials Component

Create `components/TestimonialsSection.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { testimonialsApi } from '@/lib/api';
import { Testimonial } from '@/types/api';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialsApi.getAll();
        if (response.success && response.data) {
          setTestimonials(response.data);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) return <div>Loading testimonials...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="p-6 border rounded-lg">
          <div className="flex items-center mb-4">
            {testimonial.avatar && (
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mr-4">
                {testimonial.avatar}
              </div>
            )}
            <div>
              <h4 className="font-bold">{testimonial.name}</h4>
              <p className="text-sm text-gray-600">{testimonial.role}</p>
            </div>
          </div>
          {testimonial.rating && (
            <div className="mb-2">
              {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
            </div>
          )}
          <p className="text-gray-700">"{testimonial.content}"</p>
        </div>
      ))}
    </div>
  );
}
```

### Statistics Component

Create `components/StatisticsSection.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { statisticsApi } from '@/lib/api';
import { Statistics } from '@/types/api';

export default function StatisticsSection() {
  const [statistics, setStatistics] = useState<Statistics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await statisticsApi.getAll();
        if (response.success && response.data) {
          setStatistics(response.data);
        }
      } catch (err) {
        console.error('Error fetching statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <div>Loading statistics...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {statistics.map((stat) => (
        <div key={stat.id} className="text-center p-6 border rounded-lg">
          {stat.icon && <div className="text-3xl mb-2">{stat.icon}</div>}
          <div className="text-3xl font-bold mb-2">{stat.number}</div>
          <div className="text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
```

### FAQ Component

Create `components/FaqSection.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { faqApi } from '@/lib/api';
import { Faq } from '@/types/api';

export default function FaqSection() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await faqApi.getAll();
        if (response.success && response.data) {
          setFaqs(response.data);
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) return <div>Loading FAQs...</div>;

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={faq.id} className="border rounded-lg">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
          >
            <span className="font-semibold">{faq.question}</span>
            <span className="text-gray-400">
              {openIndex === index ? '−' : '+'}
            </span>
          </button>
          {openIndex === index && (
            <div className="p-4 pt-0 text-gray-700">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## 🎣 Custom React Hook for API Calls

### Create `hooks/useApi.ts`

```typescript
import { useState, useEffect, useCallback } from 'react';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useApi<T>(
  apiCall: () => Promise<{ success: boolean; data?: T }>
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiCall();
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError('Failed to fetch data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Usage Example:
// const { data: services, loading, error, refetch } = useApi(() => servicesApi.getAll());
```

---

## 🚨 Error Handling Guide

### Error Types and Handling

1. **Network Errors**
   - **Cause:** Backend not running, network issues
   - **Message:** "Network error. Please check your connection."
   - **Action:** Check backend status, verify API URL

2. **Validation Errors (400)**
   - **Cause:** Invalid form data
   - **Message:** Shows specific field errors from backend
   - **Action:** Display errors next to form fields

3. **Rate Limit Errors (429)**
   - **Cause:** Too many requests (3 per hour for contact form)
   - **Message:** "Too many requests. Please try again later."
   - **Action:** Show user-friendly message, disable form temporarily

4. **Server Errors (500+)**
   - **Cause:** Backend server error
   - **Message:** "Server error. Please try again later."
   - **Action:** Log error, show generic message to user

### Error Handling Example

```typescript
try {
  const response = await contactApi.submit(formData);
  // Success handling
} catch (error) {
  if (error instanceof Error) {
    // Check error type
    if (error.message.includes('Network error')) {
      // Handle network error
    } else if (error.message.includes('Too many requests')) {
      // Handle rate limit
    } else {
      // Handle other errors
    }
  }
}
```

---

## ✅ Testing Guide

### Step 1: Start Backend

```bash
cd j4-innovate-backend
mvn spring-boot:run
```

Verify backend is running:
- Visit: `http://localhost:8080/actuator/health`
- Should return: `{"status":"UP"}`

### Step 2: Start Frontend

```bash
cd your-nextjs-frontend
npm run dev
```

### Step 3: Test Contact Form

1. Navigate to contact page
2. Fill out form with valid data:
   - Name: "John Doe" (2+ characters)
   - Email: "john@example.com" (valid email)
   - Message: "This is a test message" (10+ characters)
3. Submit form
4. Verify success message appears
5. Check form resets
6. Check backend logs for email sending

### Step 4: Test Validation

1. Submit form with invalid email → Should show validation error
2. Submit form with short message (< 10 chars) → Should show validation error
3. Submit form with empty fields → Should show validation errors

### Step 5: Test Rate Limiting

1. Submit contact form 3 times quickly → All should succeed
2. Submit 4th time → Should show rate limit error (429)
3. Wait 1 hour or change IP → Should work again

### Step 6: Test Optional Endpoints

1. Visit pages using Services/Portfolio/Testimonials/etc.
2. Verify data loads from backend
3. Check loading states work
4. Check error handling if backend is down

### Step 7: Test Network Errors

1. Stop backend server
2. Try to submit contact form
3. Should show network error message

---

## 🚀 Production Setup

### 1. Update Environment Variables

Create `.env.production`:

```env
NEXT_PUBLIC_API_URL=https://api.j4innovate.com
NEXT_PUBLIC_API_BASE_URL=https://api.j4innovate.com/api
```

### 2. Update Backend CORS

In `src/main/java/com/j4innovate/config/CorsConfig.java`:

```java
config.setAllowedOrigins(List.of(
    "http://localhost:3000",
    "https://j4innovate.com",
    "https://www.j4innovate.com"
));
```

### 3. Build for Production

**Frontend:**
```bash
npm run build
npm start
```

**Backend:**
```bash
mvn clean package
java -jar target/j4-innovate-backend-1.0.0.jar
```

### 4. Security Checklist

- [ ] Use HTTPS in production
- [ ] Update CORS to only allow production domains
- [ ] Set secure environment variables
- [ ] Enable rate limiting (already configured)
- [ ] Set up proper error logging
- [ ] Configure database backups

---

## 🔧 Troubleshooting

### Issue 1: CORS Errors

**Symptoms:**
```
Access to fetch at 'http://localhost:8080/api/contact' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solutions:**
1. Verify backend `CorsConfig.java` includes `http://localhost:3000`
2. Check backend is running on port 8080
3. Restart backend after CORS changes
4. Clear browser cache

### Issue 2: Network Error / Connection Refused

**Symptoms:**
```
Network error. Please check your connection.
```

**Solutions:**
1. Verify backend is running: `http://localhost:8080/actuator/health`
2. Check `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
3. Restart Next.js dev server after changing env variables
4. Check firewall/antivirus blocking connections

### Issue 3: Validation Errors Not Showing

**Symptoms:**
- Form submits but errors don't display

**Solutions:**
1. Check error handling in API client
2. Verify `errors` object structure matches backend response
3. Check browser console for error details
4. Verify form validation matches backend requirements

### Issue 4: Rate Limit Not Working

**Symptoms:**
- Can submit more than 3 times per hour

**Solutions:**
1. Rate limiting is per IP address
2. Test from different network/IP
3. Check backend logs for rate limit enforcement
4. Verify `RateLimitService` is being called

### Issue 5: Environment Variables Not Working

**Symptoms:**
- API calls go to wrong URL

**Solutions:**
1. Variables must start with `NEXT_PUBLIC_` to be exposed to browser
2. Restart Next.js dev server after changing `.env.local`
3. Check variable names match exactly
4. Verify `.env.local` is in project root

### Issue 6: TypeScript Errors

**Symptoms:**
- Type errors in IDE

**Solutions:**
1. Verify all types are imported correctly
2. Check `types/api.ts` file exists
3. Restart TypeScript server in IDE
4. Run `npm run build` to see all errors

---

## 📦 Complete File Structure

```
your-nextjs-project/
├── .env.local                    # Environment variables
├── types/
│   └── api.ts                    # TypeScript types
├── lib/ (or services/)
│   └── api.ts                    # API client
├── hooks/
│   └── useApi.ts                 # Custom React hook (optional)
├── components/
│   ├── ContactForm.tsx           # Contact form
│   ├── ServicesSection.tsx       # Services (optional)
│   ├── PortfolioSection.tsx      # Portfolio (optional)
│   ├── TestimonialsSection.tsx   # Testimonials (optional)
│   ├── StatisticsSection.tsx     # Statistics (optional)
│   └── FaqSection.tsx            # FAQ (optional)
└── app/ (or pages/)
    └── contact/
        └── page.tsx              # Contact page
```

---

## 🎯 Quick Integration Checklist

- [ ] Create `.env.local` with API URLs
- [ ] Create `types/api.ts` with all TypeScript interfaces
- [ ] Create `lib/api.ts` with API client functions
- [ ] Update Contact form component to use API
- [ ] Add error handling and loading states
- [ ] Test contact form submission
- [ ] Test validation errors
- [ ] Test rate limiting
- [ ] (Optional) Integrate Services endpoint
- [ ] (Optional) Integrate Portfolio endpoint
- [ ] (Optional) Integrate Testimonials endpoint
- [ ] (Optional) Integrate Statistics endpoint
- [ ] (Optional) Integrate FAQ endpoint
- [ ] Test all endpoints
- [ ] Update CORS for production domains
- [ ] Build and test production build

---

## 📞 API Endpoints Summary

| Endpoint | Method | Description | Required |
|----------|--------|-------------|----------|
| `/api/contact` | POST | Submit contact form | ✅ Yes |
| `/api/services` | GET | Get all services | ❌ Optional |
| `/api/portfolio` | GET | Get all portfolio items | ❌ Optional |
| `/api/testimonials` | GET | Get all testimonials | ❌ Optional |
| `/api/statistics` | GET | Get all statistics | ❌ Optional |
| `/api/faq` | GET | Get all FAQs | ❌ Optional |
| `/actuator/health` | GET | Health check | ❌ Optional |
| `/swagger-ui.html` | GET | API documentation | ❌ Optional |

---

## 🔗 Useful Links

- **Backend API:** `http://localhost:8080/api`
- **Swagger UI:** `http://localhost:8080/swagger-ui.html`
- **Health Check:** `http://localhost:8080/actuator/health`
- **Frontend:** `http://localhost:3000`

---

## 💡 Tips & Best Practices

1. **Always handle errors gracefully** - Show user-friendly messages
2. **Show loading states** - Improve UX during API calls
3. **Validate on frontend** - But don't rely on it (backend validates too)
4. **Use TypeScript** - Catch errors at compile time
5. **Test rate limiting** - Ensure users understand limits
6. **Log errors** - Help with debugging in production
7. **Use environment variables** - Easy to switch between dev/prod
8. **Handle network errors** - Backend might be down
9. **Clear form on success** - Better UX
10. **Show validation errors** - Help users fix issues

---

## 🎉 You're All Set!

This document contains everything you need to integrate your Next.js frontend with the Spring Boot backend. Follow the steps in order, and you'll have a fully integrated application in no time!

**Need Help?**
- Check the Troubleshooting section
- Verify backend is running
- Check browser console for errors
- Test API endpoints directly with Postman/curl

**Happy Coding! 🚀**

