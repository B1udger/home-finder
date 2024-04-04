import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Main } from './components/main/Main';
import { Layout } from './components/layout/Layout';
import { RentalForm } from './components/rentals/rental-form/RentalForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/rentals/add" element={<RentalForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
