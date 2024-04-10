import './UsersList.css';
import { useEffect, useState } from 'react';
import { deleteUser, getAllUsers } from '../../../services/users-service';
import { UserCard } from '../user-card/UserCard';

export function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUsers();
      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  const deleteUserHandler = async (id) => {
    await deleteUser(id);
    setUsers((prevState) => {
      return prevState.filter((user) => user.id !== id);
    });
  };

  return (
    <div className="users-list-wrapper">
      {users.map((user) => (
        <UserCard key={user.id} user={user} deleteUser={deleteUserHandler} />
      ))}
    </div>
  );
}
