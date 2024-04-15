import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservationCard.css';

export function ReservationCard({ rental }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(1);

  const handleSubmit = () => {
    console.log('Reservation made for:', {
      rental,
      startDate,
      endDate,
      guests,
    });
  };

  return (
    <div className="reservation-card">
      <h2>{rental.rentalName}</h2>
      <p>{rental.address}</p>
      <div className="dates">
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
      </div>
      <div className="guests">
        <label htmlFor="guests">Guests</label>
        <input type="number" id="guests" value={guests} onChange={e => setGuests(e.target.value)} min={1} />
      </div>
      <div className="price">
        <p>Price per night:</p>
        <p>{rental.pricePerNight} lv.</p>
      </div>
      <button onClick={handleSubmit}>Reserve</button>
    </div>
  );
}
