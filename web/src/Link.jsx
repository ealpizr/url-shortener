import React from 'react'
import './Link.css'

const Link = ({ url }) => {
  return (
    <div className="link-container">
      <p className="link-p"><a href={url}>{url}</a></p>
      <button className="link-copy-button">copy</button>
    </div>
  )
}

export default Link