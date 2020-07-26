import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function UserDetails(props) {
  const { info } = props
  const [user, setUser] = useState([])

  // Ensure safe details access
  const userDetails = (user || {}).details || {}

  // API Helpers
  const [isLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      // Set loader
      setLoading(true)

      // Fetch users from API
      try {
        const response = await fetch(
          `${process.env.REACT_APP_USER_URL_PREFIX}${info.id}.json`
          // process.env.REACT_APP_USER_URL_PREFIX + info.id + '.json'
        )
        if (!response.ok) {
          // Throw error
          setError(response.statusText)
          throw new Error(response.statusText)
        }

        // Update user state, clean errors
        const userDataJson = await response.json()
        setUser(userDataJson)
        setError(null)
      } catch (e) {
        setError(e)
      } finally {
        // Remove loader
        setLoading(false)
      }
    }

    // Fetch data from API on mount
    fetchUserData()

    // Run once, no cleaning needed
  }, [info])

  return (
    <div className="container user-details">
      {isLoading && <p>Loading... Patience, please</p>}
      {hasError && (
        <p>Oops, an error sneaked in here! Try to refresh the page.</p>
      )}
      <div className="user-detail user-detail-img">
        <img
          src={user.avatar}
          alt={`User avatar of ${user.name}`}
          className="user-img"
        />
      </div>
      <div className="user-detail">
        <h2>{user.name}</h2>
      </div>
      <div className="user-detail">
        <dl>
          <dt className="user-detail-term">City:</dt>
          <dd className="user-detail-info">{userDetails.city}</dd>
        </dl>
      </div>
      <div className="user-detail">
        <dl>
          <dt className="user-detail-term">Company:</dt>
          <dd className="user-detail-info">{userDetails.company}</dd>
        </dl>
      </div>
      <div className="user-detail">
        <dl>
          <dt className="user-detail-term">Position:</dt>
          <dd className="user-detail-info">{userDetails.position}</dd>
        </dl>
      </div>
    </div>
  )
}

UserDetails.propTypes = {
  props: PropTypes.objectOf({
    info: PropTypes.objectOf({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }),
}

export default UserDetails
