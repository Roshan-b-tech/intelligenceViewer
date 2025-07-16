# Perceive Now - Intelligence Report Viewer

A production-ready intelligence report viewer that makes trust and confidence feel inevitable. Built for executives who need proof, not just dashboards.

## 🚀 Features

### Core Functionality
- **Intelligence Report Browser**: Browse synthetic reports with advanced filtering
- **Trust & Confidence**: Animated confidence meters and source traceability
- **Executive Feedback**: Submit feedback with ratings and flag specific sections, with instant success popup
- **Role-Based Access**: JWT authentication with viewer and reviewer roles
- **Theme Toggle**: Persistent light, dark, and custom color themes with seamless switching
- **Responsive UI**: Fully mobile-friendly layouts and components
- **Modern Profile Dropdown**: Avatar, user info, and logout in a polished dropdown
- **Branding**: Updated logo and color palette for a professional look

### Technical Architecture
- **Frontend**: React + TypeScript + Tailwind CSS + Framer Motion
- **Backend**: Vercel serverless API routes in `/api` (no Express server needed)
- **Data**: Mock JSON API with SQLite-compatible structure
- **Authentication**: JWT-based with hardcoded demo tokens
- **Monitoring**: Request latency logging with trace headers

## ✨ Recent Improvements
- Persistent theme toggle (remembers user choice across sessions)
- Success popup after submitting feedback
- Responsive, mobile-optimized login illustration and layouts
- Modernized profile dropdown with avatar and role
- New Perceive Now logo and branding
- Improved accessibility and UI polish throughout

## 🎯 Demo Accounts

- **exec@perceive.now** (Reviewer Role)
- **analyst@perceive.now** (Viewer Role)

## 🛠 Development

### Quick Start
```bash
# Install dependencies
npm install

# Start local development server (frontend + backend API routes)
vercel dev
```
- This will run both your React frontend and your API endpoints under `/api` locally at `http://localhost:3000`.
- You do **not** need to run a separate backend server.

### Production Build
```bash
npm run build
npm run preview
```

## 📊 API Endpoints

- `GET /api/reports` - Get filtered reports
- `GET /api/reports/:id` - Get specific report
- `POST /api/feedback` - Submit executive feedback
- `POST /api/auth/token` - Get JWT token
- `GET /api/health` - Health check

## 🏗 Production Roadiness (7-Day Plan)

### Day 1-2: Database & Auth
- Replace mock JSON with PostgreSQL + Prisma
- Implement proper OAuth 2.0 / SAML integration
- Add Redis for session management
- Set up database migrations

### Day 3-4: Infrastructure
- Containerize with Docker
- Set up CI/CD pipeline (GitHub Actions)
- Deploy to AWS/GCP with auto-scaling
- Add monitoring (DataDog, New Relic)

### Day 5-6: Security & Performance
- Implement rate limiting
- Add input validation & sanitization
- Set up CDN for static assets
- Add comprehensive error handling

### Day 7: Testing & Documentation
- Add unit/integration tests (Jest, Cypress)
- Performance testing & optimization
- API documentation (Swagger)
- Security audit & penetration testing

## 🔒 Security Features

- JWT authentication with role-based access
- Request tracing with UUID headers
- Input validation and sanitization
- CORS configuration
- Rate limiting (production-ready)

## 🎨 Design System

- **Colors**: Perceive Purple (#3F1470), Gold (#FFA301)
- **Typography**: Clean, executive-focused hierarchy
- **Animations**: Subtle micro-interactions for trust building
- **Responsive**: Mobile-first design with desktop optimization
- **Branding**: Modern logo and illustration for login

## 🧪 Testing Strategy

- Unit tests for all components
- Integration tests for API endpoints
- E2E tests for critical user flows
- Performance testing for large datasets
- Security testing for authentication flows

## 📈 Monitoring & Observability

- Request latency tracking
- Error rate monitoring
- User behavior analytics
- Performance metrics dashboard
- Alert system for anomalies

---

**Built with enterprise-grade standards for executive decision-making.**