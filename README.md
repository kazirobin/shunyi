# Shunyi Garments Management System

Enterprise Garments Management System & Corporate Website built with Next.js 14+, TypeScript, MongoDB Atlas, and Cloudinary.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Database**: MongoDB Atlas with Mongoose ODM
- **File Storage**: Cloudinary
- **Authentication**: NextAuth.js (Auth.js v5)
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI compatible
- **Animations**: Framer Motion
- **Internationalization**: next-intl (English & Chinese)
- **Theming**: next-themes (Light/Dark/System)
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Deployment**: Vercel

## Project Structure

```
shunyi-garments/
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── [locale]/           # Public website (i18n)
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── about/          # About Us
│   │   │   ├── products/       # Product Catalog
│   │   │   ├── rfq/            # Request for Quotation
│   │   │   ├── contact/        # Contact Page
│   │   │   ├── sustainability/ # Sustainability
│   │   │   └── quality-process/# Quality Process
│   │   ├── admin/              # Admin Dashboard
│   │   │   ├── login/          # Admin Login
│   │   │   ├── dashboard/      # Dashboard Overview
│   │   │   ├── workers/        # Worker Management
│   │   │   ├── attendance/     # Attendance Management
│   │   │   ├── payroll/        # Payroll Management
│   │   │   ├── production/     # Production Tracking
│   │   │   ├── inquiries/      # Buyer Inquiries
│   │   │   ├── reports/        # Reports & Exports
│   │   │   └── settings/       # System Settings
│   │   ├── api/
│   │   │   └── auth/[...nextauth]/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── shared/             # Shared components
│   │   ├── website/            # Public website components
│   │   └── admin/              # Admin dashboard components
│   ├── lib/
│   │   ├── mongodb.ts          # MongoDB connection
│   │   ├── cloudinary.ts       # Cloudinary config
│   │   ├── auth.ts             # NextAuth config
│   │   └── utils.ts            # Utility functions
│   ├── models/                 # Mongoose models
│   ├── services/               # Business logic
│   ├── hooks/                  # Custom hooks
│   ├── store/                  # Zustand stores
│   ├── types/                  # TypeScript types
│   ├── validations/            # Zod schemas
│   ├── messages/               # i18n translations
│   └── middleware.ts           # Auth middleware
├── .env.example
├── .env.local
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- Vercel account (for deployment)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd shunyi-garments

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

### Environment Variables

Create `.env.local` with the following variables:

```env
# Application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# MongoDB Atlas
MONGODB_URI=mongodb://username:password@cluster.mongodb.net/shunyigarments
MONGODB_DB_NAME=shunyigarments

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_strong_random_secret

