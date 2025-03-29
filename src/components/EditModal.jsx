import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext'

export default function EditModal({ user, onClose, setUsers }) {
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '' })
  const { token } = useAuth()

  useEffect(() => {
    if (user) setFormData({ first_name: user.first_name, last_name: user.last_name, email: user.email || '' })
  }, [user])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`https://reqres.in/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Update failed')

      setUsers(prev => prev.map(u => (u.id === user.id ? { ...u, ...formData } : u)))
      toast.success('User updated!')
      onClose()
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <Modal show={!!user} onHide={onClose}>
      <Modal.Header closeButton><Modal.Title>Edit User</Modal.Title></Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {['first_name', 'last_name', 'email'].map((field) => (
            <Form.Group className="mb-3" key={field}>
              <Form.Label>{field.replace('_', ' ').toUpperCase()}</Form.Label>
              <Form.Control type="text" name={field} value={formData[field]} onChange={handleChange} required />
            </Form.Group>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
