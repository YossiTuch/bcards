# BCards - Digital Business Card Management System

A modern web application for creating, managing, and sharing digital business cards. Built with React, TypeScript, and modern web technologies.

![BCards Logo](./public/b-Icon.png)

## 🚀 Features

- **User Authentication**
  - Secure login and registration
  - JWT-based authentication
  - Remember me functionality
  - Protected routes for authenticated users

- **Card Management**
  - Create and customize digital business cards
  - Edit existing cards
  - View detailed card information
  - Delete cards
  - Search functionality

- **User Profiles**
  - Personal profile management
  - Business account options
  - Profile image customization
  - Contact information management

- **Additional Features**
  - Dark/Light mode toggle
  - Responsive design
  - Favorites system
  - Search functionality
  - Pagination for card lists

## 🛠️ Technologies

- **Frontend Framework**: React with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **UI Components**: Flowbite React
- **Styling**: TailwindCSS
- **Form Handling**: React Hook Form
- **Validation**: Joi
- **HTTP Client**: Axios
- **Authentication**: JWT
- **Build Tool**: Vite
- **Icons**: React Icons

## 💻 Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🌐 Environment Setup

Make sure to set up your environment variables if required (e.g., API endpoints, authentication keys).

## 📌 Project Structure

```
src/
├── components/    # Reusable UI components
├── config/        # Configuration files
├── hooks/         # Custom React hooks
├── layout/        # Layout components
├── pages/         # Page components
├── store/         # Redux store setup
├── types/         # TypeScript type definitions
├── validations/   # Form validation schemas
└── App.tsx        # Main application component
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Tokens can be stored in either:
- LocalStorage (Remember me enabled)
- SessionStorage (Remember me disabled)

## 👥 User Types

- **Regular Users**: Can view and favorite cards
- **Business Users**: Can create and manage their own cards
- **Admin Users**: Additional administrative privileges

## 🎨 Customization

- Supports both light and dark themes
- Customizable card layouts
- Flexible form fields for cards and profiles


## 👨‍💻 Author

Created by Yossi Tuchband

---

For more information about the application architecture, components, or contribution guidelines, please reach out to the project maintainers.