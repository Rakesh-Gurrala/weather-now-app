# 🌦️ Weather Now App

A responsive weather application built with **React (Vite)** that allows users to check real-time weather updates of any city using the **OpenWeatherMap API**.  
This project demonstrates skills in **frontend development**, **API integration**, **deployment**, and **version control**.

---

## 🧠 Overview

**Weather Now App** is a full-stack-ready frontend project developed using:
- ⚛️ **React (Vite)** for fast UI development
- 🎨 **CSS** for styling and responsiveness
- ☁️ **OpenWeatherMap API** for fetching real-time weather data
- 🚀 **Vercel** for hosting the live project
- 🧑‍💻 **VS Code** for coding and debugging
- 🧩 **GitHub** for version control and collaboration

---

## 🌍 Live Demo

🔗 **Live URL:** [weather-now-app-nine.vercel.app](https://weather-now-app-nine.vercel.app)

---

## 🧩 Features

✅ Search any city and get instant weather data  
✅ Displays temperature, humidity, wind speed, and weather condition  
✅ Clean, modern, and responsive design  
✅ API error handling for invalid city names  
✅ Deployed on Vercel with continuous integration from GitHub

---

## 🏗️ Project Structure

weather-now-app/
├── public/
│ └── index.html
├── src/
│ ├── images/
│ ├── App.jsx
│ ├── index.jsx
│ ├── styles.css
│ └── vite-env.d.ts
├── .devcontainer/
│ └── devcontainer.json
├── .codesandbox/
│ └── tasks.json
├── package.json
├── vercel.json
├── vite.config.ts
└── README.md

yaml
Copy code

---

## ⚙️ Setup Instructions (Run Locally)

Follow these steps to run the project on your local machine 👇

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Rakesh-Gurrala/weather-now-app.git
cd weather-now-app
2️⃣ Install dependencies
bash
Copy code
npm install
or (if using pnpm)

bash
Copy code
pnpm install
3️⃣ Start the development server
bash
Copy code
npm run dev
Then open the local server link shown in your terminal (e.g. http://localhost:5173).

🌐 API Integration (OpenWeatherMap)
This project uses the OpenWeatherMap API to fetch live weather data.

API Used:
🔗 https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric

Example Code:
js
Copy code
const API_KEY = "your_api_key";
const fetchWeather = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  console.log(data);
};
💻 Tools Used
🧱 1. Visual Studio Code (VS Code)
Used for code editing, debugging, and terminal management.

Extensions: Prettier, ESLint, GitLens, GitHub Copilot.

🌐 2. CodeSandbox
Used for quick online prototyping and testing React code.

Great for sharing code snippets instantly without installing Node.js locally.

☁️ 3. Vercel
Hosting and deployment platform.

One-command deployment with automatic CI/CD from GitHub.

Commands:

bash
Copy code
vercel login
vercel
vercel --prod
After successful deployment, you’ll get a live link like:

arduino
Copy code
Link: weather-now-app-nine.vercel.app
🧠 4. GitHub
Used for version control, collaboration, and integration with Vercel.

Git Commands:

bash
Copy code
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/weather-now-app.git
git push -u origin main
🚀 Deployment Steps (Vercel)
Install Vercel CLI:

bash
Copy code
npm install -g vercel
Login to Vercel:

bash
Copy code
vercel login
Deploy your project:

bash
Copy code
vercel
For production deployment:

bash
Copy code
vercel --prod
Copy the final live link (ends with .vercel.app) and share it.

📘 Project Explanation
The Weather Now App workflow:

User enters a city name.

The app sends a request to the OpenWeatherMap API.

Data (temperature, humidity, weather type) is displayed on screen.

If an invalid city is entered, an error message is shown.

This project demonstrates:

API Handling

React Components

Conditional Rendering

State Management (useState/useEffect)

Asynchronous Fetch Calls

Frontend Deployment with Vercel

🧑‍💼 Developer Info
👨‍💻 Name: Rakesh Gurrala
📧 Email: gurralarakesh2002@gmail.com
🌍 Location: India
🔗 GitHub: https://github.com/Rakesh-Gurrala

💬 Summary
This project was created as part of a Full Stack Developer Take-Home Assignment.
It highlights strong skills in frontend development, API integration, and deployment best practices.

⭐ If you found this project helpful, please give it a star on GitHub!
