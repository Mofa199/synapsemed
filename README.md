# Synapse Med Project

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/mohamedfaisal199-3777s-projects/v0-synapse-med-project)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/02wZ7Lfiv6o)

## Overview

Synapse Med is a comprehensive medical education platform designed for medical, nursing, and pharmacy students. It features interactive learning modules, 3D anatomical models, AI-powered assistance, and gamified progress tracking.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

### Local Development Setup

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd synapse-med-project
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Update the environment variables with your values:
   \`\`\`env
   # Database (Neon PostgreSQL)
   DATABASE_URL="your-neon-database-url"
   POSTGRES_URL="your-postgres-url"
   
   # AI Integration
   DEEPSEEK_API_KEY="your-deepseek-api-key"
   
   # Authentication
   JWT_SECRET="your-jwt-secret"
   
   # File Upload
   NEXT_PUBLIC_MAX_FILE_SIZE=10485760
   NEXT_PUBLIC_ALLOWED_FILE_TYPES="image/*,application/pdf"
   \`\`\`

4. **Database Setup**
   Run the database migration scripts:
   \`\`\`bash
   # Execute the SQL scripts in the scripts/ folder
   npm run db:migrate
   \`\`\`

5. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development Guide

### Project Structure

\`\`\`
synapse-med/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── courses/           # Course pages
│   ├── library/           # Library pages
│   └── pharmacology/      # Pharmacology pages
├── components/            # Reusable React components
│   ├── ui/               # UI components (shadcn/ui)
│   └── ...               # Feature components
├── lib/                  # Utility functions
├── scripts/              # Database scripts
├── public/               # Static assets
└── types/                # TypeScript type definitions
\`\`\`

### Making Changes

#### 1. **Frontend Development**
- Components are located in the `components/` directory
- Pages use Next.js App Router in the `app/` directory
- Styling uses Tailwind CSS with custom components

#### 2. **Backend Development**
- API routes are in `app/api/`
- Database operations use direct SQL queries with Neon
- Authentication uses JWT tokens

#### 3. **Adding New Features**

**Adding a New Page:**
\`\`\`bash
# Create a new page
mkdir app/new-feature
touch app/new-feature/page.tsx
\`\`\`

**Adding a New Component:**
\`\`\`bash
# Create a new component
touch components/new-component.tsx
\`\`\`

**Adding API Routes:**
\`\`\`bash
# Create API route
mkdir app/api/new-endpoint
touch app/api/new-endpoint/route.ts
\`\`\`

### 🎨 Styling Guidelines

- Use Tailwind CSS for styling
- Follow the existing color scheme (blue primary, gray neutrals)
- Use the shadcn/ui components for consistency
- Maintain responsive design (mobile-first approach)

### 🔧 Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
\`\`\`

### 🧪 Testing User Accounts

The application includes three test user types:

1. **Medical Student**
   - Email: `medical@synapsemed.com`
   - Password: `medical123`

2. **Nursing Student**
   - Email: `nursing@synapsemed.com`
   - Password: `nursing123`

3. **Pharmacy Student**
   - Email: `pharmacy@synapsemed.com`
   - Password: `pharmacy123`

### 🔍 Key Features to Test

1. **Authentication System**
   - Login/logout functionality
   - Role-based access control
   - Profile management

2. **Learning Modules**
   - Course navigation
   - Progress tracking
   - Interactive content

3. **3D Models**
   - Anatomical model viewer
   - Interactive controls
   - Model information panels

4. **AI Assistant**
   - Chat functionality
   - Medical query responses
   - Context-aware suggestions

5. **Admin Dashboard**
   - Content management
   - User analytics
   - Badge system

### 🐛 Troubleshooting

#### Common Issues

1. **Database Connection Issues**
   \`\`\`bash
   # Check your DATABASE_URL in .env.local
   # Ensure Neon database is accessible
   \`\`\`

2. **AI Assistant Not Working**
   \`\`\`bash
   # Verify DEEPSEEK_API_KEY is set correctly
   # Check API rate limits
   \`\`\`

3. **Build Errors**
   \`\`\`bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   \`\`\`

4. **Styling Issues**
   \`\`\`bash
   # Rebuild Tailwind CSS
   npm run dev
   \`\`\`

### 📱 Mobile Development

- The app is fully responsive
- Test on various screen sizes
- Use browser dev tools for mobile simulation
- Key breakpoints: 640px (sm), 768px (md), 1024px (lg)

### 🚀 Deployment

#### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   - Import project from GitHub
   - Configure environment variables
   - Deploy automatically

2. **Environment Variables**
   Set all variables from `.env.local` in Vercel dashboard

#### Manual Deployment

\`\`\`bash
# Build the project
npm run build

# Start production server
npm run start
\`\`\`

### 🔄 Development Workflow

1. **Create a new branch**
   \`\`\`bash
   git checkout -b feature/new-feature
   \`\`\`

2. **Make your changes**
   - Edit components/pages
   - Test locally
   - Follow coding standards

3. **Commit changes**
   \`\`\`bash
   git add .
   git commit -m "Add new feature"
   \`\`\`

4. **Push and create PR**
   \`\`\`bash
   git push origin feature/new-feature
   \`\`\`

### 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Neon Database](https://neon.tech/docs)

## 🌐 Live Deployment

Your project is live at:
**[https://vercel.com/mohamedfaisal199-3777s-projects/v0-synapse-med-project](https://vercel.com/mohamedfaisal199-3777s-projects/v0-synapse-med-project)**

## 🔗 Continue Building

Continue building your app on:
**[https://v0.app/chat/projects/02wZ7Lfiv6o](https://v0.app/chat/projects/02wZ7Lfiv6o)**

---

## 📞 Support

For questions or issues:
- Check the troubleshooting section above
- Review the backend implementation guide
- Contact the development team

**Happy coding! 🎉**
