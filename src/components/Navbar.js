import React, { Fragment } from "react";

const Navbar = ({ openLoginModal, openSignUpModal, onLogOut, authUser }) => {
  return (
    <div className='navbar'>
      <div className='navbar-container'>
        <h2>Objective Manager</h2>
        <ul>
          <li>
            {authUser !== null ? (
              <Fragment>
                <a className='button' onClick={onLogOut}>
                  Logout
                </a>
              </Fragment>
            ) : (
              <Fragment>
                <a className='button' onClick={openLoginModal}>
                  Login
                </a>
                <a className='button' onClick={openSignUpModal}>
                  Sign Up
                </a>
              </Fragment>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
