import React from 'react'
import { Redirect } from 'react-router-dom'

function Home() {
  return (
    <Redirect to="/dashboard" />//go to dashboard
  )
}

export default Home //defaault rendering