# Internationalization
DEFAULT_LOCALE=en
SUPPORTED_LOCALES=en,zh
```

### Database Setup

The application uses Mongoose models that will automatically create collections on first use. For production, ensure MongoDB Atlas has:

- Database user with read/write permissions
- Network access configured for your IP/Vercel
- Proper indexes (defined in models)

### Cloudinary Setup

Create folders in Cloudinary:
- `shunyi-garments/products/`
- `shunyi-garments/workers/`
- `shunyi-garments/worker-documents/`
- `shunyi-garments/rfq/`
- `shunyi-garments/certificates/`
- `shunyi-garments/website/`

Configure upload presets for signed uploads if needed.

### Default Admin User

Create the first admin user via MongoDB shell or a seed script:

```javascript
// In MongoDB shell
db.users.insertOne({
  email: "admin@shunyigarments.com",
  password: await bcrypt.hash("admin123", 12),
  name: "System Administrator",
  role: "SUPER_ADMIN",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## Features

### Public Website
- ✅ Homepage with hero, stats, capabilities, certifications
- ✅ About Us with history, values, leadership, facilities
- ✅ Product Catalog with filtering (Knitwear, Woven, Denim, Outerwear)
- ✅ RFQ Form with file upload for tech packs
- ✅ Contact page with form, map, WhatsApp/WeChat
- ✅ Sustainability page with initiatives, certifications, goals
- ✅ Quality Process with 6-stage inspection, lab capabilities
- ✅ Bilingual (English/Chinese) with next-intl
- ✅ Dark/Light mode with next-themes
- ✅ Responsive design with Tailwind CSS
- ✅ Animations with Framer Motion

### Admin Dashboard
- ✅ Admin authentication with NextAuth
- ✅ Role-based access control (6 roles)
- ✅ Dashboard with stats, charts, recent inquiries
- ✅ Worker Management (CRUD, documents, photos)
- ✅ Attendance Management (daily, bulk upload, reports)
- ✅ Payroll Management (processing, components, payslips)
- ✅ Production Tracking (lines, daily records, efficiency)
- ✅ Buyer Inquiry Management (status, assignment, notes)
- ✅ Reports (PDF/Excel/CSV export)
- ✅ System Settings (8 categories)
- ✅ Audit logging for all actions

### Security
- ✅ Password hashing with bcrypt
- ✅ JWT-based sessions with HttpOnly cookies
- ✅ Rate limiting on auth endpoints
- ✅ RBAC enforced at API level
- ✅ Input validation with Zod
- ✅ CSRF protection
- ✅ Sensitive data encryption
- ✅ Audit logging

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript check
```

### Code Style

- TypeScript strict mode enabled
- ESLint with Next.js config
- Prettier for formatting
- Component-driven development
- Server Components by default
- Client Components only when needed

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Set all variables from `.env.example` in Vercel dashboard:
- `MONGODB_URI` (production Atlas URI)
- `CLOUDINARY_*` (production credentials)
- `NEXTAUTH_SECRET` (strong random string)
- `NEXTAUTH_URL` (production URL)
- `NEXT_PUBLIC_APP_URL` (production URL)

### MongoDB Atlas Production

1. Create production cluster
2. Create database user with read/write
3. Whitelist Vercel IP ranges (or 0.0.0.0/0 for serverless)
4. Update connection string

### Cloudinary Production

1. Upgrade to paid plan for production volumes
2. Configure upload presets
3. Set up webhook notifications if needed
4. Configure backup/backup bucket

## API Routes Structure

```
/api/
├── auth/[...nextauth]/
├── workers/
│   ├── GET/POST /api/workers
│   ├── GET/PUT/DELETE /api/workers/[id]
│   └── POST /api/workers/[id]/documents
├── attendance/
│   ├── GET/POST /api/attendance
│   ├── POST /api/attendance/bulk
│   └── GET /api/attendance/reports
├── payroll/
│   ├── GET/POST /api/payroll
│   ├── POST /api/payroll/process
│   └── GET /api/payroll/payslips
├── production/
│   ├── GET/POST /api/production-lines
│   ├── GET/POST /api/production-records
│   └── GET /api/production/reports
├── inquiries/
│   ├── GET/POST /api/inquiries
│   ├── PUT /api/inquiries/[id]
│   └── POST /api/inquiries/[id]/notes
├── reports/
│   └── GET /api/reports/[type]
└── settings/
    ├── GET/PUT /api/settings
    └── GET /api/settings/public
```

## Models Overview

| Model | Description |
|-------|-------------|
| User | Admin users with roles |
| Worker | Employee records with documents |
| Department | Organizational departments |
| Designation | Job titles with grades |
| Shift | Work shifts with timings |
| Attendance | Daily attendance records |
| LeaveRequest | Leave applications |
| Payroll | Monthly salary processing |
| ProductionLine | Production line config |
| ProductionRecord | Daily production output |
| ProductCategory | Product categories |
| Product | Garment products |
| Inquiry | Buyer RFQs |
| Certificate | Compliance certificates |
| Document | Internal documents |
| AuditLog | System audit trail |
| SystemSettings | Configuration settings |

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

Proprietary - Shunyi Garments

## Support

For technical support, contact: dev@shunyigarments.com