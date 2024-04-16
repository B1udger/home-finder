import './RentCard.css';
import { RentalCard } from '../rentals/rental-card/RentalCard';
import { useEffect, useState } from 'react';
import { getRentalById } from '../../services/rentals-service';

export function RentCard({ rent }) {
  const [rental, setRental] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRentalById(rent.rentalId);
        setRental(res.data);
      } catch (error) {
        console.error('Failed to fetch rental data:', error);
      }
    };

    fetchData();
  }, [rent.rentalId]);

  return (
    <div className="rent-card-wrapper">
      <RentalCard rental={rental} isInRentInfo />
      <div className="rent-details">
        <p className="key">Start date:</p>
        <p className="value">{rent.startDate}</p>
        <p className="key">End date:</p>
        <p className="value">{rent.endDate}</p>
        <p className="key">Total:</p>
        <p className="value">{`${rent.total} lv.`}</p>
      </div>
    </div>
  );
}
