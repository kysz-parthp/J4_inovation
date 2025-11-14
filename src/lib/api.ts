// lib/api.ts

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
