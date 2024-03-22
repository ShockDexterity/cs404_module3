import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.querySelector('#root'))
  root.render(<App />)
})
