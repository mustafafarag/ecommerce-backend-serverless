# 🚀 Live Demo: Serverless eCommerce Backend API

This guide explains how to test the project in two ways — locally using `serverless-offline`, and by deploying it to the AWS cloud using the Serverless Framework, which provisions AWS Lambda, API Gateway, and other resources.

### ❓ What is Serverless Framework?
[Serverless Framework](https://www.serverless.com/framework/docs) is an open-source tool that simplifies deploying and managing serverless applications. It automates provisioning of resources like Lambda, API Gateway, and IAM using simple YAML configuration.


---

| Environment | Method                        | Tools Used                |
|-------------|-------------------------------|---------------------------|
| Local       | Run locally using `serverless offline start` | Node.js, Redis Localy, MongoDB Atlas |
| Cloud       | Deploy to AWS using `sls deploy` | Serverless Framework, AWS CLI, AWS Lambda, MongoDB Atlas, API Gateway |



> 🛠️ **Quick Command Reference**:
> - `serverless offline start`: Runs your app locally as if it's on AWS (simulated Lambda + API Gateway)
> - `sls deploy`: Deploys your app to AWS Lambda and API Gateway



## ⚙️ LOCAL DEMO (Using serverless-offline)

### 🔧 Prerequisites

- ✅ Node.js 18+
- ✅ Redis running locally (`redis-server`) or via Docker
- ✅ MongoDB Atlas connection string
- ✅ `.env` file configured properly (For Redis & MongoDB Atlas)

### ▶️ Start Locally

```bash
npm install

### Running the App Locally
# Option 1: Directly using npm script
npm run local

# Option 2: Using serverless-offline directly
npx serverless offline start
```

API will be live at:


```
http://localhost:3000/dev
```

> ℹ️ **Note**: The port (3000) can be changed by editing `serverless.yml`:
>
> ```yaml
> custom:
>   serverless-offline:
>     httpPort: 8000  # Change this to any other port if needed
> ```

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

## ☁️ CLOUD DEPLOYMENT (Using AWS Lambda + API Gateway , Redis Installed on AWS EC2)

### 🔧 Prerequisites

- ✅ An AWS EC2 instance with Redis installed and running (port 6379 open to Lambda)
- ✅ AWS CLI installed on your machine

> 📝 **Note**: Before deploying, you need to configure AWS credentials for your IAM user. Run the following:
>
> ```bash
> aws configure --profile serverlessuser
> ```
> This sets up the `serverlessuser` profile used by Serverless Framework to deploy and manage AWS resources.


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

### 🧼 Cleanup

To remove all deployed AWS resources (Lambda, API Gateway, IAM, CloudWatch, etc.):

```bash
sls remove --aws-profile serverlessuser
```
---

## 📬 Contact

Built by **Mustafa Farag**  
🔗 [GitHub](https://github.com/mustafafarag) | 💼 [LinkedIn](https://www.linkedin.com/in/mustafafarag15/)

---

> ✅ This is a serverless, cloud-native backend built for speed, scalability, and cloud deployment. Test it, fork it, or extend it!