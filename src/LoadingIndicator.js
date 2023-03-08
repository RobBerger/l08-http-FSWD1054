import Spinner from 'react-bootstrap/Spinner'
import { useState } from 'react'
import axios from 'axios'

function LoadingIndicator() {
  let [ visible, setVisible ] = useState(false)

  if (!visible) return null
  return (
    <Spinner animation="grow" size="sm" variant="light" />
  )
}

export default LoadingIndicator