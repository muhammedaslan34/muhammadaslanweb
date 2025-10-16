# Muhammad Aslan - Portfolio Website 🚀

A modern, responsive portfolio website showcasing web development projects and services. Built with Next.js, TypeScript, and Tailwind CSS.

![Portfolio Preview](public/images/muhammed-aslan.png)

## ✨ Features

- **Modern Design**: Clean and professional interface with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Performance Optimized**: Built with Next.js for optimal performance and SEO
- **Interactive Components**: Engaging UI elements with Framer Motion animations
- **Dark/Light Mode**: Theme toggle for better user experience
- **Project Showcase**: Detailed project presentations with live previews
- **Contact Form**: Functional contact form for inquiries
- **Blog Section**: Content management for sharing insights and tutorials
- **Service Pages**: Detailed service offerings and pricing

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: Custom components with [Radix UI](https://www.radix-ui.com/)
- **Carousel**: [Embla Carousel](https://www.embla-carousel.com/)
- **Linting**: [ESLint](https://eslint.org/)

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/muhammedaslan34/muhammadaslanweb.git
   cd muhammadaslanweb
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Project Structure

```
muhammadaslanweb/
├── public/                 # Static assets
│   └── images/            # Image assets
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── about/         # About page
│   │   ├── blog/          # Blog section
│   │   ├── contact/       # Contact page
│   │   ├── projects/      # Projects showcase
│   │   ├── services/      # Services page
│   │   └── pricing/       # Pricing page
│   ├── components/        # Reusable components
│   │   ├── ui/           # UI components
│   │   ├── about/        # About page components
│   │   ├── blog/         # Blog components
│   │   ├── contact/      # Contact components
│   │   ├── projects/     # Project components
│   │   ├── services/     # Service components
│   │   └── pricing/      # Pricing components
│   └── lib/              # Utility functions
├── components.json        # shadcn/ui configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── next.config.js        # Next.js configuration
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run dev:port` - Start development server on custom port
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Colors & Theme

The project uses Tailwind CSS for styling. You can customize the color palette and theme in the `tailwind.config.js` file.

### Components

All components are modular and can be easily customized. The UI components are built with Radix UI primitives for accessibility and customization.

### Content

Update the content in the respective page files under `src/app/` directory.

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to [Vercel](https://vercel.com/)
2. Deploy automatically on every push to main branch

### Netlify

1. Connect your repository to [Netlify](https://netlify.com/)
2. Set build command: `npm run build`
3. Set publish directory: `.next`

### Manual Deployment

```bash
npm run build
npm run start
```

## 📱 Pages Overview

- **Home**: Hero section, featured projects, services overview
- **About**: Personal story, skills, experience
- **Projects**: Portfolio showcase with live previews
- **Services**: Web development services and offerings
- **Blog**: Articles and tutorials (coming soon)
- **Contact**: Contact form and information
- **Pricing**: Service packages and pricing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Muhammad Aslan**
- Portfolio: [muhammadaslan.dev](https://muhammadaslan.dev)
- GitHub: [@muhammedaslan34](https://github.com/muhammedaslan34)
- LinkedIn: [Muhammad Aslan](https://linkedin.com/in/muhammad-aslan)

## 🙏 Acknowledgments

- Thanks to the Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- All contributors and supporters

---

⭐ **Star this repository if you find it helpful!**
