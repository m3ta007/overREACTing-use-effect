import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// import withData from './withData'
// import UserList from './UserList'
import UserButton from './UserButton'

function List(props) {
  const { users, selected } = props

  // Helper function to pass users state up:
  const handleFetch = (users) => {
    props.onFetch(users)
  }

  // Helper function to pass selected state up:
  const handleClick = (id) => {
    props.onClick(id)
  }

  // API Helpers
  const [isLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      // Set loader
      setLoading(true)

      // Fetch users from API
      try {
        const response = await fetch(process.env.REACT_APP_USERS_URL)
        if (!response.ok) {
          // Throw error
          setError(response.statusText)
          throw new Error(response.statusText)
        }

        // Lift users up, clean errors
        const usersJson = await response.json()
        handleFetch(usersJson)
        setError(null)
      } catch (e) {
        setError(e)
      } finally {
        // Remove loader
        setLoading(false)
      }
    }

    // Fetch data from API on mount
    fetchUsers()

    // Run once, no cleaning needed
  }, [])

  return (
    <>
      {isLoading && <p>Loading... Patience, please</p>}
      {hasError && (
        <p>Oops, an error sneaked in here! Try to refresh the page.</p>
      )}
      <ul>
        {users.map((o) => (
          <li key={`users-${o.id}`} className="list-item">
            <UserButton
              id={o.id}
              onClick={handleClick}
              isSelected={selected === o.id}>
              {o.name}
            </UserButton>
          </li>
        ))}
      </ul>
    </>
  )
}

List.propTypes = {}

export default List
