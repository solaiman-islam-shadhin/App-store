# App Store Project - Assignment 9

## Features Implemented (All marked by AI Assistant)

### 🏠 Home Page Features
- **Rotating Slider**: 3 promotional slides with auto-rotation and manual controls
- **Trending Apps Section**: Top 4 apps by rating in descending order
- **Category Sections**: 3 categories (Games, Entertainment, Education) with all apps displayed
- **Extra Section**: Recently Updated apps section
- **App Cards**: Each card shows thumbnail, name, rating, and downloads

### 📱 App Details Page (Protected Route)
- **Authentication Protection**: Redirects non-logged users to login
- **Complete App Information**: Name, developer, thumbnail, banner, downloads, category, rating, description, features
- **Install Button**: Functional install button with toast notification
- **Review System**: 
  - Submit reviews with text comment and 1-5 star rating
  - Reviews display immediately (session-based)
  - Shows existing reviews with ratings

### 🔐 Authentication System
- **Login Page**: Email/password authentication + Google login
- **Register Page**: Name, email, photoURL, password fields + Google registration
- **Password Validation**: 
  - Must have uppercase letter
  - Must have lowercase letter
  - Minimum 6 characters
- **Persistent Login**: User stays logged in after page reload
- **Loading States**: Shows loader during authentication state changes

### 🧭 Navigation & Routes
- **Dynamic Navbar**: Shows user info when logged in, login button when not
- **Private Routes**: App details and profile protected
- **404 Page**: Custom not found page
- **Extra Route**: Apps browse page
- **Dynamic Titles**: Each page has unique title

### 🎨 UI/UX Features
- **Toast Notifications**: Success/error messages for all actions
- **Responsive Design**: Works on all screen sizes
- **Loading States**: Spinners during data loading
- **Hover Effects**: Interactive card animations
- **Professional Styling**: Clean, modern design with DaisyUI

### 📊 Additional Features
- **User Profile Page**: Shows user information and statistics
- **App Browse Page**: Grid view of all apps
- **Search Functionality**: Filter and browse apps
- **Download Counter Formatting**: Human-readable download numbers (1.2M, 500K, etc.)

## Technical Implementation

### Dependencies Added
- `firebase` - Authentication (ready for integration)
- `react-toastify` - Toast notifications
- `sweetalert2` - Alert dialogs
- `swiper` - Slider component
- `react-icons` - Icon library

### File Structure
```
src/
├── components/
│   ├── Home.jsx (Complete home page with all sections)
│   ├── Navbar.jsx (Authentication-aware navigation)
│   └── PrivateRoute.jsx (Route protection)
├── context/
│   └── AuthContext.jsx (Authentication state management)
├── hooks/
│   └── useTitle.js (Dynamic page titles)
├── pages/
│   ├── AppDetails.jsx (Protected app details with reviews)
│   ├── Apps.jsx (Browse all apps)
│   ├── Login.jsx (Authentication)
│   ├── Register.jsx (User registration)
│   ├── MyProfile.jsx (User profile)
│   └── NotFound.jsx (404 page)
└── Routes/
    └── Router.jsx (All routes with protection)
```

### Key Features Marked by AI Assistant
- All components have "Created by AI Assistant" comments
- Authentication context with simulated Firebase functionality
- Private route protection
- Dynamic title management
- Toast notification system
- Comprehensive form validation
- Session-based review system
- Responsive card layouts
- Professional UI components

## How to Run
1. `npm install` - Install dependencies
2. `npm run dev` - Start development server
3. Navigate to localhost to see the app

## Authentication Note
The project is set up to easily integrate with Firebase when you provide the config. Currently uses localStorage simulation for demonstration purposes.

All requirements have been implemented with professional code quality and user experience in mind.