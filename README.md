# 🔗 URL Shortener - Full Stack Application

A modern, full-stack URL shortener application with analytics, built with **React**, **Redux Toolkit**, **Express.js**, and **MongoDB**. Features secure **cookie-based authentication** and a beautiful, responsive UI.

## ✨ Features

### Core Features
- 🔐 **Secure Authentication** - Cookie-based JWT authentication (httpOnly cookies)
- 🔗 **URL Shortening** - Create custom short links
- 📊 **Analytics Dashboard** - Track clicks, devices, locations
- ⏰ **Link Expiration** - Set expiry dates for links
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- 🔒 **Protected Routes** - Role-based access control
- ⚡ **Real-time Updates** - Redux state management

### Security Features
- ✅ httpOnly cookies (XSS protection)
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Password hashing (bcrypt)
- ✅ JWT token expiration
- ✅ SameSite cookies (CSRF protection)
- ✅ Helmet.js security headers

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + cookie-parser
- **Security:** Helmet, CORS, bcrypt
- **Validation:** Custom validators

### Frontend
- **Framework:** React 19
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Build Tool:** Vite

## 📁 Project Structure

```
url-shortner/
├── BACKEND/
│   ├── app.js                 # Express server
│   ├── .env                   # Environment variables
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── controllers/          # Business logic
│   │   ├── authController.js
│   │   ├── linkController.js
│   │   └── analyticsController.js
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification
│   ├── models/               # Mongoose schemas
│   │   ├── User.js
│   │   ├── Link.js
│   │   └── Analytics.js
│   ├── routes/               # API routes
│   │   ├── auth.js
│   │   ├── links.js
│   │   └── analytics.js
│   └── utils/
│       └── validators.js     # Input validation
│
├── FRONTEND/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   │   ├── api.js       # Axios instance
│   │   │   ├── authService.js
│   │   │   └── urlService.js
│   │   ├── store/            # Redux store
│   │   │   └── slices/
│   │   │       ├── authSlice.js
│   │   │       └── urlSlice.js
│   │   ├── utils/            # Helper functions
│   │   └── hooks/            # Custom hooks
│   └── .env                  # Frontend config
│
├── API_DOCUMENTATION.md      # API reference
├── INTEGRATION_GUIDE.md      # Setup guide
├── INTEGRATION_SUMMARY.md    # Change summary
├── QUICKSTART.md             # Quick start
├── setup.ps1                 # Setup script
└── test-api.html             # API tester
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (running on localhost:27017)
- **npm** or **yarn**

### Option 1: Automated Setup (Windows)
```powershell
# Run the setup script (installs dependencies and starts servers)
.\setup.ps1
```

### Option 2: Manual Setup

#### 1. Setup Backend
```bash
cd BACKEND
npm install
npm run dev
```
Backend runs on **http://localhost:3000**

#### 2. Setup Frontend
```bash
cd FRONTEND
npm install
npm run dev
```
Frontend runs on **http://localhost:5173**

### 🎉 You're Ready!
- Open **http://localhost:5173** in your browser
- Register a new account
- Start creating short links!

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[QUICKSTART.md](QUICKSTART.md)** | Quick setup and start guide |
| **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** | Complete integration guide with architecture |
| **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** | Detailed API endpoint reference |
| **[INTEGRATION_SUMMARY.md](INTEGRATION_SUMMARY.md)** | Summary of integration changes |
| **[test-api.html](test-api.html)** | Interactive API testing tool |

## 🔐 Authentication Flow

### Cookie-Based Authentication
This application uses **httpOnly cookies** for secure authentication:

1. User registers/logs in with credentials
2. Backend validates and creates JWT token
3. Backend sets httpOnly cookie with token
4. Browser automatically sends cookie with each request
5. Backend verifies cookie on protected routes

**Benefits:**
- ✅ More secure than localStorage (XSS protection)
- ✅ Automatic cookie management by browser
- ✅ CSRF protection with SameSite attribute
- ✅ No manual token handling in frontend

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login user
POST   /api/auth/logout      # Logout user
GET    /api/auth/me          # Get current user (protected)
```

### Links (Protected)
```
POST   /api/links/create     # Create short link
GET    /api/links/all        # Get all user links
GET    /api/links/:id        # Get single link
PUT    /api/links/:id        # Update link
DELETE /api/links/:id        # Delete link
```

### Analytics (Protected)
```
GET    /api/analytics/:slug  # Get link analytics
```

## 🧪 Testing

### Interactive API Testing
Open `test-api.html` in your browser to test all API endpoints with a visual interface.

### Using cURL
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"name":"Test","email":"test@example.com","password":"Test@123456","phone":"9876543210"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"test@example.com","password":"Test@123456"}'

# Get user (with cookie)
curl http://localhost:3000/api/auth/me -b cookies.txt
```

## ⚙️ Configuration

### Backend Environment Variables (`.env`)
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/shortly
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
COOKIE_SECURE=false          # Set to true in production (HTTPS)
COOKIE_SAMESITE=lax
CLIENT_ORIGIN=http://localhost:5173
SHORT_URL_BASE=http://localhost:3000
```

### Frontend Environment Variables (`.env`)
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_URL=http://localhost:5173
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB (Windows)
net start MongoDB
```

### Port Already in Use
```bash
# Windows - Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### CORS Errors
- Ensure `CLIENT_ORIGIN` in backend `.env` matches frontend URL
- Verify frontend uses `http://localhost:5173` (not 127.0.0.1)

### Cookie Not Being Set
- Check `COOKIE_SECURE=false` for local development (HTTP)
- Ensure `withCredentials: true` in axios config
- Verify cookie exists in DevTools > Application > Cookies

## 📈 Development

### Backend Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server (nodemon)
```

### Frontend Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🔒 Security Considerations

### Development
- ✅ httpOnly cookies enabled
- ✅ CORS restricted to localhost
- ✅ Rate limiting on auth routes
- ✅ Password validation and hashing
- ✅ JWT token expiration

### Production Checklist
- [ ] Set `COOKIE_SECURE=true` (HTTPS only)
- [ ] Use strong `JWT_SECRET` (32+ characters)
- [ ] Configure specific CORS origins
- [ ] Enable rate limiting for all routes
- [ ] Set up SSL certificates
- [ ] Use environment-specific configs
- [ ] Implement proper logging
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Add database backups
- [ ] Implement email verification

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

Your Name

## 🙏 Acknowledgments

- React Documentation
- Express.js Documentation
- MongoDB Documentation
- Redux Toolkit Documentation
- Tailwind CSS

---

## 📞 Support

For detailed documentation, see:
- **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** - Complete setup guide
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - API reference
- **[QUICKSTART.md](QUICKSTART.md)** - Quick start guide

---

**Made with ❤️ using React, Express, and MongoDB**
