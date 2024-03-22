import React from 'react'
import { createRoot } from 'react-dom/client'

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.querySelector('#root'))
  root.render(<h1>Hello World!</h1>)
})
