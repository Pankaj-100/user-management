import { useState, useEffect } from 'react'
import { Table, Pagination, Form, Button, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-toastify'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'

export default function UserList() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showDelete, setShowDelete] = useState(null)
  const { token } = useAuth()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        if (!response.ok) throw new Error('Failed to fetch users')
        
        const { data, total_pages } = await response.json()
        setUsers(data)
        setTotalPages(total_pages)
      } catch (error) {
        toast.error(error.message)
      }
    }
    fetchUsers()
  }, [page, token])

  return (
    <Container className="mt-4">
      <Form.Group className="mb-3">
        <Form.Control
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form.Group>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter(user => `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase()))
            .map(user => (
              <tr key={user.id}>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => setSelectedUser(user)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" className="ms-2" onClick={() => setShowDelete(user.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center">
        <Pagination>
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === page}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      <EditModal 
        user={selectedUser} 
        onClose={() => setSelectedUser(null)}
        setUsers={setUsers}
      />
      
      <DeleteModal 
        userId={showDelete} 
        onClose={() => setShowDelete(null)}
        setUsers={setUsers}
      />
    </Container>
  )
}