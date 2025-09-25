import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RoomContextProvide} from './components/RoomContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoomContextProvide>
      <App />
    </RoomContextProvide>
  </StrictMode>,
)
