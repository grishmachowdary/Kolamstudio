# 🎨 Kolam Studio - Full-Stack Application

**Preserve South Indian Floor Art Through Technology**

A complete full-stack web application for learning, creating, and sharing traditional Kolam, Rangoli, Muggulu, and Pookalam patterns.

---

## 📚 WHAT YOU'LL LEARN

This project teaches you:
- ✅ React fundamentals (components, hooks, routing)
- ✅ Node.js + Express backend
- ✅ MongoDB database design
- ✅ JWT authentication
- ✅ REST API creation
- ✅ Canvas drawing logic
- ✅ File uploads
- ✅ Full-stack integration

---

## 🛠️ TECH STACK

### Frontend
- **React** - UI library (JavaScript, no TypeScript)
- **React Router** - Page navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication

---

## 📁 PROJECT STRUCTURE

```
kolam-studio-fullstack/
│
├── client/                    # Frontend React App
│   ├── public/               # Static files
│   ├── src/
│   │   ├── pages/           # Page components (Home, Generator, etc.)
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API calls to backend
│   │   ├── utils/           # Helper functions
│   │   ├── context/         # React Context (global state)
│   │   ├── App.js           # Main app component
│   │   └── main.js          # Entry point
│   ├── index.html           # HTML template
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
│
├── server/                   # Backend Node.js App
│   ├── routes/              # API route definitions
│   ├── controllers/         # Business logic
│   ├── models/              # MongoDB schemas
│   ├── middleware/          # Auth, validation, etc.
│   ├── config/              # Database & environment config
│   ├── utils/               # Helper functions
│   ├── server.js            # Entry point
│   └── package.json         # Backend dependencies
│
└── README.md                # This file
```

---

## 🚀 QUICK START

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo>
cd kolam-studio-fullstack
```

2. **Setup Backend**
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

3. **Setup Frontend**
```bash
cd client
npm install
npm run dev
```

4. **Access the app**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## 🎯 FEATURES

### 1. Digital Whiteboard
- Canvas-based drawing
- Dot-grid system (5×5 to 15×15)
- 6 symmetry modes (none, vertical, horizontal, both, radial-4, radial-8)
- Undo/redo functionality
- Cultural color palette
- Export as PNG, SVG, PDF

### 2. Pattern Generator
- Programmatic pattern generation
- Regional styles (Tamil, Telugu, Kannada, Malayalam)
- Symmetry and complexity controls
- Occasion presets (Diwali, Pongal, Onam, Wedding)

### 3. Scanner
- Image upload
- Basic pattern detection
- Grid and symmetry analysis
- Export to whiteboard

### 4. Learning Platform
- Structured tutorials
- Daily challenges
- Progress tracking
- Achievement badges

### 5. Community
- Public kolam feed
- Search and filters
- Like, comment, share
- Trending patterns

### 6. Library
- Personal saved designs
- Organize by occasion
- Re-edit in whiteboard

---

## 📖 HOW IT WORKS

### Frontend → Backend Communication

```
┌─────────────┐         HTTP Request          ┌─────────────┐
│             │  ────────────────────────────> │             │
│   React     │         (JSON data)            │   Express   │
│  Frontend   │                                │   Backend   │
│             │  <──────────────────────────── │             │
└─────────────┘         HTTP Response          └─────────────┘
                        (JSON data)                    │
                                                       │
                                                       ▼
                                              ┌─────────────┐
                                              │   MongoDB   │
                                              │  Database   │
                                              └─────────────┘
```

### Authentication Flow

```
1. User signs up → Backend creates user in MongoDB
2. User logs in → Backend returns JWT token
3. Frontend stores token in localStorage
4. Frontend sends token with every API request
5. Backend verifies token before processing request
```

---

## 🗄️ DATABASE SCHEMA

### User
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  createdAt: Date,
  points: Number,
  badges: Array
}
```

### Kolam
```javascript
{
  title: String,
  userId: ObjectId,
  region: String,
  difficulty: String,
  occasion: String,
  imageUrl: String,
  drawingData: Object,
  likes: Number,
  createdAt: Date
}
```

### Comment
```javascript
{
  kolamId: ObjectId,
  userId: ObjectId,
  text: String,
  createdAt: Date
}
```

---

## 🔐 API ENDPOINTS

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Kolams
- `GET /api/kolams` - Get all kolams (with filters)
- `GET /api/kolams/:id` - Get single kolam
- `POST /api/kolams` - Create kolam (protected)
- `PUT /api/kolams/:id` - Update kolam (protected)
- `DELETE /api/kolams/:id` - Delete kolam (protected)
- `POST /api/kolams/:id/like` - Like kolam (protected)

### Comments
- `GET /api/kolams/:id/comments` - Get comments
- `POST /api/kolams/:id/comments` - Add comment (protected)

### User
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile (protected)
- `GET /api/users/:id/kolams` - Get user's kolams

---

## 🎨 CULTURAL COLORS

```javascript
Tamil Orange:    #E67E22  // Turmeric-inspired
Telugu Blue:     #3498DB  // Traditional indigo
Kannada Gold:    #F39C12  // Sandalwood gold
Malayalam Green: #27AE60  // Kerala green
Kumkum Red:      #E74C3C  // Sacred vermillion
```

---

## 📚 LEARNING PATH

### Phase 1: Basics (Week 1)
- Understand React components
- Learn React hooks (useState, useEffect)
- Practice with the whiteboard canvas

### Phase 2: Backend (Week 2)
- Learn Express routing
- Understand MongoDB schemas
- Practice API creation

### Phase 3: Integration (Week 3)
- Connect frontend to backend
- Implement authentication
- Handle file uploads

### Phase 4: Advanced (Week 4)
- Add real-time features
- Optimize performance
- Deploy to production

---

## 🚀 DEPLOYMENT

### Frontend (Vercel)
```bash
cd client
npm run build
vercel deploy
```

### Backend (Render)
```bash
cd server
# Push to GitHub
# Connect to Render
# Set environment variables
```

### Database (MongoDB Atlas)
- Create free cluster
- Get connection string
- Update .env file

---

## 🔄 MIGRATION TO NEXT.JS

Want to upgrade to Next.js later? Here's how:

1. **File-based routing** - Move pages to `app/` directory
2. **Server components** - Use React Server Components
3. **API routes** - Move Express routes to `app/api/`
4. **Image optimization** - Use Next.js Image component
5. **SSR/SSG** - Add server-side rendering

---

## 📖 NEXT STEPS TO STUDY

After completing this project, learn:

1. **TypeScript** - Add type safety
2. **Redux/Zustand** - Advanced state management
3. **WebSockets** - Real-time features
4. **Docker** - Containerization
5. **Testing** - Jest, React Testing Library
6. **CI/CD** - GitHub Actions
7. **GraphQL** - Alternative to REST
8. **Microservices** - Scale your backend

---

## 🤝 CONTRIBUTING

This is an educational project. Feel free to:
- Add new features
- Improve documentation
- Fix bugs
- Share your kolam designs!

---

## 📄 LICENSE

MIT License - Feel free to use for learning

---

**Built with ❤️ to preserve South Indian cultural heritage**

வணக்கம் • నమస్కారం • ನಮಸ್ಕಾರ • നമസ്കാരം
