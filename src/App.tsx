import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import AppContent from './components/AppContent';
import NotificationProvider from './components/NotificationProvider';
import ProgressBar from './components/ProgressBar';
import ThemeProvider from './components/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <ProgressBar />
        <AppContent />
      </NotificationProvider>
    </ThemeProvider>
  );
}
