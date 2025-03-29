import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()

  const login = (token) => {
    localStorage.setItem('token', token)
    setToken(token)
    navigate('/users')
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/login')
  }

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
