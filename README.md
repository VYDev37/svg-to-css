# 🎨 SVG to CSS
> A high-performance utility to transform raw SVGs into production-ready CSS, JSX, and HTML.

*Demo Live: [svg-to-css-kohl.vercel.app](https://svg-to-css-kohl.vercel.app)*

[![Vite](https://img.shields.io/badge/Vite-8.0.8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2.5-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.2.2-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-Efficient-f69220?style=flat-square&logo=pnpm)](https://pnpm.io/)

---

## ⚡ Overview
**SVG to CSS (Beta)** is a minimalist web utility built to eliminate the friction of converting SVG files into various development formats. It handles everything from **CSS DataURLs** and **Tailwind-ready snippets** to **optimized React JSX**, ensuring your assets are clean and fully customizable.

*⚠️ Warning: Some image (in JPG, JPEG, PNG) conversions may yield unexpected results.*

## 🚀 Key Features
- **✨ Multi-Format Engine** – Support for Vanilla CSS, TailwindCSS, Bootstrap, JSX, and HTML5.
- **🧼 Precision Cleanup** – Automatically strips XML headers, Figma metadata, and hardcoded dimensions.
- **🌈 Gradient-Aware** – Intelligently switches solid fills to `currentColor` while preserving complex gradients.
- **📦 Batch Processing** – Effortlessly manage and convert multiple SVG files in one go.
- **📱 Responsive by Design** – A seamless experience across desktop and mobile devices.

## 🛠️ Tech Stack
- **Library:** React 19
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS (Zinc Dark Theme)
- **Icons:** Lucide React
- **Package Manager:** pnpm
- **Language:** TypeScript

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/vydev37/svg-to-css.git

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 📖 Directory Structure
```
src/
 ├── components/    # Atomic UI components
 ├── hooks/         # Logic hooks (converter, clipboard)
 ├── utils/         # SVG parsing and regex engine
 └── App.tsx        # Main application entry
```

## 📝 License
Distributed under the MIT License. See LICENSE for more information.

<p align="center">
Built for a cleaner DX (Developer Experience).
</p>