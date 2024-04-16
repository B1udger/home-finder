import './Login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/users-service';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

export function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  async function onFormSubmit(e) {
    e.preventDefault();

    try {
      await login(user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  const onInputChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="login-form-wrapper">
      <Form onSubmit={onFormSubmit} className="Form">
        <h3>Login</h3>
        {error && <span className="text-danger">{error}</span>}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel controlId="floatingPassword" label="Password">
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Link to="/register" className="Link">
          Sign up
        </Link>
      </Form>
    </div>
  );
}
