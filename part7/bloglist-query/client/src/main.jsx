import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationProvider } from './hooks/notification.jsx'
import UserProvider from './hooks/userAuth.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <NotificationProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </NotificationProvider>
    </Router>
  </QueryClientProvider>,
)
