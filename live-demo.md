# 🚀 Live Demo: Serverless eCommerce Backend API

This guide shows how to test the project both **locally** and **in the cloud** using Serverless Framework on AWS.

---

## ⚙️ LOCAL DEMO (Using serverless-offline)

### 🔧 Prerequisites

- ✅ Node.js 18+
- ✅ Redis running locally (`redis-server`) or via Docker
- ✅ MongoDB Atlas connection string
- ✅ `.env` file configured properly

### ▶️ Start Locally

```bash
npm install
npm run local
```

API will be live at:


```
http://localhost:3000/dev
```

---

### 🧪 Test These Routes (Using Postman or curl)

#### 📝 Register a New User

**POST** `http://localhost:3000/dev/api/user/register`

```json
{
  "firstname": "Alice",
  "lastname": "Smith",
  "email": "alice@example.com",
  "mobile": "0100000000",
  "password": "securePassword123"
}
```

#### 🔐 Login

**POST** `http://localhost:3000/dev/api/user/login`

```json
{
  "email": "alice@example.com",
  "password": "securePassword123"
}
```

#### 📦 Get All Products

**GET** `http://localhost:3000/dev/api/product`

---

### 🌍 Sample .env File

```env
PORT=5000
MONGODB_URL=MONGODB_URL=mongodb+srv://<USERNAME>:<PASSWORD>@cluster.mongodb.net/<DBNAME>
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379

MAIL_ID=your_email@example.com
MP=your_app_password

CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

---

## ☁️ CLOUD DEPLOYMENT (Using AWS Lambda + API Gateway)

### 🚀 Deploy to AWS Free Tier

```bash
sls deploy --aws-profile serverlessuser
```

Once deployed, your endpoints will be accessible under:

```
https://your-api-id.execute-api.eu-central-1.amazonaws.com/dev
```

> Example:
> `https://your-api-id.execute-api.eu-central-1.amazonaws.com/dev/api/user/register`

---

## 📬 Contact

Built by **Mustafa Farag**  
🔗 [GitHub](https://github.com/mustafafarag) | 💼 [LinkedIn](https://www.linkedin.com/in/your-profile)

---

> ✅ This is a serverless, cloud-native backend built for speed, scalability, and cloud deployment. Test it, fork it, or extend it!