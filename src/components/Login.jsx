import { useState } from 'react'
import { Form, Button, Container, Card } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Login() {
  const [email, setEmail] = useState('eve.holt@reqres.in')
  const [password, setPassword] = useState('cityslicka')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      if (!response.ok) throw new Error('Login failed')
      
      const { token } = await response.json()
      login(token)
      toast.success('Login successful!')
      navigate('/users')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="w-100" style={{ maxWidth: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="w-100" type="submit">
              Sign In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}