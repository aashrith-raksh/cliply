import React from 'react'
import { useParams } from 'react-router-dom'

const RedirectLink = () => {
  const {id} = useParams()
  return (
    <div>
      {`Redirect ${id}`}
    </div>
  )
}

export default RedirectLink
