# 🚨 Vercel Deployment Fix - Firebase Environment Variables

## ❌ **Error**

```
GET https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?
database=projects%2Fundefined%2Fdatabases%2F(default)
net::ERR_ABORTED 400 (Bad Request)
```

**Root Cause**: `projects/undefined` → Firebase project ID is **undefined**!

---

## 🔍 **Why This Happens**

Environment variables di `.env.local` **TIDAK otomatis** ter-deploy ke Vercel!

### **Local Development** ✅
```
.env.local (gitignored)
├── NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
└── Works perfectly!
```

### **Vercel Production** ❌
```
.env.local (not deployed)
├── Environment variables = undefined
└── Firebase fails!
```

---

## ✅ **Solution: Add Environment Variables to Vercel**

### **Step 1: Go to Vercel Dashboard**

1. **Open**: https://vercel.com/dashboard
2. **Select**: Your project (`ngide-interactive`)
3. **Go to**: Settings > Environment Variables

### **Step 2: Add All Firebase Variables**

Add these **7 environment variables** satu per satu:

#### **Variable 1: API Key**
```
Name:  NEXT_PUBLIC_FIREBASE_API_KEY
Value: AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

#### **Variable 2: Auth Domain**
```
Name:  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
Value: your-project-id.firebaseapp.com
```

#### **Variable 3: Project ID** ⚠️ **MOST IMPORTANT**
```
Name:  NEXT_PUBLIC_FIREBASE_PROJECT_ID
Value: your-project-id
```

#### **Variable 4: Storage Bucket**
```
Name:  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
Value: your-project-id.appspot.com
```

#### **Variable 5: Messaging Sender ID**
```
Name:  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
Value: 123456789012
```

#### **Variable 6: App ID**
```
Name:  NEXT_PUBLIC_FIREBASE_APP_ID
Value: 1:123456789012:web:abcdef123456
```

#### **Variable 7: Measurement ID** (Optional)
```
Name:  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
Value: G-XXXXXXXXXX
```

### **Step 3: Apply to All Environments**

For each variable, select:
- ✅ **Production**
- ✅ **Preview**
- ✅ **Development**

Click **"Save"** untuk setiap variable.

### **Step 4: Redeploy**

After adding all variables:

```bash
# Option 1: Trigger redeploy via Git
git commit --allow-empty -m "Trigger redeploy with env vars"
git push

# Option 2: Redeploy via Vercel Dashboard
# Go to Deployments > Latest > ... > Redeploy
```

---

## 📋 **Quick Checklist**

- [ ] Go to Vercel Dashboard
- [ ] Settings > Environment Variables
- [ ] Add `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] Add `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] Add `NEXT_PUBLIC_FIREBASE_PROJECT_ID` ⚠️ **CRITICAL**
- [ ] Add `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] Add `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] Add `NEXT_PUBLIC_FIREBASE_APP_ID`
- [ ] Add `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- [ ] Apply to Production, Preview, Development
- [ ] Save all variables
- [ ] Trigger redeploy

---

## 🔍 **How to Get Firebase Values**

### **Method 1: Firebase Console**

1. **Go to**: https://console.firebase.google.com/
2. **Select**: Your project
3. **Go to**: Project Settings (gear icon)
4. **Scroll to**: "Your apps" section
5. **Find**: Web app configuration
6. **Copy**: All values from `firebaseConfig` object

### **Method 2: From Local .env.local**

If you already have `.env.local` working locally:

```bash
# Open .env.local and copy all values
cat .env.local

# Or on Windows
type .env.local
```

---

## 🧪 **Verify Environment Variables**

### **After Deployment**

1. **Open**: Your deployed site
2. **Open**: Browser DevTools (F12)
3. **Go to**: Console tab
4. **Type**:
   ```javascript
   console.log(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
   ```
5. **Should show**: Your project ID (not `undefined`)

### **Check Vercel Logs**

1. **Go to**: Vercel Dashboard > Deployments
2. **Click**: Latest deployment
3. **Go to**: Build Logs
4. **Check**: No errors about missing env vars

---

## 🚨 **Common Mistakes**

### **Mistake 1: Wrong Variable Names**
```
❌ FIREBASE_PROJECT_ID          (missing NEXT_PUBLIC_)
❌ NEXT_PUBLIC_PROJECT_ID        (missing FIREBASE_)
✅ NEXT_PUBLIC_FIREBASE_PROJECT_ID
```

**Important**: Must start with `NEXT_PUBLIC_` untuk client-side access!

