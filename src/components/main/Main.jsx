import { RentalForm } from '../rentals/rental-form/RentalForm';
import { RentalsList } from '../rentals/rentals-list/RentalsList';

export function Main() {
  return (
    <div className="main">
      <RentalForm />
      <RentalsList />
    </div>
  );
}
