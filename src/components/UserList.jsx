import React from 'react'
import PropTypes from 'prop-types'
import withData from './withData'
import List from './List'

const UserList = (props) => {
  console.log('UserList: ', props)
  return withData(process.env.REACT_APP_USERS_URL, 'users', props)(List)
}

UserList.propTypes = {}

export default UserList
