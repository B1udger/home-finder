import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Main } from './components/main/Main';
import { Layout } from './components/layout/Layout';
import { RentalForm } from './components/rentals/rental-form/RentalForm';
import { UserForm } from './components/users/user-form/UserForm';
import { Login } from './components/auth/login/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/rentals/add" element={<RentalForm />} />
          <Route path="/rentals/edit/:id" element={<RentalForm />} />

          <Route path="/user/add" element={<UserForm />} />
          <Route path="/user/edit/:id" element={<UserForm />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
