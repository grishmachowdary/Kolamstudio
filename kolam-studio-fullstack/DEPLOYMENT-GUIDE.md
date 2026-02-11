# 🚀 DEPLOYMENT GUIDE

Complete guide to deploy Kolam Studio to production.

---

## 📋 DEPLOYMENT OPTIONS

### Option 1: Vercel (Frontend) + Render (Backend) + MongoDB Atlas
**Recommended for beginners**
- ✅ Free tier available
- ✅ Easy setup
- ✅ Automatic deployments
- ✅ Good performance

### Option 2: AWS (Full Stack)
**For advanced users**
- EC2 for backend
- S3 + CloudFront for frontend
- MongoDB Atlas or DocumentDB

### Option 3: DigitalOcean (Full Stack)
**Good middle ground**
- Droplet for backend
- App Platform for frontend
- MongoDB Atlas

---

## 🎯 OPTION 1: VERCEL + RENDER + MONGODB ATLAS

This guide covers the recommended deployment setup.

---

## STEP 1: PREPARE YOUR CODE

### 1.1 Environment Variables

Create production environment files:

**Backend (.env.production)**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_super_secret_jwt_key_change_this
FRONTEND_URL=https://your-app.vercel.app
```

**Frontend (.env.production)**
```env
VITE_API_URL=https://your-backend.onrender.com
```

### 1.2 Update CORS Settings

Edit `server/server.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
```

### 1.3 Update API Base URL

Edit `client/src/services/api.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
```

---

## STEP 2: SETUP MONGODB ATLAS

### 2.1 Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new project: "Kolam Studio"

### 2.2 Create Cluster
1. Click "Build a Database"
2. Choose FREE tier (M0)
3. Select region closest to your users
4. Name cluster: "kolam-cluster"
5. Click "Create"

### 2.3 Setup Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Username: `kolam_admin`
4. Password: Generate secure password (save it!)
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"

### 2.4 Setup Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Note: In production, restrict to your server IPs
4. Click "Confirm"

### 2.5 Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` with your database password
5. Replace `<dbname>` with `kolam-studio`

Example:
```
mongodb+srv://kolam_admin:YOUR_PASSWORD@kolam-cluster.xxxxx.mongodb.net/kolam-studio?retryWrites=true&w=majority
```

---

## STEP 3: DEPLOY BACKEND TO RENDER

### 3.1 Prepare Backend

Create `server/package.json` scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 3.2 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### 3.3 Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select your repo: `kolam-studio-fullstack`
4. Configure:
   - **Name**: `kolam-studio-api`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 3.4 Add Environment Variables
In Render dashboard, go to "Environment":
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=https://your-app.vercel.app
```

### 3.5 Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL: `https://kolam-studio-api.onrender.com`

### 3.6 Test Backend
```bash
curl https://kolam-studio-api.onrender.com/
```

Should return:
```json
{
  "success": true,
  "message": "Kolam Studio API is running"
}
```

---

## STEP 4: DEPLOY FRONTEND TO VERCEL

### 4.1 Prepare Frontend

