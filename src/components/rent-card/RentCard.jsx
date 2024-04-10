import './RentCard.css';
import { RentalCard } from '../rentals/rental-card/RentalCard';
import { useEffect, useState } from 'react';
import { getRentalById } from '../../services/rentals-service';

export function RentCard({ rent }) {
  const [rental, setRental] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRentalById(rent.rentalId);
      setRental(res.data);
    };

    fetchData();
  }, [rent.rentalId]);
  return (
    <div className="rent-card-wrapper">
      <RentalCard rental={rental} isInRentInfo />
      <div>
        <p className="key">Start date: </p>
        <p>{`${rent.startDate}`}</p>
        <p className="key">End date: </p>
        <p>{`${rent.endDate}`}</p>
        <p className="key">Total:</p>
        <p>{`${rent.total}lv.`}</p>
      </div>
    </div>
  );
}
