import React from "react";

const Navbar = ({ openLoginModal, openSignUpModal }) => {
  return (
    <div className='navbar'>
      <div className='navbar-container'>
        <h2>Objective Manager</h2>
        <ul>
          <li>
            <a className='button' onClick={openLoginModal}>
              Login
            </a>
            <a className='button' onClick={openSignUpModal}>
              Register
            </a>
            <a href=''>Logout</a>
            <a href=''>Account</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
