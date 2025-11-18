# 🔗 Shortly - Modern URL Shortener

A full-stack URL shortening service with analytics, OAuth authentication, and a beautiful iOS-inspired glass morphism design. Built with the MERN stack (MongoDB, Express, React, Node.js) and modern web technologies.

---

## 📖 Description

Shortly is a powerful yet simple URL shortening platform that allows users to create custom short links, track analytics, and manage their URLs with ease. The application features a clean, modern UI with smooth animations and a comprehensive dashboard for monitoring link performance.

**Key Highlights:**
- 🎨 Modern iOS-inspired glass morphism UI design
- 🔐 Secure JWT-based authentication with OAuth support (GitHub & Google)
- 📊 Detailed click analytics with device, browser, and referrer tracking
- ⚡ Fast and lightweight with optimized bundle size
- 🔒 Enterprise-grade security with rate limiting and data validation
- 📱 Fully responsive design for mobile, tablet, and desktop

---

## ✨ Features

### Core Features
- **URL Shortening**: Convert long URLs into clean, short links instantly
- **Custom Slugs**: Create branded short links with custom slugs
- **Link Expiration**: Set expiration dates or click limits for temporary links
- **QR Code Generation**: Generate QR codes for easy sharing (planned)
- **Search & Filter**: Quickly find links with real-time search

### Analytics & Tracking
- **Click Analytics**: Track total clicks per link
- **Device Detection**: Monitor clicks by device type (Desktop, Mobile, Tablet)
- **Browser Tracking**: See which browsers are used to access links
- **Referrer Data**: Track where your traffic is coming from
- **Time-based Analytics**: View click trends over time

### Authentication & Security
- **Email/Password Authentication**: Traditional registration and login
- **OAuth Integration**: Sign in with GitHub or Google
- **JWT Tokens**: Secure token-based authentication with httpOnly cookies
- **Rate Limiting**: Prevent abuse with built-in rate limiters
- **Input Validation**: Comprehensive server-side and client-side validation
- **CORS Protection**: Secure cross-origin resource sharing
- **Helmet Security**: HTTP header security middleware

### User Experience
- **Dashboard**: Comprehensive dashboard with link management
- **Real-time Updates**: Instant UI updates with Redux state management
- **Modal-based Editing**: Clean UX for creating and editing links
- **Animated Transitions**: Smooth animations for better user experience
- **Toast Notifications**: Real-time feedback for user actions
- **Responsive Design**: Works seamlessly on all devices

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with latest features
- **Vite** - Lightning-fast build tool and dev server
- **Redux Toolkit** - State management with createAsyncThunk
- **React Router v7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - Promise-based HTTP client
- **@react-oauth/google** - Google OAuth integration

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Fast, minimalist web framework
- **MongoDB** - NoSQL database for scalability
- **Mongoose** - Elegant MongoDB ODM
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **express-rate-limit** - Rate limiting middleware
- **express-useragent** - User agent detection
- **Validator** - String validation and sanitization
- **Cookie-parser** - Parse cookies
- **CORS** - Cross-Origin Resource Sharing
- **Axios** - OAuth API requests
- **dotenv** - Environment variable management

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Auto-restart dev server
- **Git** - Version control

---

## 📁 Folder Structure

```
url-shortner/
├── BACKEND/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── analyticsController.js   # Analytics endpoints
│   │   ├── authController.js        # Auth & OAuth logic
│   │   ├── linkController.js        # Link CRUD operations
│   │   └── redirectController.js    # Link redirect handler
│   ├── middleware/
│   │   └── authMiddleware.js        # JWT verification
│   ├── models/
│   │   ├── Analytics.js             # Analytics schema
│   │   ├── Link.js                  # Link schema
│   │   └── User.js                  # User schema
│   ├── routes/
│   │   ├── analytics.js             # Analytics routes
│   │   ├── auth.js                  # Auth routes
│   │   ├── links.js                 # Link routes
│   │   └── redirectNew.js           # Redirect routes
│   ├── utils/
│   │   ├── authHelpers.js           # JWT & cookie utilities
│   │   ├── linkHelpers.js           # Link validation helpers
│   │   ├── oauthHelpers.js          # OAuth API utilities
│   │   ├── userHelpers.js           # User operations
│   │   └── validators.js            # Input validators
│   ├── .env                         # Environment variables
│   ├── app.js                       # Express app entry
│   └── package.json
│
├── FRONTEND/
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── assets/                  # Images, fonts, etc.
│   │   ├── components/
│   │   │   ├── forms/
│   │   │   │   ├── FormDivider.jsx
│   │   │   │   ├── OAuthButtons.jsx
│   │   │   │   └── index.js
│   │   │   ├── pricing/
│   │   │   │   ├── BillingToggle.jsx
│   │   │   │   ├── ComparisonTable.jsx
│   │   │   │   ├── FAQItem.jsx
│   │   │   │   ├── PricingCard.jsx
│   │   │   │   └── index.js
│   │   │   ├── shared/
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   └── index.js
│   │   │   ├── ui/
│   │   │   │   ├── Alert.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Spinner.jsx
│   │   │   │   └── index.js
│   │   │   ├── AnalyticsModal.jsx
│   │   │   ├── Body.jsx
│   │   │   ├── CreateLinkModal.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditLinkModal.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── LinkCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── index.js
│   │   ├── config/
│   │   │   └── env.js                # Environment config
│   │   ├── constants/
│   │   │   ├── index.js              # App constants
│   │   │   └── pricing.js            # Pricing data
│   │   ├── hooks/
│   │   │   ├── useAuth.js            # Auth hook
│   │   │   ├── useAuthInit.js        # Auth initialization
│   │   │   ├── useDebounce.js        # Debounce hook
│   │   │   ├── useWindowSize.js      # Window size hook
│   │   │   └── index.js
│   │   ├── layouts/
│   │   │   └── index.jsx             # Layout components
│   │   ├── pages/
│   │   │   ├── AccountPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── GithubCallbackPage.jsx
│   │   │   ├── GoogleCallbackPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── PricingPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx    # Auth guard
│   │   ├── services/
│   │   │   ├── api.js                # Axios instance
│   │   │   ├── authService.js        # Auth API calls
│   │   │   ├── urlService.js         # Link API calls
│   │   │   └── userService.js        # User API calls
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js      # Auth state
│   │   │   │   └── urlSlice.js       # URL state
│   │   │   └── index.js              # Redux store
│   │   ├── utils/
│   │   │   ├── auth.js               # Auth utilities
│   │   │   ├── helpers.js            # Helper functions
│   │   │   └── validation.js         # Client validation
│   │   ├── App.jsx                   # Root component
│   │   ├── index.css                 # Global styles
│   │   └── main.jsx                  # Entry point
│   ├── .env                          # Environment variables
│   ├── .env.example                  # Env template
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│
└── README.md                         # This file
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (v6 or higher) - Local or MongoDB Atlas
- **npm** or **yarn** package manager
- **Git** for version control

### 1. Clone the Repository
```bash
git clone https://github.com/ayush-ap11/url-shortner.git
cd url-shortner
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd BACKEND

