import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safely suppress benign ResizeObserver loop limit exceeded/completed warnings
if (typeof window !== "undefined") {
  const resizeObserverErrorNames = [
    "ResizeObserver loop limit exceeded",
    "ResizeObserver loop completed with undelivered notifications"
  ];
  
  // 1. Event listener
  window.addEventListener("error", (e) => {
    if (e.message && resizeObserverErrorNames.some(msg => e.message.includes(msg))) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  });

  // 2. Global window.onerror
  const originalOnError = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    const msgStr = String(message || "");
    if (resizeObserverErrorNames.some(msg => msgStr.includes(msg))) {
      return true; // Prevents the firing of the default event handler
    }
    if (originalOnError) {
      return originalOnError.apply(this, arguments as any);
    }
    return false;
  };

  // 3. Unhandled rejections
  window.addEventListener("unhandledrejection", (e) => {
    if (e.reason && resizeObserverErrorNames.some(msg => String(e.reason).includes(msg))) {
      e.preventDefault();
    }
  });

  // 4. Monkeypatch console.error to filter out benign ResizeObserver logs
  const originalConsoleError = console.error;
  console.error = function (...args: any[]) {
    const firstArgStr = String(args[0] || "");
    if (resizeObserverErrorNames.some(msg => firstArgStr.includes(msg))) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

