import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Spinner = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faSpinner} spin />
    </div>
  )
}

export default Spinner
