# Replit MD

## Overview

Nexarion AI is a comprehensive SaaS platform designed for automation and communication, targeting creators, entrepreneurs, coaches, agencies, and small businesses. The application provides a unified interface for managing WhatsApp, Instagram, and email automation campaigns, along with a built-in affiliate system and comprehensive dashboard analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript, utilizing a modern component-based architecture:
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
The backend follows a traditional Express.js REST API pattern:
- **Framework**: Node.js with Express.js
- **Authentication**: Passport.js with local strategy and session-based auth
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful endpoints with proper HTTP status codes
- **Middleware**: Custom logging, error handling, and authentication middleware

### Database Design
The application uses PostgreSQL with Drizzle ORM:
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Connection pooling with @neondatabase/serverless

## Key Components

### Authentication System
- **Strategy**: Session-based authentication using Passport.js
- **Password Security**: Scrypt hashing with salt for password storage
- **User Roles**: Admin, user, and affiliate roles with different permissions
- **Session Storage**: PostgreSQL-backed session store for scalability

### Database Schema
The schema includes comprehensive tables for:
- **Users**: Core user data with role-based access and affiliate codes
- **Integrations**: Platform connections (WhatsApp, Instagram, Email)
- **Campaigns**: Marketing campaign definitions and configurations
- **Automations**: Automated workflow definitions
- **Analytics**: Campaign performance tracking
- **Affiliate System**: Referral tracking and commission management
- **Payments**: Billing and subscription management

### UI Component System
- **Design System**: shadcn/ui components with consistent theming
- **Theme Support**: Light/dark mode with CSS custom properties
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Radix UI primitives ensure accessibility compliance

### Dashboard Features
- **Analytics Dashboard**: Real-time stats and performance metrics
- **Campaign Management**: Create, edit, and monitor automation campaigns
- **Integration Management**: Connect and manage third-party platforms
- **Affiliate Program**: Built-in referral system with commission tracking
- **Admin Panel**: Administrative tools for user and system management

## Data Flow

### Authentication Flow
1. User submits credentials via login form
2. Server validates credentials using Passport.js local strategy
3. Successful authentication creates server-side session
4. Client receives authenticated user data and stores in React Query cache
5. Protected routes check authentication status via API calls

### Campaign Management Flow
1. User creates campaign through dashboard interface
2. Campaign data is validated and stored in PostgreSQL
3. Integration credentials are used to connect with external platforms
4. Automated messages are scheduled and sent through respective APIs
5. Analytics are collected and stored for performance tracking

### Affiliate System Flow
1. Users receive unique affiliate codes upon registration
2. Referral links include affiliate codes as query parameters
3. New signups with referral codes are tracked in the database
4. Commission calculations are performed and stored
5. Affiliate earnings are displayed in dedicated dashboard section

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **UI Libraries**: Radix UI primitives, Lucide React icons
- **Authentication**: Passport.js with session management
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: date-fns for date manipulation
- **Styling**: Tailwind CSS with custom theme configuration

### Development Dependencies
- **Build Tools**: Vite, ESBuild for production builds
- **Type Checking**: TypeScript with strict configuration
- **Development**: tsx for running TypeScript in development
- **Linting**: Configured for TypeScript and React best practices

### API Integrations (Planned)
- **WhatsApp Business API**: For WhatsApp automation
- **Instagram Graph API**: For Instagram messaging
- **Email Services**: SendGrid or Mailgun for email automation
- **Payment Processing**: Stripe or similar for subscription billing

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js with ES Modules
- **Database**: Neon PostgreSQL with connection pooling
- **Session Store**: PostgreSQL-backed sessions for consistency
- **Hot Reload**: Vite HMR for fast development iteration

### Production Considerations
- **Build Process**: Vite builds frontend, ESBuild bundles backend
- **Static Assets**: Frontend built to `dist/public` directory
- **Environment Variables**: Database URL and session secrets
- **Session Security**: Secure cookies in production environment
- **Error Handling**: Comprehensive error middleware with proper logging

### Database Management
- **Schema Migrations**: Drizzle Kit for version-controlled schema changes
- **Connection Management**: Connection pooling for scalability
- **Data Validation**: Zod schemas for runtime type checking
- **Backup Strategy**: Relies on Neon's built-in backup capabilities

The application is designed to be scalable and maintainable, with clear separation of concerns between frontend and backend, comprehensive error handling, and a robust authentication system. The modular architecture allows for easy feature additions and platform integrations.
