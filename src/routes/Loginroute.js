import React from "react"
import Header from "./../Components/Header"
import Login from "./../Components/Login"
import "./Loginroute.css"
const Loginroute = () => {
  return (
    <>
      <div className="navbar_header">
        <Header></Header>
      </div>
      <div className="home_body">
        <Login />
      </div>
    </>
  )
}

export default Loginroute
