import React from 'react'
import PropTypes from 'prop-types'
import List from './List'
import withData from './withData'

const UserList = (props) => {
  console.log('UserList: ', props)
  return withData(process.env.REACT_APP_USERS_URL, 'users', props)(List)
}

UserList.propTypes = {}

export default UserList
