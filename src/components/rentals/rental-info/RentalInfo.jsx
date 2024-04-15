import './RentalInfo.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRentalById, saveRental } from '../../../services/rentals-service';
import { Button, Carousel, Form} from 'react-bootstrap';
import { getLoggedUser } from '../../../services/users-service';
import { dateDiff, getCloudinaryImg } from '../../../utils/helpers';
import { saveRent } from '../../../services/rent-service';
import { AdvancedImage } from '@cloudinary/react';
import { getImagesByRentalId } from '../../../services/image-service';


export function RentalInfo() {
  const params = useParams();
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();
  let currentDate = new Date().toJSON().slice(0, 10);
  const [error, setError] = useState('');
  const [rental, setRental] = useState({});
  const [rent, setRent] = useState({
    userId: loggedUser ? loggedUser.id : 0,
    rentalId: '',
    startDate: '',
    endDate: '',
    total: 0,
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const res = await getRentalById(params.id);
        setRental(res.data);

        const response = await getImagesByRentalId(rental.id);
        setImages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (params.id) {
      fetchRental();
    }
  }, [params.id, rental.id]);

  const onInputChange = (e) => {
    setRent((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      rentalId: rental.id,
    }));

    setRent((prevState) => {
      let totalCost = prevState.total;

      if (prevState.startDate && prevState.endDate) {
        let diffInDays = dateDiff(
          new Date(prevState.startDate),
          new Date(prevState.endDate)
        );
        if (diffInDays === 0) {
          diffInDays = 1;
        }

        totalCost = parseFloat(rental.pricePerNight * diffInDays).toFixed(2);

        if (totalCost < 0) {
          totalCost = 0;
        }
      }

      return {
        ...prevState,
        total: totalCost,
      };
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!loggedUser) {
      navigate('/login');
      return;
    }

    if (rent.startDate > rent.endDate) {
      setError('The start date must be before end date!');
      return;
    }

    try {
      rental.isRented = true;

      await saveRental(rental);
      await saveRent(rent);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

 return (
    <div className="rental-info-container">
      <h2>{rental.rentalName}</h2>
      <h5>{rental.address}</h5>

      <Carousel fade className="carousel">
        {Object.entries(images).map(([key, value]) => (
          <Carousel.Item key={key}>
            <AdvancedImage cldImg={getCloudinaryImg(value.publicId)} />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="inner-info">
        <div className="rental-text-info">
          <div>
            <span className="key">Type: </span>
            <span>{rental.rentalType}</span>
          </div>
          <div>
            <span className="key">Bedrooms: </span>
            <span>{rental.bedroomsCount}</span>
          </div>
          <div>
            <span className="key">Number of guest: </span>
            <span>{rental.guestsCount}</span>
          </div>
          <div>
            <span className="key">Info: </span>
            <span>{rental.additionalInfo}</span>
          </div>
          <div>
            <span className="key">Price per night: </span>
            <span>{rental.pricePerNight}lv</span>
          </div>
        </div>

        <div className="rent-form">
          <Form onSubmit={onFormSubmit}>
            {error && <span className="text-danger">{error}</span>}
            <Form.Group className="mb-3" controlId="formBasicBrand">
              <Form.Label>Start date:</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                min={currentDate}
                onChange={onInputChange}
                required
              />
            </Form.Group>

            {rent.startDate && (
              <div>
                <Form.Group className="mb-3" controlId="formBasicBrand">
                  <Form.Label>End date:</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    min={rent.startDate}
                    onChange={onInputChange}
                    required
                  />
                </Form.Group>

                <div className="spans">
                  <span className="key">Total: </span>
                  <span>{rent.total}</span>
                </div>

                <Button variant="primary" type="submit">
                  Rent
                </Button>
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

