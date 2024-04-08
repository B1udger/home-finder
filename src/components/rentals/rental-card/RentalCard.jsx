import { Button, Card } from 'react-bootstrap';
import './RentalCard.css';
import { getLoggedUser } from '../../../services/users-service';
import { useNavigate } from 'react-router-dom';
import { AdvancedImage } from '@cloudinary/react';
import { useEffect, useState } from 'react';
import { getImagesByRentalId } from '../../../services/image-service';
import { getCloudinaryImg } from '../../../utils/helpers';

export function RentalCard({ rental, handleDelete }) {
  const [thumbnailImgId, setThumbnailImgId] = useState();
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThumbnailImage = async () => {
      try {
        const res = await getImagesByRentalId(rental.id);
        const thumbnailImgId = res.data.filter((i) => i.thumbnail)[0].publicId;
        setThumbnailImgId(thumbnailImgId);
      } catch (err) {
        console.error(err);
      }
    };

    fetchThumbnailImage();
  }, [rental.id]);

  function navigateToLogin() {
    navigate('/login');
  }

  function navigateToEdit() {
    navigate(`/rentals/edit/${rental.id}`);
  }

  function navigateToInfo() {
    navigate(`/rentals/info/${rental.id}`);
  }

  return (
    <div className="rental-card">
      <Card style={{ width: '18rem' }}>
        <AdvancedImage
          className="card-img card-img-top"
          cldImg={getCloudinaryImg(thumbnailImgId)}
        />

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
            {loggedUser ? (
              <Button variant="primary" onClick={navigateToInfo}>
                Rent
              </Button>
            ) : (
              <Button variant="primary" onClick={navigateToLogin}>
                Login
              </Button>
            )}

            {loggedUser && loggedUser.isAdmin && (
              <div>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(rental.id)}
                >
                  Delete
                </Button>
                <Button variant="dark" onClick={navigateToEdit}>
                  Edit
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
