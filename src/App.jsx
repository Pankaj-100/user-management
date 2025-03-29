import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import UserList from './components/UserList'

export default function App() {
  const { token } = useAuth()
  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/users" /> : <Login />} />
      <Route path="/users" element={token ? <UserList /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={token ? "/users" : "/login"} />} />
    </Routes>
  )
}
