🎓 LMS Frontend
A responsive Learning Management System (LMS) frontend built with React, Vite, Tailwind CSS, Redux Toolkit, Chart.js, and more.

✅ Setup Instructions
Clone the project

bash
Copy code
git clone https://github.com/iaman011/LMS.git
Move to the project directory

bash
Copy code
cd LMS/client
Install dependencies

bash
Copy code
npm install
🎨 How to Setup Tailwind in Your Project
Official Tailwind + Vite Guide

Create your Vite project

bash
Copy code
npm create vite@latest client
cd client
Install Tailwind CSS

bash
Copy code
npm install tailwindcss @tailwindcss/vite
Configure the Vite plugin

js
Copy code
// vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
Import Tailwind CSS at the top of App.css or index.css

css
Copy code
@import "tailwindcss";
Start your build process

bash
Copy code
npm run dev
🧩 Adding Plugins and Dependencies
bash
Copy code
npm i @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
These tools help with:

🔁 State Management – Redux Toolkit

🔀 Routing – React Router DOM

🎨 UI & Icons – DaisyUI, React Icons

📊 Charts – Chart.js & React ChartJS 2

⚡ Notifications – React Hot Toast

✂️ Text Clamp – Tailwind Line Clamp Plugin
