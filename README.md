# 🛒 Serverless eCommerce Backend (Node.js + MongoDB + Redis + Lamda + API Gateway )

A fully serverless eCommerce API built with **Node.js** and **Express**, using **MongoDB Atlas** for data storage and **Redis on AWS EC2** for rate limiting.

The backend is deployed on **AWS Lambda** and exposed via **API Gateway**, all managed through the **Serverless Framework**. It also supports full local development and testing via `serverless-offline`.


> 🚀 **Migration Highlight**  
> This project started as a traditional locally-hosted Node.js + Express API, MongoDB, Redis based on this repo:  
> 👉 [ecommerce-backend-api (local version)](https://github.com/mustafafarag/ecommerce-backend-api)  
>  
> It was then fully **migrated to a serverless architecture** using the **Serverless Framework**.  
> It now runs on **AWS Lambda** and **API Gateway**, with Redis hosted on **AWS EC2** and MongoDB managed via **MongoDB Atlas**.  
> The setup supports full local development as well as production-grade cloud deployment.

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
sls deploy         # Deploy to AWS
sls remove         # Remove all deployed AWS resources
```