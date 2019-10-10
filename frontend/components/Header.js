import { useState, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import { APP_NAME } from '../config';
import { isAuth, signout } from '../actions/auth';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar expand='md' className='header'>
        <Link href='/'>
          <NavLink className='font-weight-bold' style={{ cursor: 'pointer' }}>
            {APP_NAME}
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            {!isAuth() && (
              <Fragment>
                <NavItem style={{ cursor: 'pointer' }}>
                  <Link href='/signin'>
                    <NavLink>SignIn</NavLink>
                  </Link>
                </NavItem>
                <NavItem style={{ cursor: 'pointer' }}>
                  <Link href='/signup'>
                    <NavLink>SignUp</NavLink>
                  </Link>
                </NavItem>
              </Fragment>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink
                  style={{ cursor: 'pointer' }}
                  onClick={() => signout(() => Router.replace(`/signin`))}
                >
                  SignOut
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
