import React from "react";
import Logo from "../assets/images/logo.svg";
import Search from "../assets/images/search.svg";
import Store from "../assets/images/store.svg";

function Nav() {
  return (
    <nav className="nav-wrapper">
      <div className="nav-content">
        <ul className="list-styled">
          <li>
            <img  src={Logo} alt="Apple" />
          </li>
          <li>
            <a className="link-styled" style={{ fontSize: '18px' }}>Store</a>
          </li>
          <li>
            <a className="link-styled" style={{ fontSize: '18px' }}>Mac</a>
          </li>
          <li>
            <a className="link-styled" style={{ fontSize: '18px' }}>iPad</a>
          </li>
          <li>
            <a className="link-styled" style={{ fontSize: '18px' }}>iPhone</a>
          </li>
          <li>
            <a className="link-styled" style={{ fontSize: '18px' }}>Watch</a>
          </li>
          <li>
            <a className="link-styled" style={{ fontSize: '18px' }}>Tv & Home</a>
          </li>
          <li>
            <a className="link-styled" style={{ fontSize: '18px' }}>Entertainment</a>
          </li>
          <li>
            <a className="link-styled" style={{ fontSize: '18px' }}>Accessories</a>
          </li>
          <li>
            <a className="link-styled" style={{ fontSize: '18px' }}>Support</a>
          </li>
          <li>
            <img src={Search} alt="Search" />
          </li>
          <li>
            <img src={Store} alt="Store" />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
