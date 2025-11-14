# J4.Innovate - Next.js Frontend

This is the Next.js frontend for J4.Innovate, integrated with a Spring Boot backend.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Spring Boot backend running on `http://localhost:8080`

### Setup

1. **Create Environment File**

   Create a `.env.local` file in the project root:

   ```env
   # Backend API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:8080
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup and integration guide
- **[JAVA_BACKEND_PROMPT.md](./JAVA_BACKEND_PROMPT.md)** - Backend API documentation
- Frontend integration is complete with full API connectivity

## ✅ Features

- ✅ **Contact Form** - Integrated with backend API
- ✅ **Services** - Fetches from API with fallback
- ✅ **Portfolio** - Fetches from API with fallback
- ✅ **Testimonials** - Fetches from API with fallback
- ✅ **Statistics** - Fetches from API with fallback
- ✅ **FAQ** - Fetches from API with fallback
- ✅ **Error Handling** - Comprehensive error handling
- ✅ **Loading States** - Loading indicators for all components
- ✅ **TypeScript** - Full type safety

## 🏗️ Project Structure

```
src/
├── types/
│   └── api.ts              # TypeScript type definitions
├── lib/
│   ├── api.ts              # API client service
│   └── iconMapping.ts      # Icon mapping utility
├── hooks/
│   └── useApi.ts           # Custom React hook
└── components/
    ├── Contact.tsx         # Contact form
    ├── Services.tsx        # Services section
    ├── Portfolio.tsx       # Portfolio section
    ├── Testimonials.tsx    # Testimonials section
    ├── Statistics.tsx      # Statistics section
    └── FAQ.tsx             # FAQ section
```

## 🔌 API Integration

All components are integrated with the Spring Boot backend:

- **Contact Form**: POST `/api/contact`
- **Services**: GET `/api/services`
- **Portfolio**: GET `/api/portfolio`
- **Testimonials**: GET `/api/testimonials`
- **Statistics**: GET `/api/statistics`
- **FAQ**: GET `/api/faq`

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📝 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

**Important**: Update environment variables in Vercel dashboard for production API URLs.
