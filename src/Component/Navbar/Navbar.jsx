import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
const Navbar = () => {
     const [menu, setMenu] = useState("Home");
    return (

<div classname="navbar">
<div className="nav-logo">
  <p>QuoteVault</p>
</div>
<ul className="nav-menu">
  <li onClick={() => { setMenu("Home") }}><Link style={{ textDecoration: 'none' }} to='/Home'>Home</Link>
    {menu === "Home" ? <hr /> : <></>}
  </li>
  <li onClick={() => { setMenu("Compose") }}><Link style={{ textDecoration: 'none' }} to='/Compose'>Compose</Link>
    {menu === "Compose" ? <hr /> : <></>}
  </li>
  <li onClick={() => { setMenu("Collection") }}><Link style={{ textDecoration: 'none' }} to='/Collection'>Collection</Link>
    {menu === "Collection" ? <hr /> : <></>}
  </li>
  </ul>
</div>
);
}


export default Navbar
