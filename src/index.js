import { createRoot } from 'react-dom/client'

import App from './components/App/App'

import './index.css'

const container = document.getElementById('root')
createRoot(container).render(<App />)