Create `client/vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Update `client/vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
```

### 4.2 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel

### 4.3 Deploy Frontend
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 4.4 Add Environment Variables
In Vercel dashboard, go to "Settings" → "Environment Variables":
```
VITE_API_URL=https://kolam-studio-api.onrender.com
```

### 4.5 Deploy
1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Your app is live! 🎉

### 4.6 Get Your URL
Vercel will give you a URL like:
```
https://kolam-studio.vercel.app
```

---

## STEP 5: UPDATE BACKEND WITH FRONTEND URL

1. Go back to Render dashboard
2. Update `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://kolam-studio.vercel.app
   ```
3. Render will automatically redeploy

---

## STEP 6: SETUP FILE UPLOADS

### Option A: Use Render Disk (Simple but Limited)
- Files stored on Render server
- ⚠️ Files deleted on redeploy
- Good for testing only

### Option B: Use Cloudinary (Recommended)

1. **Create Cloudinary Account**
   - Go to https://cloudinary.com
   - Sign up for free
   - Get your credentials

2. **Install Cloudinary**
   ```bash
   cd server
   npm install cloudinary multer-storage-cloudinary
   ```

3. **Update Upload Middleware**
   
   Edit `server/middleware/upload.js`:
   ```javascript
   import { v2 as cloudinary } from 'cloudinary'
   import { CloudinaryStorage } from 'multer-storage-cloudinary'
   import multer from 'multer'
   
   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
   })
   
   const storage = new CloudinaryStorage({
     cloudinary: cloudinary,
     params: {
       folder: 'kolam-studio',
       allowed_formats: ['jpg', 'png', 'jpeg'],
       transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
     }
   })
   
   export const upload = multer({ storage })
   ```

4. **Add Cloudinary Env Variables to Render**
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

---

## STEP 7: SETUP CUSTOM DOMAIN (Optional)

### 7.1 Buy Domain
- Namecheap, GoDaddy, Google Domains, etc.
- Example: `kolamstudio.com`

### 7.2 Configure Vercel
1. Go to Vercel project settings
2. Click "Domains"
3. Add your domain
4. Follow DNS instructions

### 7.3 Configure Render
1. Go to Render service settings
2. Click "Custom Domain"
3. Add subdomain: `api.kolamstudio.com`
4. Update DNS records

### 7.4 Update Environment Variables
Update both Vercel and Render with new URLs.

---

## STEP 8: MONITORING & MAINTENANCE

### 8.1 Setup Monitoring

**Render**
- Built-in logs and metrics
- Email alerts for downtime

**Vercel**
- Analytics dashboard
- Performance monitoring

**MongoDB Atlas**
- Performance Advisor
- Real-time metrics
- Alerts

### 8.2 Backup Strategy

**Database Backups**
- MongoDB Atlas: Automatic daily backups (free tier)
- Manual exports: Use `mongodump`

**Code Backups**
- GitHub: Your source of truth
- Tag releases: `git tag v1.0.0`

### 8.3 Update Process

1. Make changes locally
2. Test thoroughly
3. Commit to GitHub
4. Push to main branch
5. Vercel & Render auto-deploy

---

## 🔒 SECURITY CHECKLIST

Before going live:

- [ ] Change all default passwords
- [ ] Use strong JWT secret (32+ characters)
- [ ] Enable HTTPS only
- [ ] Restrict MongoDB IP access
- [ ] Add rate limiting
- [ ] Sanitize user inputs
- [ ] Enable CORS only for your domain
- [ ] Hide error details in production
- [ ] Use environment variables for secrets
- [ ] Enable MongoDB authentication
- [ ] Regular security updates

---

## 📊 PERFORMANCE OPTIMIZATION

### Frontend
- [ ] Enable Vite build optimization
- [ ] Compress images
- [ ] Use lazy loading
- [ ] Enable caching
- [ ] Minify CSS/JS

### Backend
- [ ] Add database indexes
- [ ] Enable compression
- [ ] Cache frequent queries
- [ ] Optimize image uploads
- [ ] Use CDN for static files

### Database
- [ ] Create indexes on frequently queried fields
- [ ] Monitor slow queries
- [ ] Optimize aggregation pipelines

---

## 🐛 TROUBLESHOOTING

### Issue: CORS Errors
**Solution**: Check FRONTEND_URL in Render matches Vercel URL exactly

### Issue: Database Connection Failed
**Solution**: 
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check database user permissions

### Issue: Images Not Loading
**Solution**:
- Check file upload middleware
- Verify Cloudinary credentials
- Check image URLs in database

### Issue: 500 Server Errors
**Solution**:
- Check Render logs
- Verify environment variables
- Check MongoDB connection

### Issue: Slow Performance
**Solution**:
- Add database indexes
- Optimize queries
- Enable caching
- Use CDN

---

## 💰 COST ESTIMATE

### Free Tier (Good for 1000+ users)
- **Vercel**: Free (100GB bandwidth)
- **Render**: Free (750 hours/month)
- **MongoDB Atlas**: Free (512MB storage)
- **Cloudinary**: Free (25GB storage, 25GB bandwidth)
- **Total**: $0/month

### Paid Tier (For scaling)
- **Vercel Pro**: $20/month
- **Render Starter**: $7/month
- **MongoDB Atlas M10**: $57/month
- **Cloudinary Plus**: $89/month
- **Total**: ~$173/month

---

## 📚 ADDITIONAL RESOURCES

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

---

## 🎉 CONGRATULATIONS!

Your Kolam Studio app is now live in production!

**Next Steps:**
1. Share with friends and family
2. Gather user feedback
3. Add analytics (Google Analytics, Mixpanel)
4. Monitor performance
5. Plan new features

---

**Need Help?**
- Check logs in Render/Vercel dashboards
- Review MongoDB Atlas metrics
- Test API endpoints with Postman
- Check browser console for frontend errors

வாழ்த்துக்கள்! • శుభాకాంక్షలు! • ಶುಭಾಶಯಗಳು! • ആശംസകൾ!
