# 💊 MediAlert Pro - Daily Dose Tracker

A professional, responsive React.js application designed to help users manage their medication schedules with ease. Built with a focus on modular architecture and data persistence.

## 🚀 Key Features
- **Real-time Progress Tracking:** Visual progress bar that updates as doses are marked 'taken'.
- **Health Tip Ticker:** An interactive header providing rotating wellness advice.
- **Data Persistence:** Uses `LocalStorage` to ensure user data remains safe even after browser refreshes.
- **Modular Design:** Separated logic (Data.js), styling (Styles.js), and UI (MediAlert.js) for high maintainability.
- **CRUD Operations:** Full capability to Create, Read, and Delete medication reminders.

## 🛠️ Tech Stack
- **Frontend:** React.js (Functional Components & Hooks)
- **State Management:** React `useState` and `useEffect`
- **Styling:** CSS-in-JS (Modular Objects)
- **Storage:** Browser LocalStorage API

## 📂 Project Structure
- `MediAlert.js`: Core application logic and UI rendering.
- `Data.js`: Data persistence layer and initial seed data.
- `Styles.js`: Centralized design system and responsive layouts.
- `App.js`: Main entry point and component wrapper.

## 💡 Engineering Highlights
- Implemented **Conditional Rendering** to provide immediate visual feedback (color changes) when a dose is completed.
- Developed a **Dynamic Math Logic** to calculate percentage-based progress in real-time.
- Focused on **User Experience (UX)** by providing a "Healthy Tip" system to keep users engaged.

