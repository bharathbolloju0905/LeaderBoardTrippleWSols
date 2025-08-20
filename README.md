# LeaderBoard Application 🏆

A full-stack leaderboard application that allows users to create accounts, claim points, and compete on a dynamic ranking system with historical tracking.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Frontend Components](#frontend-components)
- [Backend Architecture](#backend-architecture)
- [Database Schema](#database-schema)
- [Usage](#usage)
- [Contributing](#contributing)

## ✨ Features

- **User Registration**: Create new user accounts with name and email
- **Point System**: Users can claim random points (0-10 per claim)
- **Dynamic Leaderboard**: Real-time rankings sorted by total points
- **Historical Tracking**: Track point history for all users
- **Responsive Design**: Mobile-friendly interface with TailwindCSS
- **Interactive UI**: Expandable user profiles and smooth animations
- **Top 3 Highlighting**: Special styling for podium positions

## 🛠 Technology Stack

### Frontend
- **React 19.1.1** - Modern UI framework
- **Vite 7.1.2** - Fast build tool and dev server
- **TailwindCSS 4.1.12** - Utility-first CSS framework
- **React Router DOM 7.8.1** - Client-side routing
- **React Icons 5.5.0** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.17.2** - MongoDB object modeling
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 17.2.1** - Environment variable management

## 📁 Project Structure

```
LeaderBoardTrippleWSols/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx          # Main dashboard
│   │   │   ├── UserDetails.jsx   # User row component
│   │   │   ├── UserProfile.jsx   # Expandable user profile
│   │   │   └── UserForm.jsx      # New user creation form
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # React entry point
│   │   ├── index.css             # Global styles
│   │   └── App.css               # Component styles
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
├── Backend/
│   ├── controller/
│   │   └── user.controller.js    # Business logic
│   ├── models/
│   │   ├── user.model.js         # User schema
│   │   └── history.model.js      # History schema
│   ├── routes/
│   │   └── user.routes.js        # API routes
│   ├── DB/
│   │   └── connect.js            # Database connection
│   ├── app.js                    # Express app setup
│   └── package.json
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd LeaderBoardTrippleWSols
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```

### 4. Environment Configuration
Create `.env` files in both directories (see [Environment Variables](#environment-variables))

### 5. Start the Application

**Backend (Terminal 1):**
```bash
cd Backend
npm start
# Server runs on http://localhost:3000
```

**Frontend (Terminal 2):**
```bash
cd Frontend
npm run dev
# Client runs on http://localhost:5173
```

## 🔧 Environment Variables

### Frontend `.env`
```env
VITE_BASE_URL=http://localhost:3000
```

### Backend `.env`
```env
MONGO_URL=mongodb://localhost:27017/leaderboard
PORT=3000
```

## 📡 API Documentation

### Base URL: `http://localhost:3000/api/users`

#### Get All Users
```http
GET /api/users/
```
**Response:** Array of users sorted by points (descending)

#### Create New User
```http
POST /api/users/
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Claim Points
```http
GET /api/users/:userId/claim
```
**Response:** `{ message: "Points claimed successfully", points: 347 }`

#### Create History Entry
```http
POST /api/users/:userId/history
```

#### Get All History
```http
GET /api/users/history
```

#### Get User History
```http
GET /api/users/:userId/history
```

## 🧩 Frontend Components

### Home.jsx
Main dashboard component that orchestrates the entire leaderboard experience.

**Key Features:**
- Fetches and displays user rankings
- Manages expandable user profiles
- Handles new user modal
- Implements responsive scrolling

**State Management:**
```jsx
const [openUserId, setOpenUserId] = useState(null);     // Expanded user ID
const [users, setUsers] = useState([]);                // User data array
const [loading, setLoading] = useState(false);         // Loading state
const [isFormOpen, setIsFormOpen] = useState(false);   // Modal visibility
```

### UserDetails.jsx
Individual user row component displaying basic information and rank.

### UserProfile.jsx
Expandable component showing detailed user information with point claiming functionality.

### UserForm.jsx
Modal form component for creating new users with validation.

## 🏗 Backend Architecture

### Models

#### User Model
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  img: { type: String, default: "https://avatar.iran.liara.run/public" },
  points: { type: Number, default: 0 }
}
```

#### History Model
```javascript
{
  userId: { type: ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  points: { type: Number, default: 0 }
}
```

### Controller Functions

- **getAllUsers()** - Retrieve all users sorted by points
- **createUser()** - Create new user with validation
- **claimForUser()** - Add random points (0-10) to user
- **createHistory()** - Record current user points
- **getHistory()** - Retrieve all historical records
- **getHistoryForUser()** - Get user-specific history

## 🎯 Usage

1. **View Leaderboard**: Open the application to see current user rankings
2. **Add New User**: Click the green "+" button to create a new user
3. **View Profile**: Click on any user row to expand their profile
4. **Claim Points**: Use the "Claim Points" button in expanded profiles
5. **Track Progress**: Points are randomly awarded (0-10) per claim

## 🎨 UI Features

- **Top 3 Styling**: Gold, Silver, Bronze highlighting for podium positions
- **Smooth Animations**: Hover effects and transitions
- **Responsive Design**: Works on desktop and mobile devices
- **Modal Overlays**: Clean form presentation
- **Loading States**: User feedback during API calls

## 🔄 Data Flow

1. User interacts with frontend components
2. Frontend makes API calls to Express backend
3. Backend processes requests and interacts with MongoDB
4. Database operations return results to backend
5. Backend sends JSON responses to frontend
6. Frontend updates UI based on API responses

## 🚨 Error Handling

- **Frontend**: Try-catch blocks with console error logging
- **Backend**: Comprehensive error responses with appropriate HTTP status codes
- **Database**: Mongoose validation and connection error handling

## 🔒 Security Features

- **CORS Configuration**: Restricted to specific origins
- **Input Validation**: Required field validation
- **Unique Constraints**: Prevents duplicate email addresses
- **Error Sanitization**: Safe error messages to client

## 📱 Mobile Responsiveness

- Responsive layout with Flexbox and Grid
- Touch-friendly button sizes
- Optimized spacing for mobile screens
- Smooth scrolling with hidden scrollbars

## 🔧 Development Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
npm start        # Start server
npm run dev      # Start with nodemon (if configured)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- Infinite loop prevention implemented in user mapping
- CORS configuration requires frontend URL updates for deployment
- MongoDB connection requires proper environment setup

## 🚀 Future Enhancements

- User authentication and authorization
- Advanced point claiming strategies
- Team-based competitions
- Achievement system
- Real-time updates with WebSockets
- User profile pictures upload
- Export leaderboard data
- Advanced analytics and charts

---

**Made with ❤️ by Bharath Bolloju**

For support or questions, please open an issue