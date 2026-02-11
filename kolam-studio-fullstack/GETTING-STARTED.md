# 🚀 Getting Started with Kolam Studio

## What We've Built So Far

✅ **Frontend Structure Complete!**
- React app with Vite
- React Router for navigation
- Tailwind CSS for styling
- Authentication context
- All page components
- Navbar and Footer

## Next Steps

We'll build in this order:

1. ✅ **Frontend Setup** (DONE)
2. 🔄 **Backend Setup** (NEXT)
3. **Database Models**
4. **API Routes**
5. **Whiteboard Canvas**
6. **Pattern Generator**
7. **Full Integration**

---

## How to Run (Once Backend is Ready)

### Install Dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### Start Development Servers

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

### Access the App

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## Project Structure Explained

```
kolam-studio-fullstack/
│
├── client/                    # React Frontend
│   ├── src/
│   │   ├── pages/            # Each page component
│   │   │   ├── Home.jsx      # Landing page
│   │   │   ├── Login.jsx     # Login form
│   │   │   ├── Register.jsx  # Registration form
│   │   │   └── ...           # Other pages
│   │   │
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.jsx    # Top navigation
│   │   │   └── Footer.jsx    # Bottom footer
│   │   │
│   │   ├── context/          # Global state
│   │   │   └── AuthContext.jsx  # User authentication
│   │   │
│   │   ├── App.jsx           # Main app with routing
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   │
│   ├── index.html            # HTML template
│   ├── package.json          # Dependencies
│   └── vite.config.js        # Build configuration
│
└── server/                    # Node.js Backend (Coming next!)
    └── ...
```

---

## Understanding the Code

### 1. How Routing Works

```jsx
// In App.jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
</Routes>
```

- When user visits `/`, React shows `<Home />` component
- When user visits `/login`, React shows `<Login />` component
- No page reload! React just swaps components

### 2. How Authentication Works

```jsx
// In AuthContext.jsx
const login = async (email, password) => {
  // 1. Send request to backend
  const response = await axios.post('/api/auth/login', { email, password })
  
  // 2. Get token from response
  const { token } = response.data
  
  // 3. Store token in localStorage
  localStorage.setItem('token', token)
  
  // 4. Set token for future requests
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
```

### 3. How Components Use Auth

```jsx
// In any component
import { useAuth } from '../context/AuthContext'

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth()
  
  if (!isAuthenticated) {
    return <p>Please login</p>
  }
  
  return <p>Welcome {user.username}!</p>
}
```

---

## What's Next?

Now we'll build the **backend**:

1. Setup Express server
2. Connect to MongoDB
3. Create user authentication
4. Build REST API
5. Connect frontend to backend

Ready to continue? Let me know!
