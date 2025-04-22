import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import rootReducer from './Reducer/index.js'
import { configureStore } from '@reduxjs/toolkit'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from './components/common/ErrorBoundary'
import LoadingSpinner from './components/common/LoadingSpinner'

// Lazy load the main App component
const App = lazy(() => import('./App.jsx'))

// Configure store with performance middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <App />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#333',
                  color: '#fff',
                },
              }}
            />
          </Suspense>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
