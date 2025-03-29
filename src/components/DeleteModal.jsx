import { Modal, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext'

export default function DeleteModal({ userId, onClose, setUsers }) {
  const { token } = useAuth()

  const handleDelete = async () => {
    try {
      const res = await fetch(`https://reqres.in/api/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Delete failed')

      setUsers(prev => prev.filter(user => user.id !== userId))
      toast.success('User deleted')
      onClose()
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <Modal show={!!userId} onHide={onClose} centered>
      <Modal.Header closeButton><Modal.Title>Confirm Delete</Modal.Title></Modal.Header>
      <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}
