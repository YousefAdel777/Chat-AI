import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import AuthContext from './contexts/AuthContext.jsx'
import ChatsContext from './contexts/ChatsContext.jsx'
import ThemeContext from './contexts/ThemeContext.jsx'
import SidebarContext from './contexts/SidebarContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <AuthContext>
          <ThemeContext>
            <ChatsContext>
              <SidebarContext>
                <App />
              </SidebarContext>
            </ChatsContext>
          </ThemeContext>
        </AuthContext>
    </BrowserRouter>
  </StrictMode>,
);
