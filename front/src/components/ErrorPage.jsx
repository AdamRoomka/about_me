import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div>
        <h2>Error 404</h2>
        <p>Go back to </p> <Link to="/">main page</Link>
    </div>
  )
}

export default ErrorPage