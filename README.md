# 🛒 Serverless eCommerce Backend (Node.js + MongoDB + Redis)

A cloud-native eCommerce backend built with Node.js, Express, MongoDB Atlas, and Redis (on AWS EC2). The project is deployed using the Serverless Framework to AWS Lambda and API Gateway, with full support for local development via serverless-offline.

---

## ✨ Features

- RESTful API built with Express
- MongoDB Atlas for persistent storage
- Redis (on AWS EC2) for rate limiting
- JWT-based authentication
- Cloudinary integration for media uploads
- Swagger API documentation
- Docker & Docker Compose support
- Deployed using Serverless Framework on AWS Lambda
- Testable locally with serverless-offline

---

## 🚀 Quick Start

See full instructions for both local and cloud usage in the live demo guide:  
👉 [LIVE DEMO GUIDE](./live-demo.md)

---

## 📂 Project Structure

```
.
├── config/              # MongoDB and Redis configuration
├── controller/          # API route handlers
├── middlewares/         # Authentication, rate-limiting, etc.
├── models/              # Mongoose models
├── routes/              # API route definitions
├── utils/               # Helper functions
├── handler.js           # Serverless Lambda handler entry
├── index.js             # Main Express app
├── serverless.yml       # Serverless Framework deployment config
├── swagger.js           # Swagger doc setup
├── Dockerfile           # Containerization file
├── docker-compose.yml   # Optional: multi-container config
└── live-demo.md         # Full local & cloud usage guide
```

---

## 🛠 Scripts

```bash
npm run local      # Run using serverless-offline
npm run start      # Start the app with node
npm run dev        # Start with nodemon (if configured)
sls deploy         # Deploy to AWS
sls remove         # Remove all deployed AWS resources
```

---

## 📜 License

MIT © 2025 Mustafa Farag