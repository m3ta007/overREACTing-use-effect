import React, { useState } from 'react'
import './App.css'
import List from './components/List'
import UserList from './components/UserList'

function App() {
  const [users, setUsers] = useState([{ id: 0, name: 'Kiki' }])

  return (
    <div className="container">
      <UserList users={users} />
      {/* <List /> */}
    </div>
  )
}

export default App
