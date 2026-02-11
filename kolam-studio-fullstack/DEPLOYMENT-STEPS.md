# 🚀 KOLAM STUDIO - DEPLOYMENT GUIDE

## 📋 DEPLOYMENT CHECKLIST

### Prerequisites:
- [ ] GitHub account
- [ ] Vercel account (sign up with GitHub)
- [ ] Render account (sign up with GitHub)
- [ ] MongoDB Atlas account (free)

---

## STEP 1: SETUP MONGODB ATLAS (Cloud Database)

### 1.1 Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google or email
3. Choose FREE tier (M0 Sandbox)

### 1.2 Create Cluster
1. Click "Build a Database"
2. Choose "FREE" (M0)
3. Select region closest to you
4. Click "Create Cluster"

### 1.3 Create Database User
1. Click "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Username: `kolamstudio`
4. Password: Generate strong password (SAVE THIS!)
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"

### 1.4 Whitelist IP Address
1. Click "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.5 Get Connection String
1. Click "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `myFirstDatabase` with `kolam-studio`

**Example:**
```
mongodb+srv://kolamstudio:<password>@cluster0.xxxxx.mongodb.net/kolam-studio?retryWrites=true&w=majority
```

**SAVE THIS CONNECTION STRING!**

---

## STEP 2: PUSH CODE TO GITHUB

### 2.1 Initialize Git (if not done)
```bash
cd kolam-studio-fullstack
git init
git add .
git commit -m "Initial commit - Kolam Studio with 10 real images"
```

### 2.2 Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `kolam-studio`
3. Description: "Traditional Indian Kolam/Rangoli Design Studio"
4. Public or Private (your choice)
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### 2.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/kolam-studio.git
git branch -M main
git push -u origin main
```

---

## STEP 3: DEPLOY BACKEND TO RENDER

### 3.1 Create Render Account
1. Go to: https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### 3.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select `kolam-studio` repository
4. Configure:
   - **Name:** `kolam-studio-api`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

### 3.3 Add Environment Variables
Click "Advanced" → "Add Environment Variable"

Add these:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<generate-random-string-here>
CLIENT_URL=https://your-app-name.vercel.app
```

**To generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3.4 Deploy
1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. Your backend URL will be: `https://kolam-studio-api.onrender.com`

**SAVE THIS BACKEND URL!**

---

## STEP 4: UPDATE BACKEND FOR PRODUCTION

### 4.1 Update server.js CORS
We need to allow your frontend domain.

**After deployment, update this in server.js:**
```javascript
app.use(cors({ 
  origin: ['http://localhost:5173', 'https://your-app-name.vercel.app'],
  credentials: true 
}))
```

---

## STEP 5: DEPLOY FRONTEND TO VERCEL

### 5.1 Create Vercel Account
1. Go to: https://vercel.com/signup
2. Sign up with GitHub
3. Authorize Vercel

### 5.2 Import Project
1. Click "Add New..." → "Project"
2. Import your `kolam-studio` repository
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 5.3 Add Environment Variables
Click "Environment Variables"

Add:
```
VITE_API_URL=https://kolam-studio-api.onrender.com
```

### 5.4 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Your app will be live at: `https://your-app-name.vercel.app`

---

## STEP 6: UPDATE FRONTEND API URL

### 6.1 Update api.js
Edit `client/src/services/api.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
```

### 6.2 Commit and Push
```bash
git add .
git commit -m "Updated API URL for production"
git push
```

Vercel will auto-deploy the changes!

---

## STEP 7: TEST YOUR DEPLOYED APP

### 7.1 Test Frontend
1. Visit: `https://your-app-name.vercel.app`
2. Check if homepage loads
3. Check if images display

### 7.2 Test Backend
1. Visit: `https://kolam-studio-api.onrender.com`
2. Should see: `{"success":true,"message":"Kolam Studio API is running"}`

### 7.3 Test Authentication
1. Try to register a new user
2. Try to login
3. Check if JWT token works

### 7.4 Test Features
1. Generator page - real images
2. Whiteboard - drawing
3. Community - upload kolam
4. Profile - user data

---

## 🐛 TROUBLESHOOTING

### Backend Issues:

**Problem:** Backend not starting
**Solution:** Check Render logs for errors

**Problem:** Database connection failed
**Solution:** 
- Check MongoDB Atlas connection string
- Verify IP whitelist (0.0.0.0/0)
- Check database user credentials

**Problem:** CORS errors
**Solution:** Update CORS origin in server.js with your Vercel URL

### Frontend Issues:

**Problem:** API calls failing
**Solution:** 
- Check VITE_API_URL environment variable
- Verify backend is running
- Check browser console for errors

**Problem:** Images not loading
**Solution:** 
- Images are in `client/public/images/kolams/`
- Vercel should serve them automatically
- Check browser network tab

---

## 📊 DEPLOYMENT SUMMARY

### Free Tier Limits:

**Vercel:**
- ✅ Unlimited bandwidth
- ✅ Automatic HTTPS
- ✅ Auto-deploy on git push
- ⚠️ 100GB bandwidth/month (plenty!)

**Render:**
- ✅ 750 hours/month (enough for 1 app)
- ⚠️ Spins down after 15 min inactivity
- ⚠️ Cold start takes 30-60 seconds

**MongoDB Atlas:**
- ✅ 512MB storage (enough for thousands of kolams)
- ✅ Shared cluster
- ⚠️ Limited connections

---

## 🎯 POST-DEPLOYMENT

### 1. Custom Domain (Optional)
**Vercel:**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records

### 2. Analytics (Optional)
**Vercel:**
- Built-in analytics available
- Enable in project settings

### 3. Monitoring
**Render:**
- Check logs regularly
- Monitor uptime
- Watch for errors

---

## 🔒 SECURITY CHECKLIST

- [x] JWT_SECRET is random and secure
- [x] MongoDB password is strong
- [x] Environment variables not in code
- [x] CORS configured properly
- [x] HTTPS enabled (automatic)
- [x] API rate limiting (consider adding)

---

## 📞 NEED HELP?

### Common Issues:

**"Cannot connect to database"**
- Check MongoDB Atlas connection string
- Verify network access settings

**"CORS error"**
- Update server.js with correct frontend URL
- Redeploy backend

**"Images not loading"**
- Check file paths
- Verify images are in git repository
- Check Vercel build logs

**"Backend is slow"**
- Render free tier spins down
- First request takes 30-60 seconds
- Consider upgrading to paid tier

---

## 🎉 SUCCESS!

Once deployed, your Kolam Studio will be:
- ✅ Live on the internet
- ✅ Accessible from anywhere
- ✅ Automatic HTTPS
- ✅ Auto-deploy on git push
- ✅ Free hosting!

**Share your app with the world!** 🌍✨

---

## 📝 DEPLOYMENT URLS

**Frontend:** https://your-app-name.vercel.app
**Backend:** https://kolam-studio-api.onrender.com
**Database:** MongoDB Atlas Cloud

**Save these URLs for reference!**
