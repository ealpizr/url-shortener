import React from 'react'
import './Main.css'

const Main = () => {
  return (
    <main className="main-container">
      <form className="form" action="">
      <input className="form-input" type="text" placeholder="Long url..."/>
      <input className="form-button" type="submit" value="Shorten It!" />
    </form>
    </main>
  )
}

export default Main