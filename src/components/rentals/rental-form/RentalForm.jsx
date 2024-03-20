import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useState } from 'react';
import './RentalForm.css';

export function RentalForm() {
  const [rental, setRental] = useState({
    rentalName: '',
    rentalType: '',
    bedroomsCount: '',
    guestsCount: '',
    mainImg: '',
    additionalInfo: '',
    address: '',
    pricePerNight: '',
  });

  const onInputChange = (e) => {
    setRental((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(rental);
  };

  return (
    <div className="rental-form-wrapper">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <FloatingLabel label="Name">
            <Form.Control
              type="text"
              placeholder="Name"
              name="rentalName"
              value={rental.rentalName}
              onChange={onInputChange}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicType">
          <FloatingLabel label="Type">
            <Form.Select
              placeholder="Type"
              name="rentalType"
              value={rental.rentalType}
              onChange={onInputChange}
            >
              <option key="test1" value="Test 1">
                Test 1
              </option>
              <option key="test2" value="Test 2">
                Test 2
              </option>
              <option key="test3" value="Test 3">
                Test 3
              </option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBedroomsCount">
          <FloatingLabel label="Address">
            <Form.Control
              type="text"
              placeholder="Address"
              name="address"
              value={rental.address}
              onChange={onInputChange}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBedroomsCount">
          <FloatingLabel label="Bedrooms">
            <Form.Control
              type="number"
              placeholder="Bedrooms"
              name="bedroomsCount"
              value={rental.bedroomsCount}
              onChange={onInputChange}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGuestsCount">
          <FloatingLabel label="Guests">
            <Form.Control
              type="number"
              placeholder="Guests"
              name="guestsCount"
              value={rental.guestsCount}
              onChange={onInputChange}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicMainImg">
          <FloatingLabel label="Main Image URL">
            <Form.Control
              type="url"
              placeholder="Main Image URL"
              name="mainImg"
              value={rental.mainImg}
              onChange={onInputChange}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicInfo">
          <FloatingLabel label="Additional info">
            <Form.Control
              as="textarea"
              placeholder="Additional info"
              name="additionalInfo"
              value={rental.additionalInfo}
              onChange={onInputChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicInfo">
          <FloatingLabel label="Price per night">
            <Form.Control
              type="number"
              placeholder="Price per night"
              name="pricePerNight"
              value={rental.pricePerNight}
              onChange={onInputChange}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Button variant="primary" type="submit">
          {rental.id ? 'Edit' : 'Create'}
        </Button>
      </Form>
    </div>
  );
}
