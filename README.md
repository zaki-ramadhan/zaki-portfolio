# 🌐 My Portfolio

![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)  ![HTML](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)  ![CSS](https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)  ![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)  ![React](https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black)  ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)  

## 🚀 About the Project  
This is my personal **frontend portfolio** showcasing my skills, projects, and experiences. Built with **React**, **TailwindCSS**, and **modern UI principles** to create a fully responsive and interactive experience.  

## 📂 Tech Stack  
- **Frontend:** React, HTML, CSS, JavaScript, TailwindCSS  
- **No Backend:** This project is **fully static** and does not require a backend.  

## 🖼️ Preview  
![Portfolio Screenshot](https://i.postimg.cc/2yddkkSR/image.png)  

## 🛠 Running the Project Locally  
To run this project on your local machine, follow these steps:

### Prerequisites  
Ensure you have **Node.js** and **npm** installed. If not, download and install them from [Node.js official website](https://nodejs.org/).

### Installation  
1. Clone the repository:
   ```sh
   git clone https://github.com/<your-github-username>/<your-repository-name>.git
   ```
2. Navigate to the project directory:
   ```sh
   cd <your-repository-name>
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
   > **Note:** If you want to run it on a mobile device, use:
   ```sh
   npm run dev -- --host
   ```
   Ensure your device is on the same network as your development machine.

### Custom Vite Configuration  
To ensure consistency when running locally and deploying, modify `package.json`:
```json
  "scripts": {
    "dev": "vite --host --port 5173",
    "build": "vite build",
    "serve": "vite preview"
  }
```

## 🚀 Deploying to GitHub Pages  
To deploy the project using **GitHub Pages**, follow these steps:

### 1. Create a GitHub Repository  
1. Go to [GitHub](https://github.com/) and create a new repository.
2. Name it `<your-repository-name>` and make sure it's **public**.
3. Copy the repository URL.

### 2. Initialize Git and Push the Project  
In your local project directory, run:
```sh
git init
git remote add origin https://github.com/<your-github-username>/<your-repository-name>.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 3. Install `gh-pages`  
```sh
npm install gh-pages --save-dev
```

### 4. Update `package.json`  
Add the following scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```
Also, add this outside the `scripts` section:
```json
"homepage": "https://<your-github-username>.github.io/<your-repository-name>/"
```

### 5. Update `vite.config.js`  
Modify `vite.config.js` to set the correct base path:
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/<your-repository-name>/',
  plugins: [react()],
});
```

### 6. Deploy the Project  
Run the following command:
```sh
npm run deploy
```

### 7. Push the Changes  
After deploying, commit and push your changes:
```sh
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## 📩 Connect with Me  
[![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/zaki-ramadhan)  [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230A66C2.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/zaki-ramadhan)  [![Email](https://img.shields.io/badge/Email-%23D14836.svg?style=for-the-badge&logo=gmail&logoColor=white)](mailto:zakiram4dhan@gmail.com)  

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Click%20Here-blue?style=for-the-badge)](https://zaki-ramadhan.github.io/zaki-portfolio/)
