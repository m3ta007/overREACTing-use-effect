import React, { useState } from 'react'
import './App.css'
import List from './components/List'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'

function App() {
  const [users, setUsers] = useState([{ id: 0, name: 'Kiki' }])
  const [isSelected, setSelected] = useState(null)

  // Handle name activation via UserButton
  const handleClick = (id) => {
    // Check if already selected
    if (isSelected !== id) {
      // setSelected(id)
      users.filter((o) => {
        console.log('App - users:', users)
        console.log('App - filterr: o.id', o.id, 'id: ', id, 'eq?', o.id === id)
        return o.id === id
      })
      setSelected(users.filter((o) => o.id === id))
    }
  }

  // Handle data load
  // const handleLoad = (data, stateName) => {}

  // const userSelected = users.filter((o) => {
  //   console.log('sel?', o.id === isSelected)
  //   console.log('sel?', typeof o.id, typeof isSelected)
  //   return o.id === isSelected
  // })

  return (
    <div className="container">
      <UserList
        users={users}
        // data={handleLoad(data, 'users')}
        onClick={handleClick}
        selected={isSelected}
      />
      {/* <List /> */}
      {isSelected && <UserDetails info={isSelected} />}
    </div>
  )
}

export default App
