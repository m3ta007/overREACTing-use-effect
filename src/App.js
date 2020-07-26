import React, { useState } from 'react'
import './App.css'
import List from './components/List'
// import UserList from './components/UserList'
import UserDetails from './components/UserDetails'

function App() {
  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState(null)

  // Handle user list fetch from API
  const handleUsersFetch = (users) => {
    setUsers(users)
  }

  // Handle name activation via UserButton
  const handleClick = (id) => {
    // Check if already selected
    if (selected !== id) {
      setSelected(id)
    }
    users.filter((o) => o.id !== id)
  }
  // Lift selected user info down
  const userSelected = users.filter((o) => o.id === selected)

  return (
    <div className="container">
      <List
        users={users}
        onClick={handleClick}
        selected={selected}
        onFetch={handleUsersFetch}
      />
      {selected && <UserDetails info={userSelected[0]} />}
    </div>
  )
}

export default App
