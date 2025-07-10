# Yichuan AI Frontend

A modern, clean frontend reconstruction of the Yichuan AI application built with React, TypeScript, and Vite.

## ✨ Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Component-Based Architecture**: Reusable, type-safe components
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Interactive Animations**: Smooth transitions with Framer Motion
- **File Upload**: Drag & drop functionality with validation
- **Mock Data**: Simulated backend functionality for demonstration

## 🚀 Pages & Features

### Core Pages

- **Home**: Landing page with hero section, services, and features
- **Document Analysis**: AI-powered document review with file upload
- **Community Hub**: Open calls, residencies, and opportunities
- **Dashboard**: Analytics and usage statistics
- **About**: Company mission and values
- **Contact**: Contact form and information

### Key Components

- **Navigation**: Responsive navigation with mobile menu
- **FileUpload**: Drag & drop file upload with validation
- **Analysis Results**: Interactive results display with animations
- **Open Calls**: Filterable and searchable opportunity listings

## 🛠️ Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup Steps

1. **Clone or navigate to the project directory**

   ```bash
   cd frontend_reconstruction
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Project Structure

```
frontend_reconstruction/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navigation.tsx
│   │   └── FileUpload.tsx
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx
│   │   ├── DocumentAnalysisPage.tsx
│   │   ├── CommunityHubPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── AboutPage.tsx
│   │   └── ContactPage.tsx
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   ├── cn.ts           # Class name utilities
│   │   ├── format.ts       # Formatting functions
│   │   └── mockData.ts     # Mock data for demo
│   ├── App.tsx             # Main App component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.ts          # Vite configuration
```

## 🎨 Design System

### Colors

- **Primary**: Yellow/Gold theme (#eab308)
- **Secondary**: Gray scale
- **Accent**: Blue, Green, Red for status indicators

### Typography

- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700, 800, 900

### Components

- **Buttons**: Primary and secondary variants
- **Cards**: Consistent shadow and border radius
- **Forms**: Styled inputs with focus states
- **Animations**: Smooth transitions and hover effects

## 🔧 Technical Details

### Dependencies

- **React 18**: Latest React with hooks and concurrent features
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Router**: Client-side routing
- **Lucide React**: Beautiful icon library

### Key Features

- **Type Safety**: Full TypeScript coverage
- **Responsive Design**: Mobile-first approach
- **Modern CSS**: Tailwind CSS utility classes
- **Component Reusability**: Modular component architecture
- **Performance**: Optimized with Vite and React 18

## 🎯 Mock Functionality

Since this is a pure frontend reconstruction, the following features use mock data:

- **Document Analysis**: Simulated 3-second analysis with mock results
- **File Upload**: Client-side validation and preview
- **Open Calls**: Static mock data for demonstration
- **Dashboard**: Sample statistics and metrics

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
