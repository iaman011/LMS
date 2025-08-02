# LMS Frontend

### Setup instructions

1. Clone the project
   
 ```
    git clone https://github.com/iaman011/LMS.git
   ```

2. Move to file or directory
```
  cd client
```
3. Install Dependencies
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
3. Import Tailwind CSS at the top of App.css
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


 correct the format
