# EchoVerse 🌌 — Your Future Audio Diaries

> A secure, emotional platform where you can record memories today and unlock them tomorrow ✨  
> Record your thoughts. Choose a mood. Set a future unlock date. Let your future self listen back in time.

---

## 🚀 Live Demo

- **Frontend**: https://echo-verse-five.vercel.app/
- **Backend**: https://echoverse-backend-dkc8.onrender.com

---

## 📖 Table of Contents

- [About EchoVerse](#about-echoverse)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Setup Instructions](#setup-instructions)
- [Folder Structure](#folder-structure)
- [Deployment Details](#deployment-details)
- [License](#license)
- [Contact](#contact)

---

## 💐 About EchoVerse

EchoVerse is a full-stack web application where users can:
- 🎤 Record short audio diaries
- 🗓️ Assign future unlock dates
- 🎞️ Select moods to capture their emotions
- 📩 Receive cute email notifications when their entries unlock
- 🔒 Keep their memories secure and personal

It’s more than an app — it’s **emotional time-traveling** made real ✨.

---

## ✨ Features

- 🎤 Record and store audio notes
- 🗓️ Set future unlock dates for your entries
- 🖼️ Mood badges for each entry
- 🔒 Fully private and secure entries
- 🌗 Toggle Dark Mode
- 📩 Automatic Email Notification on Unlock
- 🖥️ Fully Responsive for Mobile and Desktop
- 🚀 Fast Deployment with Vercel and Render
- ⚡ Cloudinary integration for audio storage

---

## 🛠️ Tech Stack

### Frontend:
- React.js (Vite + TypeScript)
- Tailwind CSS
- React Router
- Axios
- React-Hot-Toast (for notifications)

### Backend:
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Cloudinary SDK
- Nodemailer (SMTP Email)

### Hosting:
- **Frontend**: Vercel
- **Backend**: Render

---

## 🖼️ Screenshots

![Landing Page](https://github.com/user-attachments/assets/28ef3b09-cb73-4533-a1b6-ec646191bf47)
![Landing Page in light](https://github.com/user-attachments/assets/6d61a8ec-9987-43d5-834f-40b5759c3764)
![Landing Page Responsive](https://github.com/user-attachments/assets/8d967d12-0cdf-4e22-a8e9-f8b7c160aa6e)
![Landing responsiveLigh](https://github.com/user-attachments/assets/47b3b244-1a82-4a19-bda4-8d5d2a570847)
![Registeration](https://github.com/user-attachments/assets/0eebab38-14cc-40cd-9418-c0354a0e1b12)
![login](https://github.com/user-attachments/assets/81592eaf-efd1-411c-bbb6-62c9950a07ed)
![Dairy Upload modal](https://github.com/user-attachments/assets/36839d91-7be3-491d-8411-8d962f1dc4bb)
![Unlocked dairies](https://github.com/user-attachments/assets/0c163c7a-e5f4-4570-967a-9de4950ac6c7)
![Unlocked dairiies](https://github.com/user-attachments/assets/a780c0be-ec0b-4a48-9eb6-aaf0d8ab937e)


---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/echoverse.git
cd echoverse
```

### 2. Backend Setup (`server/`)

```bash
cd server
npm install
npm run dev
```

Create a `.env` file inside `/server/`:

```env
PORT=5000
MONGO_URI=your-mongo-db-connection-string
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 3. Frontend Setup (`frontend/`)

```bash
cd ../frontend
npm install
npm run dev
```

Create a `.env` file inside `/frontend/`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🐂 Folder Structure

```
echoverse/
├── frontend/     # React + Vite + Tailwind frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
├── server/       # Node.js + Express + MongoDB backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── utils/
│   ├── package.json
│   └── app.js
├── README.md
```

---

## 🚀 Deployment Details

### Frontend (Vercel)
- Deploy the `/frontend` directory.
- Set environment variable:
  - `VITE_API_BASE_URL=https://your-backend-url.onrender.com/api`
- Add `vercel.json` for SPA routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Backend (Render)
- Deploy the `/server` directory.
- Set all `.env` variables properly.
- Allow CORS for:
  - `http://localhost:5173`
  - `https://echo-verse-five.vercel.app/`


> Built with ❤️ for everyone who believes memories are precious ✨

