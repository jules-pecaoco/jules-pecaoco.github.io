import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './legacy/pages/Home'
import About from './legacy/pages/About'
import Events from './legacy/pages/Events'
import Contact from './legacy/pages/Contact'
import Resume from './legacy/pages/Resume'
import NotFound from './legacy/pages/NotFound'

// Admin pages
import Login from './legacy/pages/admin/Login'
import AdminLayout from './legacy/pages/admin/AdminLayout'
import Dashboard from './legacy/pages/admin/Dashboard'
import ProjectsManager from './legacy/pages/admin/ProjectsManager'
import EventsManager from './legacy/pages/admin/EventsManager'
import SiteContentEditor from './legacy/pages/admin/SiteContentEditor'
import ResumeManager from './legacy/pages/admin/ResumeManager'
import MessagesInbox from './legacy/pages/admin/MessagesInbox'

import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import './css/index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'events', element: <Events /> },
      { path: 'contact', element: <Contact /> },
      { path: 'resume', element: <Resume /> },
    ],
  },
  {
    path: '/admin/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'projects', element: <ProjectsManager /> },
      { path: 'events', element: <EventsManager /> },
      { path: 'site', element: <SiteContentEditor /> },
      { path: 'resume', element: <ResumeManager /> },
      { path: 'messages', element: <MessagesInbox /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
