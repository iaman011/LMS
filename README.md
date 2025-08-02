# LMS Frontend

### Setup instructions

1. Clone the project
   
2. ```
  git clone https://github.com/iaman011/LMS.git
   ```

3. Move to file or directory
```
  cd client
```
4. Install Dependencies
```
  npm install
```

### How to setup tailwind in your project [Link]
(https://tailwindcss.com/docs/installation/using-vite)

1. Install tailwind and other dependencies
Create your project
```
  npm create vite@latest client
  cd client
```
1. Install Tailwind CSS
```
   npm install tailwindcss @tailwindcss/vite
 ```

2. Configure the Vite plugin
```
  import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```
3. Import Tailwind CSS at the top of App.css or index.css
```
  @import "tailwindcss";
```
4. Start your build process
```
  npm run dev
```

### Adding plugins and dependencies

```
  npm i @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
```
These tools help with:

🔁 State Management – Redux Toolkit
🔀 Routing – React Router DOM
🎨 UI & Icons – DaisyUI, React Icons
📊 Charts – Chart.js & React ChartJS 2
⚡ Notifications – React Hot Toast
✂️ Text Clamp – Tailwind Line Clamp Plugin



