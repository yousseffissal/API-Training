// Strict ode is used if we have one page/static page but here we want to add many pages with many routes so we need to install react-router-dom.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// We will use the RouterProvider to manipulate our routes
import { RouterProvider } from 'react-router-dom'
// This is the router that we made that will help us to manipulate the routes and which component will mount on the screen when we go to this route
import router from './routers/router.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
