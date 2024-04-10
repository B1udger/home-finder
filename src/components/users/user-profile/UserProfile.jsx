import './UserProfile.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserCard } from '../user-card/UserCard';
import { getUserById } from '../../../services/users-service';
import { getUserRentsById } from '../../../services/rent-service';
import { RentCard } from '../../rent-card/RentCard';

export function UserProfile() {
  const [user, setUser] = useState({});
  const params = useParams();
  const [userRents, setUserRents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserById(params.id);
      setUser(res.data);

      const response = await getUserRentsById(params.id);
      setUserRents(response.data);
    };

    fetchData();
  }, [params.id]);

  return (
    <div className="user">
      <UserCard user={user} isInDetails={true} />
      <div className="user-rents-holder">
        {userRents.map((rent) => (
          <RentCard key={rent.id} rent={rent} />
        ))}
      </div>
    </div>
  );
}
