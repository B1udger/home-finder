import { Button, Card } from 'react-bootstrap';
import './RentalCard.css';

export function RentalCard({ rental, handleDelete }) {
  return (
    <div className="rental-card">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={rental.mainImg} />
        <Card.Body>
          <Card.Title className="title">{rental.rentalName}</Card.Title>
          <Card.Text>
            <span className="key">Address: </span>
            <span className="value">{rental.address} </span>
          </Card.Text>
          <Card.Text>
            <span className="key">Type: </span>
            <span className="value">{rental.rentalType} </span>
          </Card.Text>
          <Card.Text>
            <span className="key">Bedrooms: </span>
            <span className="value">{rental.bedroomsCount} </span>
          </Card.Text>
          <Card.Text>
            <span className="key">Guests: </span>
            <span className="value">{rental.guestsCount} </span>
          </Card.Text>
          <Card.Text>
            <span className="key">Price per night: </span>
            <span className="value">{`${rental.pricePerNight} lv.`} </span>
          </Card.Text>
          <div className="btn-holder">
            <Button variant="primary">Rent</Button>
            <Button variant="info">More info</Button>
            <Button variant="danger" onClick={() => handleDelete(rental.id)}>
              Delete
            </Button>
            <Button variant="dark">Edit</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
