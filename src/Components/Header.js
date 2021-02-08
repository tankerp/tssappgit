import React from "react"
import symb from "./Slice-2-3-e1602342563858.png"
import "./Header.css"
import { Link } from "react-router-dom"
function Header() {
  return (
    <>
      <div className="logo-det">
        <img src={symb} width={100}></img>
      </div>

      <div className="navbar-menuItems">
        <ul>
          <Link to="/Home">Home</Link>
          <Link to="/Components">Components</Link>
          <Link to="/Reports">Reports</Link>
        </ul>
      </div>
    </>
  )
}

export default Header

/*
<a href="#">Home</a>
        <a href="#">Components</a>
        <a href="#">Reports</a>
*/
{
  /*
      <div className="header_search">
        <div className="header_searchContainer">
          <input placeholder="search" type="text" />
        </div>
      </div>
      */
}
