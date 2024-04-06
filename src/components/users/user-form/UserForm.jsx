import './UserForm.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  getLoggedUser,
  getUserById,
  saveUser,
} from '../../../services/users-service';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

export function UserForm() {
  const loggedUser = getLoggedUser();
  const params = useParams();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const [user, setUser] = useState({
    picture: '',
    name: '',
    password: '',
    email: '',
    phone: '',
    isAdmin: false,
    address: '',
  });

  useEffect(() => {
    if (params.id) {
      getUserById(params.id).then((res) => {
        setUser(res.data);
      });
    }
  }, [params.id]);

  function onFormSubmit(e) {
    e.preventDefault();

    saveUser(user).then(() => {
      navigate('/');
    });
  }

  function onInputChange(e) {
    let value = e.target.value;
    if (e.target.name === 'isAdmin') {
      value = e.target.checked;
    }

    setUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]: value,
      };
    });
  }

  return (
    <div className="user-form-wrapper">
      <Form onSubmit={onFormSubmit}>
        <h3>{pathname === '/register' ? 'Register' : 'Create user'}</h3>

        <Form.Group className="mb-3" controlId="formBasicName">
          <FloatingLabel label="Name">
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={user.name}
              onChange={onInputChange}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={onInputChange}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel label="Email">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={onInputChange}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPicture">
          <FloatingLabel label="Picture URL">
            <Form.Control
              type="text"
              placeholder="Picture URL"
              name="picture"
              value={user.picture}
              onChange={onInputChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <FloatingLabel label="Phone">
            <Form.Control
              type="tel"
              placeholder="Phone"
              name="phone"
              value={user.phone}
              onChange={onInputChange}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
          <FloatingLabel label="Address">
            <Form.Control
              type="text"
              placeholder="Address"
              name="address"
              value={user.address}
              onChange={onInputChange}
              required
            />
          </FloatingLabel>
        </Form.Group>

        {loggedUser && loggedUser.isAdmin && (
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Admin"
              name="isAdmin"
              checked={user.isAdmin}
              onChange={onInputChange}
            />
          </Form.Group>
        )}

        <Button variant="primary" type="submit">
          {pathname === '/register' ? 'Register' : 'Submit'}
        </Button>
      </Form>
    </div>
  );
}
