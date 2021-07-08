import React from 'react'
import './Header.css'

const Header = () => {
 return (
   <header className="header">
     <picture className="header-picture">
       <source media="(min-width:1280px)" srcSet="/desktop-header-bg.svg"/>
       <source media="(min-width:768px)" srcSet="/tablet-header-bg.svg"/>
       <img className="header-bg" src="/mobile-header-bg.svg" alt="" />
     </picture>
     <div className="header-container">
     <h1 className="header-url">URL</h1>
     <h1 className="header-shortener">Shortener</h1>
     </div>
     <nav className="header-nav">
       <ul>
         <li><a href="">API</a></li>
         <li><a href="">Github</a></li>
       </ul>
     </nav>
   </header>
 )
}

export default Header