import React, { useState } from 'react'
import './App.css'
import List from './components/List'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'

function App() {
  const [users, setUsers] = useState([{ id: 0, name: 'Kiki' }])
  const [isSelected, setSelected] = useState(null)

  const userSelected = users.map((o) => o.id === isSelected)

  // Handle name activation via UserButton
  const handleClick = (id) => {
    // Check if already selected
    if (isSelected === id) {
      setSelected(null)
    } else {
      setSelected(id)
    }
    users.filter((o) => o.id !== id)
  }

  return (
    <div className="container">
      <UserList users={users} onClick={handleClick} selected={isSelected} />
      {/* <List /> */}
      {isSelected && <UserDetails info={userSelected} />}
    </div>
  )
}

export default App
