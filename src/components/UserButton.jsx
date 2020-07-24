import React from 'react'
import PropTypes from 'prop-types'

function UserButton(props) {
  const { id } = props

  const handleClick = (e) => {
    console.log(id)
    props.onClick(id)
  }

  return (
    <button className="user-name" onClick={handleClick}>
      {props.children}
    </button>
  )
}

UserButton.propTypes = {}

export default UserButton
