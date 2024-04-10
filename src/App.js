import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Main } from './components/main/Main';
import { Layout } from './components/layout/Layout';
import { RentalForm } from './components/rentals/rental-form/RentalForm';
import { UserForm } from './components/users/user-form/UserForm';
import { Login } from './components/login/Login';
import { RentalInfo } from './components/rentals/rental-info/RentalInfo';
import { UsersList } from './components/users/users-list/UsersList';
import { UserProfile } from './components/users/user-profile/UserProfile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<UserForm />} />
        <Route exact path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/rentals/add" element={<RentalForm />} />
          <Route path="/rentals/edit/:id" element={<RentalForm />} />
          <Route path="/rentals/info/:id" element={<RentalInfo />} />

          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/add" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<UserForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
