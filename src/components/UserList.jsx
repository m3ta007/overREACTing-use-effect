import React from 'react'
import PropTypes from 'prop-types'
import withData from './withData'
import List from './List'

const UserList = (props) => {
  console.log(props)
  return withData(process.env.REACT_APP_USERS_URL, props.users)(List)
}

UserList.propTypes = {}

export default UserList
