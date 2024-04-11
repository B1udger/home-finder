import './RentalsList.css';
import { useEffect, useState } from 'react';
import { RentalCard } from '../rental-card/RentalCard';
import { deleteRentalById,getAllRentals,} from '../../../services/rentals-service';
import {deleteImageById,getImagesByRentalId,} from '../../../services/image-service';

export function RentalsList() {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const res = await getAllRentals();
        setRentals(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRentals();
  }, []);

  async function deleteRental(id) {
    try {
      const res = await getImagesByRentalId(id);
      const rentalImages = res.data;

      for (let i = 0; i < rentalImages.length; i++) {
        await deleteImageById(rentalImages[i].id);
      }

      await deleteRentalById(id);

      setRentals((prevState) => {
        return prevState.filter((r) => r.id !== id);
      });
    } catch (err) {
      console.error(err);
    }
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




