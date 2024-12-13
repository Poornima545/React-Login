import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from './userService';
import './style.css'
import { useNavigate } from 'react-router-dom';

function Users() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await getUsers()
            setUsers(response.data);
        } catch (error) {
            console.error('There was an error submitting the form!', error);
        }
    }


    const handleUpdate = (id) => {
        navigate(`/update-user/${id}`);
    };

    useEffect(() => {
        fetchUsers();
    })


    return (
        <div className='user-list'>
            <h2>Registered Users</h2>
            <ol>
                {users.map(user => (
                    <li key={user.id} className='list-of-user'>
                        <span> {user.email}</span>
                        <button className='action-btn' onClick={() => deleteUser(user.id)}>Delete</button>
                        <button className='action-btn' onClick={() => handleUpdate(user.id)}>Update</button>
                    </li>
                ))}
            </ol>
        </div>
    )
}


export default Users;