import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import './RentalForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getRentalById, saveRental } from '../../../services/rentals-service';
import {
  deleteImageById,
  getImagesByRentalId,
  postImageToAPI,
  saveImageInDb,
} from '../../../services/image-service';
import { getLoggedUser } from '../../../services/users-service';
import { rentalTypes } from '../../../utils/constants';

export function RentalForm() {
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();
  const params = useParams();
  const [fieldErrors, setFieldErrors] = useState({});
  const [images, setImages] = useState([]);
  const [rental, setRental] = useState({
    rentalName: '',
    rentalType: '',
    bedroomsCount: '',
    guestsCount: '',
    additionalInfo: '',
    address: '',
    pricePerNight: '',
  });

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const res = await getRentalById(params.id);
        setRental(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (params.id) {
      fetchRental();
    } else {
      setRental({
        rentalName: '',
        rentalType: rentalTypes.APARTMENT,
        bedroomsCount: '',
        guestsCount: '',
        additionalInfo: '',
        address: '',
        pricePerNight: '',
      });
    }
  }, [params.id]);

  const onInputChange = (e) => {
    setRental((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedUser) {
      navigate('/login');
      return;
    }

    const currFieldErrs = validate(rental);
    setFieldErrors(currFieldErrs);

    if (Object.keys(currFieldErrs).length) {
      return;
    }

    try {
      const rentalID = (await saveRental(rental)).data.id;

      if (e.target.querySelector('input[type="file"]').files.length !== 0) {
        //delete old images in the db after edit and selection of new ones for the rental
        if (params.id) {
          const res = await getImagesByRentalId(rentalID);
          const oldImagesData = res.data;

          for (let i = 0; i < oldImagesData.length; i++) {
            await deleteImageById(oldImagesData[i].id);
          }
        }

        //send Images to Cloudinary
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
          let file = images[i];
          formData.append('file', file);
          formData.append('upload_preset', 'hur85tvb');

          const response = await postImageToAPI(formData);
          const img = {
            userId: loggedUser.id,
            rentalId: rentalID,
            publicId: response.data.public_id,
            thumbnail: i === 0 ? true : false,
          };

          await saveImageInDb(img);
        }
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validate = (rental) => {
    const errors = {};
    if (rental.bedroomsCount < 0)
      errors.bedroomsCount =
        'The number of bedrooms must be a positive number!';
    if (rental.guestsCount < 0)
      errors.guestsCount = 'The number of guests must be a positive number!';
    if (rental.pricePerNight < 0)
      errors.pricePerNight = 'Price per night must be a positive number!';

    return errors;
  };

  const handleImageSelection = (e) => {
    setImages(e.target.files);
  };

  return (
    <div className="rental-form-wrapper">
      <Form onSubmit={handleSubmit}>
        <h3>{rental.id ? 'Edit' : 'Create'}</h3>
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
              {Object.entries(rentalTypes).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
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
          {fieldErrors.bedroomsCount && (
            <span className="text-danger">{fieldErrors.bedroomsCount}</span>
          )}
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
          {fieldErrors.guestsCount && (
            <span className="text-danger">{fieldErrors.guestsCount}</span>
          )}
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageSelection}
            {...(!params.id && { required: true })}
          />
          {params.id && (
            <p className="mb-0 text-danger">
              If you click this, the old ones will be removed!
            </p>
          )}
          <span>First chosen image will be thumbnail</span>
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
          {fieldErrors.pricePerNight && (
            <span className="text-danger">{fieldErrors.pricePerNight}</span>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          {rental.id ? 'Edit' : 'Create'}
        </Button>
      </Form>
    </div>
  );
}
