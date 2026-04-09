# 🎓 Student Management System

A premium, modern, and highly interactive **Student Management Dashboard** built with React, Redux Toolkit, and Material UI. This application provides a comprehensive suite of tools for teachers to manage student records, track attendance, and analyze academic performance in a visually stunning interface.

---

## 🚀 Key Features

### 🔐 Authentication System
- **Secure Registration**: Admin users can register with full validation (email format, password strength).
- **Smooth Login**: Local-first authentication flow with error handling and persistent session state.
- **Protected Routes**: Secure administrative pages that redirect unauthenticated users.

### 📊 Dynamic Dashboard (Home)
- **Real-time Statistics**: Instant counts of enrolled students and class performance.
- **Performance Analytics**: Real-time GPA/Average calculation across the student database.
- **Quick Actions**: Visual cards for instant navigation to core modules.
- **System status**: Real-time operational status indicators.

### 📋 Student Directory
- **Full CRUD Support**: Add, Update, and Delete student profiles.
- **Advanced Filtering**: Filter students instantly by **Standard (Class)** and **Section**.
- **Comprehensive Fields**: Track name, register number, contact info, DOB, address, hobbies, and extra-curricular activities.
- **Multi-Select Inputs**: Modern chip-based inputs for hobbies and activities.

### 📅 Attendance & Grading
- **Attendance Tracking**: Simple interface to mark and update daily student presence.
- **Academic Marksheet**: Record marks for Tamil, English, Math, Science, and Social Science.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://reactjs.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (Slices, Typed Hooks)
- **UI Library**: [Material UI (MUI) v7](https://mui.com/)
- **Language**: [TypeScript 4.9+](https://www.typescriptlang.org/)
- **Routing**: [React Router 6](https://reactrouter.com/)
- **Icons**: Material Icons
- **Unique IDs**: UUID v13

---

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components (NavBar, Sidebar, Forms)
├── pages/               # Main view components (Home, StudentList, Auth)
├── store/               # Redux logic
│   ├── slices/          # State segments (auth, students)
│   └── store.ts         # Centralized Redux store configuration
├── theme/               # Global MUI theme (colors, typography, overrides)
├── routes/              # Routing configuration and protection logic
├── hooks.ts             # Typed Redux hooks
└── App.tsx              # Root component with providers
```

---

## ✨ Design Philosophy

The application follows a **Premium & Modern Design System**:
- **Glassmorphism**: Translucent navigation bar with `backdrop-filter` for a sleek feel.
- **Vibrant Aesthetics**: Use of deep blue primaries (`#1e3a8a`) and high-contrast accents.
- **Interactive Elements**: Smooth hover animations, scale transitions, and professional gradients.
- **Responsive Layout**: A "Mini Drawer" navigation that adapts seamlessly to various screen sizes.
- **Clean Typography**: Utilizing the "Inter" font family for maximum readability.

---

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📝 Documented Codebase
Every file in this project is strictly documented with:
- **Header Comments**: Explaining the purpose and features of each component/module.
- **Prop Typedoc**: Clear descriptions for internal interfaces and props.
- **Logic Clarity**: Inline comments for complex calculations and state transitions.

---

*Developed with ❤️ as a high-performance Student Management Solution.*
