# Frontend Integration Setup Guide

This document provides quick setup instructions for integrating the Next.js frontend with the Spring Boot backend.

## Prerequisites

- Node.js 18+ installed
- Spring Boot backend running on `http://localhost:8080`
- Next.js development server

## Step 1: Create Environment File

Create a `.env.local` file in the project root with the following content:

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

**Important:**
- Variables must start with `NEXT_PUBLIC_` to be exposed to the browser
- Restart the Next.js dev server after creating or modifying `.env.local`
- The `.env.local` file is already ignored by git (see `.gitignore`)

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Start Backend

Make sure your Spring Boot backend is running:

```bash
# In the backend directory
mvn spring-boot:run
```

Verify backend is running by visiting: `http://localhost:8080/actuator/health`

## Step 4: Start Frontend

```bash
npm run dev
```

The frontend will be available at: `http://localhost:3000`

## Step 5: Test Integration

1. **Contact Form**: Navigate to the contact section and submit the form
2. **Services**: Services should load from the API (with fallback to static data)
3. **Portfolio**: Portfolio items should load from the API
4. **Testimonials**: Testimonials should load from the API
5. **Statistics**: Statistics should load from the API
6. **FAQ**: FAQs should load from the API

## Features

### ✅ Implemented

- **TypeScript Types**: Complete type definitions in `src/types/api.ts`
- **API Client**: Centralized API client in `src/lib/api.ts`
- **Contact Form**: Integrated with backend API
- **Services Component**: Fetches from API with fallback
- **Portfolio Component**: Fetches from API with fallback
- **Testimonials Component**: Fetches from API with fallback
- **Statistics Component**: Fetches from API with fallback
- **FAQ Component**: Fetches from API with fallback
- **Error Handling**: Comprehensive error handling for all API calls
- **Loading States**: Loading indicators for all components
- **Fallback Data**: Static fallback data when API is unavailable
- **Icon Mapping**: Dynamic icon rendering from API data

### 🔧 Custom Hook

A reusable `useApi` hook is available in `src/hooks/useApi.ts` for fetching data:

```typescript
import { useApi } from '@/hooks/useApi';
import { servicesApi } from '@/lib/api';

const { data, loading, error, refetch } = useApi(() => servicesApi.getAll());
```

## API Endpoints

| Endpoint | Method | Description | Status |
|----------|--------|-------------|--------|
| `/api/contact` | POST | Submit contact form | ✅ Required |
| `/api/services` | GET | Get all services | ✅ Optional |
| `/api/portfolio` | GET | Get all portfolio items | ✅ Optional |
| `/api/testimonials` | GET | Get all testimonials | ✅ Optional |
| `/api/statistics` | GET | Get all statistics | ✅ Optional |
| `/api/faq` | GET | Get all FAQs | ✅ Optional |

## Error Handling

All components include comprehensive error handling:

- **Network Errors**: Shows user-friendly messages when backend is unavailable
- **Validation Errors**: Displays specific field errors from backend
- **Rate Limit Errors**: Handles rate limiting (3 requests per hour for contact form)
- **Server Errors**: Shows generic error messages for server issues
- **Fallback Data**: Uses static data when API fails or returns no data

## Production Setup

For production, update `.env.local` (or create `.env.production`):

```env
NEXT_PUBLIC_API_URL=https://api.j4innovate.com
NEXT_PUBLIC_API_BASE_URL=https://api.j4innovate.com/api
```

Also update the backend CORS configuration to allow your production domain.

## Troubleshooting

### Issue: API calls fail

1. Verify backend is running: `http://localhost:8080/actuator/health`
2. Check `.env.local` file exists and has correct values
3. Restart Next.js dev server after changing environment variables
4. Check browser console for errors

### Issue: CORS errors

1. Verify backend `CorsConfig.java` includes `http://localhost:3000`
2. Restart backend after CORS changes
3. Clear browser cache

### Issue: Environment variables not working

1. Variables must start with `NEXT_PUBLIC_`
2. Restart Next.js dev server after changing `.env.local`
3. Verify `.env.local` is in project root

## File Structure

```
src/
├── types/
│   └── api.ts              # TypeScript type definitions
├── lib/
│   ├── api.ts              # API client service
│   └── iconMapping.ts      # Icon mapping utility
├── hooks/
│   └── useApi.ts           # Custom React hook for API calls
└── components/
    ├── Contact.tsx         # Contact form (✅ Integrated)
    ├── Services.tsx        # Services section (✅ Integrated)
    ├── Portfolio.tsx       # Portfolio section (✅ Integrated)
    ├── Testimonials.tsx    # Testimonials section (✅ Integrated)
    ├── Statistics.tsx      # Statistics section (✅ Integrated)
    └── FAQ.tsx             # FAQ section (✅ Integrated)
```

## Next Steps

1. ✅ Create `.env.local` file (see Step 1)
2. ✅ Start backend server
3. ✅ Start frontend server
4. ✅ Test all endpoints
5. ✅ Update backend CORS for production domains
6. ✅ Build and test production build

## Support

For detailed API documentation, see the `JAVA_BACKEND_PROMPT.md` file.

For frontend integration details, refer to the comprehensive integration guide provided.
