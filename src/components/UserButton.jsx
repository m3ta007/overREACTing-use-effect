import React from 'react'
import PropTypes from 'prop-types'

function UserButton(props) {
  const { id, isSelected } = props

  const handleClick = (e) => {
    console.log('UserButton clicked: ', id)
    props.onClick(id)
  }

  return (
    <button
      className="user-name"
      onClick={handleClick}
      aria-pressed={isSelected}>
      {props.children}
    </button>
  )
}

UserButton.propTypes = {}

export default UserButton