### **Mistake 2: Not Applied to All Environments**
```
❌ Only Production selected
✅ Production + Preview + Development
```

### **Mistake 3: Forgot to Redeploy**
```
❌ Added variables but didn't redeploy
✅ Must trigger new deployment after adding vars
```

### **Mistake 4: Typo in Values**
```
❌ your-project-id.firebaseapp.com (with typo)
✅ ngide-interactive.firebaseapp.com (exact match)
```

---

## 🔒 **Security Best Practices**

### **✅ Safe to Expose**

These are **public** API keys (safe for client-side):
- ✅ `NEXT_PUBLIC_FIREBASE_API_KEY`
- ✅ `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- ✅ All other `NEXT_PUBLIC_FIREBASE_*` variables

**Why?** Firebase security is handled by Firestore rules, not API keys.

### **🔒 Keep Private**

If you add these later, **DON'T** use `NEXT_PUBLIC_`:
- ❌ Server-side API keys
- ❌ Service account credentials
- ❌ Admin SDK keys

---

## 📊 **Before vs After**

### **Before (Error)**
```javascript
// Vercel deployment
firebaseConfig = {
  projectId: undefined,  // ❌ Not found!
  apiKey: undefined,
  // ...
}

// Result: 400 Bad Request
// projects/undefined/databases/(default)
```

### **After (Fixed)**
```javascript
// Vercel deployment
firebaseConfig = {
  projectId: "ngide-interactive",  // ✅ Found!
  apiKey: "AIzaSy...",
  // ...
}

// Result: ✅ Works perfectly!
// projects/ngide-interactive/databases/(default)
```

---

## 🎯 **Alternative: Use Vercel CLI**

### **Install Vercel CLI**
```bash
npm install -g vercel
```

### **Login**
```bash
vercel login
```

### **Add Environment Variables**
```bash
# Link project
vercel link

# Add variables
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production
# ... repeat for all variables

# Pull to local
vercel env pull .env.local
```

---

## 🐛 **Troubleshooting**

### **Still Getting 400 Error?**

1. **Clear Vercel Cache**
   ```bash
   # In Vercel Dashboard
   Settings > General > Clear Cache
   ```

2. **Check Variable Names**
   ```bash
   # Must be EXACT match
   NEXT_PUBLIC_FIREBASE_PROJECT_ID
   ```

3. **Verify Values**
   ```bash
   # No quotes, no spaces
   ✅ ngide-interactive
   ❌ "ngide-interactive"
   ❌ ngide-interactive 
   ```

4. **Check Firebase Console**
   - Verify project exists
   - Check project ID is correct
   - Ensure Firestore is enabled

### **Variables Not Loading?**

1. **Check Build Logs**
   ```
   Vercel Dashboard > Deployments > Build Logs
   Look for: "Environment variables loaded"
   ```

2. **Verify in Runtime**
   ```javascript
   // Add to your page temporarily
   console.log('Env vars:', {
     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY
   })
   ```

3. **Force Rebuild**
   ```bash
   # Delete .next folder and redeploy
   git commit --allow-empty -m "Force rebuild"
   git push
   ```

---

## ✅ **Success Indicators**

After fixing, you should see:

1. **No Console Errors**
   ```
   ✅ No "projects/undefined" errors
   ✅ No 400 Bad Request errors
   ```

2. **Firebase Connected**
   ```
   ✅ Games load from Firestore
   ✅ News load from Firestore
   ✅ Real-time updates work
   ```

3. **Admin Panel Works**
   ```
   ✅ Can add games
   ✅ Can add news
   ✅ Data persists
   ```

---

## 📖 **Documentation Links**

- **Vercel Environment Variables**: https://vercel.com/docs/environment-variables
- **Next.js Environment Variables**: https://nextjs.org/docs/basic-features/environment-variables
- **Firebase Web Setup**: https://firebase.google.com/docs/web/setup

---

## 🎉 **Summary**

### **Problem**
```
❌ Firebase project ID = undefined
❌ 400 Bad Request error
❌ Firestore not working in production
```

### **Solution**
```
✅ Add all 7 environment variables to Vercel
✅ Apply to all environments
✅ Redeploy
```

### **Result**
```
✅ Firebase connects successfully
✅ Real-time updates work
✅ Production ready!
```

---

**Fix environment variables di Vercel sekarang!** 🚀

**Deployment akan berhasil setelah env vars ditambahkan!** ✅🔥
