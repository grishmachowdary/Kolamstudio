# 🔌 API DOCUMENTATION - KOLAM STUDIO

## 📚 WHAT ARE APIs?

**API = Application Programming Interface**

APIs are like **waiters in a restaurant**:
- Frontend (Customer) asks for something
- API (Waiter) takes the request
- Backend (Kitchen) processes it
- Database (Storage) stores/retrieves data
- API brings response back to Frontend

---

## 🎯 HOW APIs ARE CREATED

### **3-STEP PROCESS:**

```
1. ROUTES (Menu)
   ↓
2. CONTROLLERS (Kitchen Logic)
   ↓
3. MODELS (Database Access)
```

### **Example: User Registration**

**Step 1: Route (Menu Item)**
```javascript
// File: server/routes/authRoutes.js
router.post('/register', register)
// Means: POST request to /api/auth/register calls register function
```

**Step 2: Controller (Kitchen)**
```javascript
// File: server/controllers/authController.js
export const register = async (req, res) => {
  // 1. Get data from request
  const { username, email, password } = req.body
  
  // 2. Validate data
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' })
  }
  
  // 3. Save to database
  const user = await User.create({ username, email, password })
  
  // 4. Generate JWT token
  const token = generateToken(user._id)
  
  // 5. Send response
  res.json({ success: true, token, user })
}
```

**Step 3: Model (Database)**
```javascript
// File: server/models/User.js
const User = mongoose.model('User', userSchema)
// Defines how user data is stored in MongoDB
```

---

## 📋 ALL APIs IN YOUR APP (15+ ENDPOINTS)

### **1. AUTHENTICATION APIs (4 endpoints)**

#### **POST /api/auth/register**
- **Purpose**: Create new user account
- **Access**: Public (anyone can register)
- **Request Body**:
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "john_doe",
      "email": "john@example.com"
    }
  }
  ```
- **Why**: Users need accounts to save kolams

---

#### **POST /api/auth/login**
- **Purpose**: Login existing user
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": { ... }
  }
  ```
- **Why**: Users need to login to access their data

---

#### **GET /api/auth/me**
- **Purpose**: Get current logged-in user
- **Access**: Protected (requires JWT token)
- **Headers**:
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Response**:
  ```json
  {
    "success": true,
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "john_doe",
      "email": "john@example.com",
      "points": 150,
      "badges": ["First Steps", "Week Warrior"]
    }
  }
  ```
- **Why**: Frontend needs to know who is logged in

---

#### **PUT /api/auth/profile**
- **Purpose**: Update user profile
- **Access**: Protected
- **Request Body**:
  ```json
  {
    "username": "new_username",
    "email": "newemail@example.com"
  }
  ```
- **Why**: Users want to update their information

---

### **2. KOLAM APIs (8 endpoints)**

#### **GET /api/kolams**
- **Purpose**: Get all public kolams (with filters)
- **Access**: Public
- **Query Parameters**:
  ```
  ?search=diwali
  &region=Tamil
  &difficulty=Beginner
  &occasion=Diwali
  &sort=-likes
  ```
- **Response**:
  ```json
  {
    "success": true,
    "count": 25,
    "kolams": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Beautiful Diwali Kolam",
        "user": {
          "username": "john_doe"
        },
        "region": "Tamil",
        "difficulty": "Intermediate",
        "occasion": "Diwali",
        "imageUrl": "/uploads/kolam123.png",
        "likes": 45,
        "views": 230,
        "createdAt": "2024-02-10T10:30:00Z"
      }
    ]
  }
  ```
- **Why**: Community page needs to display all kolams

---

#### **GET /api/kolams/:id**
- **Purpose**: Get single kolam by ID
- **Access**: Public
- **Response**: Single kolam object with full details
- **Why**: View detailed information about one kolam

---

#### **POST /api/kolams**
- **Purpose**: Create new kolam
- **Access**: Protected
- **Request**: Multipart form data (includes image file)
  ```json
  {
    "title": "My Kolam",
    "region": "Tamil",
    "difficulty": "Beginner",
    "occasion": "Daily",
    "description": "Beautiful design",
    "isPublic": true,
    "image": <file>
  }
  ```
- **Why**: Users create and save their