import React from 'react';
import { RentalsList } from '../rentals/rentals-list/RentalsList';
import './Main.css';

export function Main() {
  return (
    <div className="main">
      <RentalsList />
    </div>
  );
}
