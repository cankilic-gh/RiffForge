import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

console.log('🚀 Starting React render...');
console.log('Root element found:', rootElement);
console.log('React available:', typeof React !== 'undefined');
console.log('ReactDOM available:', typeof ReactDOM !== 'undefined');

// Immediate fallback test
if (!React || !ReactDOM) {
  console.error('❌ React or ReactDOM not loaded!');
  rootElement.innerHTML = `
    <div style="padding: 20px; color: red; font-family: monospace; background: #0a0a0a; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
      <div>
        <h1 style="color: #f43f5e;">React Not Loaded</h1>
        <p style="color: #fff;">React: ${typeof React}</p>
        <p style="color: #fff;">ReactDOM: ${typeof ReactDOM}</p>
      </div>
    </div>
  `;
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    console.log('✅ React root created');
    
    // Temporarily removed StrictMode to prevent double rendering issues
    root.render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    
    console.log('✅ React render called');
  } catch (error) {
    console.error('❌ React render error:', error);
    // Fallback: Show error message
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: monospace; background: #0a0a0a; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div>
          <h1 style="color: #f43f5e;">Render Error</h1>
          <pre style="color: #fff;">${error.message}</pre>
          <pre style="color: #888;">${error.stack}</pre>
        </div>
      </div>
    `;
  }
}

// Error boundary for debugging
window.addEventListener('error', (event) => {
  console.error('❌ Global error:', event.error);
  console.error('Error details:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Unhandled promise rejection:', event.reason);
});

// Check if page loaded
window.addEventListener('load', () => {
  console.log('✅ Page loaded');
  console.log('Root element content:', document.getElementById('root')?.innerHTML?.substring(0, 100));
});

// Immediate check
setTimeout(() => {
  const root = document.getElementById('root');
  if (root && root.children.length === 0) {
    console.warn('⚠️ Root element is empty after 1 second');
    console.log('Root element:', root);
  }
}, 1000);
