import { Outlet } from 'react-router-dom';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';

export function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
