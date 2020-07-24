import React from 'react'
import PropTypes from 'prop-types'

function UserDetails(props) {
  console.log('UserDetailzzz: ', props)
  const { info } = props

  return <div className="container user-details">Details on {info.name}</div>
}

UserDetails.propTypes = {}

export default UserDetails
