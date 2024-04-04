import './RentalsList.css';
import { useEffect, useState } from 'react';
import { RentalCard } from '../rental-card/RentalCard';
import {
  deleteRentalById,
  getAllRentals,
} from '../../../services/rentals-service';

export function RentalsList() {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    getAllRentals().then((res) => {
      setRentals(res.data);
    });
  }, []);

  function deleteRental(id) {
    deleteRentalById(id)
      .then(() => {
        setRentals((prevState) => {
          return prevState.filter((r) => r.id !== id);
        });
      })
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <h2>Currently available rentals:</h2>
      <div className="rentals-list-wrapper">
        {rentals
          .filter((rental) => !rental.isRented)
          .map((rental) => (
            <RentalCard
              key={rental.id}
              rental={rental}
              handleDelete={deleteRental}
            />
          ))}
      </div>
    </div>
  );
}
