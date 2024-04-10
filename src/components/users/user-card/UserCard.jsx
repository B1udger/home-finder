import './UserCard.css';
import { Card, Button } from 'react-bootstrap';
import { getLoggedUser } from '../../../services/users-service';
import { useNavigate } from 'react-router-dom';

export function UserCard({ user, deleteUser }) {
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();

  const redirectToEdit = () => {
    navigate(`/users/edit/${user.id}`);
  };

  if (!user) {
    return <p>No user!</p>;
  }

  return (
    <div className="user-card">
      <div className="user-card">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={user.picture} />
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>
              <span className="key">Address: </span>
              <span className="value">{user.address}</span>
            </Card.Text>

            <Card.Text>
              <span className="key">Email: </span>
              <span className="value">{user.email}</span>
            </Card.Text>

            <Card.Text>
              <span className="key">Phone: </span>
              <span className="value">{user.phone}</span>
            </Card.Text>

            <Card.Text>
              <span className="key">Admin: </span>
              {user.isAdmin ? (
                <span className="value yes">Yes</span>
              ) : (
                <span className="value no">No</span>
              )}
            </Card.Text>

            <div className="btn-holder">
              {loggedUser.id === user.id || loggedUser.isAdmin ? (
                <Button variant="primary" onClick={redirectToEdit}>
                  Edit
                </Button>
              ) : (
                ''
              )}
              {loggedUser.isAdmin && loggedUser.id !== user.id ? (
                <Button variant="danger" onClick={() => deleteUser(user.id)}>
                  Delete
                </Button>
              ) : (
                ''
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