# Install dependencies
npm install

# Create .env file (see Environment Variables section)
cp .env.example .env

# Start MongoDB (if running locally)
# mongod

# Start development server
npm run dev

# Or for production
npm start
```

The backend server will start on `http://localhost:3000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd FRONTEND

# Install dependencies
npm install

# Create .env file (see Environment Variables section)
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The frontend will start on `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/shortly
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/shortly

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_EXPIRES_IN=7d

# Cookie Configuration
COOKIE_SECURE=false
COOKIE_SAMESITE=lax

# CORS
CLIENT_ORIGIN=http://localhost:5173

# OAuth Configuration
# GitHub OAuth (Get from: https://github.com/settings/developers)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Google OAuth (Get from: https://console.cloud.google.com/apis/credentials)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5173/auth/google/callback
```

### Frontend (.env)

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_GITHUB_REDIRECT_URI=http://localhost:5173/auth/github/callback

# App Configuration
VITE_APP_URL=http://localhost:5173
```

### Getting OAuth Credentials

**GitHub OAuth:**
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:5173/auth/github/callback`
4. Copy Client ID and Client Secret to your `.env` files

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 Client ID
3. Add authorized redirect URI: `http://localhost:5173/auth/google/callback`
4. Copy Client ID and Client Secret to your `.env` files

---

## 🔒 Security & Best Practices

### Implemented Security Measures
- **JWT Authentication**: Secure token-based auth with httpOnly cookies
- **Password Hashing**: bcryptjs with salt rounds for secure storage
- **Rate Limiting**: Prevents brute force attacks and API abuse
- **Input Validation**: Comprehensive validation on client and server
- **CORS Protection**: Configured for specific origins only
- **Helmet Middleware**: Sets secure HTTP headers
- **XSS Protection**: Input sanitization and output encoding
- **SQL Injection Prevention**: Using Mongoose ODM with parameterized queries
- **Environment Variables**: Sensitive data stored securely
- **Cookie Security**: httpOnly, secure, and SameSite flags

### Security Notes
⚠️ **Important:**
- Change default JWT_SECRET before deployment
- Enable COOKIE_SECURE=true in production
- Use HTTPS in production environments
- Implement CSP (Content Security Policy) headers
- Regular dependency updates for security patches
- Monitor and log suspicious activities

---

## 🔮 Future Improvements

### Planned Features
- [ ] **QR Code Generation**: Generate QR codes for each short link
- [ ] **Link Categorization**: Organize links with tags and folders
- [ ] **Team Collaboration**: Multi-user workspaces with permissions
- [ ] **Custom Domains**: Full custom domain support with SSL
- [ ] **Link Preview**: Unfurl URLs with metadata and thumbnails
- [ ] **Bulk Import/Export**: CSV import/export for link management
- [ ] **Advanced Analytics**: Geolocation, time-zone based tracking
- [ ] **API Access**: Public API with rate-limited access
- [ ] **Link Scheduling**: Schedule links to go live at specific times
- [ ] **A/B Testing**: Split traffic between multiple destinations
- [ ] **Email Notifications**: Alerts for link performance milestones
- [ ] **Dark Mode**: Full dark theme support
- [ ] **Mobile App**: Native iOS and Android apps
- [ ] **Browser Extension**: Quick link shortening from any page

### Technical Improvements
- [ ] Add comprehensive unit and integration tests (Jest, React Testing Library)
- [ ] Implement Redis caching for improved performance
- [ ] Add WebSocket support for real-time analytics
- [ ] Implement CDN integration for static assets
- [ ] Add Docker containerization
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Implement database indexing optimization
- [ ] Add TypeScript for type safety
- [ ] Implement server-side rendering (SSR)
- [ ] Add Progressive Web App (PWA) support
- [ ] Implement logging and monitoring (Winston, Morgan)
- [ ] Add backup and disaster recovery

---

## 👨‍💻 Author

**Ayush Patel**

Full-Stack Developer passionate about building modern, scalable web applications with clean code and beautiful UI/UX.

### Connect with Me
- 🌐 **GitHub**: [https://github.com/ayush-ap11](https://github.com/ayush-ap11)
- 💼 **LinkedIn**: [https://linkedin.com/in/ayush-ap11](https://linkedin.com/in/ayush-ap11)
- 📧 **Email**: pawarayush1105@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

---

**⭐ If you find this project useful, please consider giving it a star on GitHub!**
