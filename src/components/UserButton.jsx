import React from 'react'
import PropTypes from 'prop-types'

function UserButton(props) {
  const { id, isSelected } = props

  const handleClick = (e) => {
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

UserButton.propTypes = {
  props: PropTypes.objectOf({
    id: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
}

export default UserButton
