import './App.css';
import AppContent from './components/AppContent';
import NotificationProvider from './components/NotificationProvider';
import ThemeProvider from './components/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </ThemeProvider>
  );
}
