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
