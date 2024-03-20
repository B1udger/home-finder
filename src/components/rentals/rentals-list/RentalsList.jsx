import './RentalsList.css';
import { useState } from 'react';
import { RentalCard } from '../rental-card/RentalCard';

export function RentalsList() {
  const [rentals, setRentals] = useState([
    {
      id: 1,
      rentalName: 'Qka kushta na slunchaka',
      rentalType: 'House',
      bedroomsCount: 2,
      guestsCount: 4,
      mainImg:
        'https://a0.muscache.com/im/pictures/e06a9e10-6cd9-4648-bf01-e2bbfdb08b30.jpg?im_w=720',
      additionalInfo:
        'Mnogo izgodna oferta. Top lokaciq. V kushtata ima 2 spalni i 1 banq',
      address: 'ul. Slunchaka 3, Slunchev brqg',
      pricePerNight: 120,
      isRented: false,
    },
    {
      id: 2,
      rentalName: 'Qka kushta na slunchaka',
      rentalType: 'House',
      bedroomsCount: 2,
      guestsCount: 4,
      mainImg:
        'https://a0.muscache.com/im/pictures/e06a9e10-6cd9-4648-bf01-e2bbfdb08b30.jpg?im_w=720',
      additionalInfo:
        'Mnogo izgodna oferta. Top lokaciq. V kushtata ima 2 spalni i 1 banq',
      address: 'ul. Slunchaka 3, Slunchev brqg',
      pricePerNight: 120,
      isRented: false,
    },
    {
      id: 3,
      rentalName: 'Qka kushta na slunchaka',
      rentalType: 'House',
      bedroomsCount: 2,
      guestsCount: 4,
      mainImg:
        'https://a0.muscache.com/im/pictures/e06a9e10-6cd9-4648-bf01-e2bbfdb08b30.jpg?im_w=720',
      additionalInfo:
        'Mnogo izgodna oferta. Top lokaciq. V kushtata ima 2 spalni i 1 banq',
      address: 'ul. Slunchaka 3, Slunchev brqg',
      pricePerNight: 120,
      isRented: false,
    },
    {
      id: 4,
      rentalName: 'Qka kushta na slunchaka',
      rentalType: 'House',
      bedroomsCount: 2,
      guestsCount: 4,
      mainImg:
        'https://a0.muscache.com/im/pictures/e06a9e10-6cd9-4648-bf01-e2bbfdb08b30.jpg?im_w=720',
      additionalInfo:
        'Mnogo izgodna oferta. Top lokaciq. V kushtata ima 2 spalni i 1 banq',
      address: 'ul. Slunchaka 3, Slunchev brqg',
      pricePerNight: 120,
      isRented: false,
    },
  ]);

  return (
    <div>
      <h2>Currently available rentals:</h2>
      <div className="rentals-list-wrapper">
        {rentals
          .filter((rental) => !rental.isRented)
          .map((rental) => (
            <RentalCard key={rental.id} rental={rental} />
          ))}
      </div>
    </div>
  );
}
