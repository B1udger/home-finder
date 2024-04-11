import { Outlet } from 'react-router-dom';
import { Header } from '../header/Header';
import { Footer } from '../footer/footer';
import { useState } from 'react';
import { getLoggedUser, logout } from '../../services/users-service';
import './Layout.css';

export function Layout() {
  const [isLogged, setIsLogged] = useState(getLoggedUser());

  function logoutUser() {
    logout();
    setIsLogged(false);
  }

  return (
    <div className="page-container"> 
      <Header isLogged={isLogged} logoutHandler={logoutUser} />
      <div className="content"> 
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}