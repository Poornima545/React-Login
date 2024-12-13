import React, { useEffect, useState } from 'react'
import { deleteUser, getUsers } from './userService'
import { useNavigate} from 'react-router-dom';

function UsersData() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])


    function fetchUsers() {
        getUsers()
            .then(response => {
                setUsers(response.data)
            })
            .catch(error => {
                console.error('There is an in manage users data', error)
            })
    }

    useEffect(() => {
        fetchUsers()
    },[])

    function handleUpdate(id) {
        navigate(`/update-user/${id}`)
    }

    // const handleAddNewUser = () => {
    //     navigate('/update-user/new')
    // }

    function handleDelete(id) {
        deleteUser(id)
            .then(() => {
                setUsers(users.filter(user => user.id !== id));
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error deleting the user!', error)
            })
    }

    return (
        <div className='container'>
            <h2>Manage Users Data</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">Full Name</th>
                        <th scope='col'>Reason</th>
                        <th scope='col'>phone Number</th>
                        <th scope='col'>Button</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => {
                            return <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.fullName}</td>
                                <td>{user.reason}</td>
                                <td>{user.phone}</td>
                                <td className='users-manage-data'>
                                    <button className="btn btn-outline-warning" onClick={() => handleUpdate(user.id)}>Update</button>
                                    <button className="btn btn-outline-warning" onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        })}
                </tbody>
            </table>
            <span>
                {/* <button type="button" className="btn btn-outline-dark" onClick={handleAddNewUser}>Add New User</button> */}
            </span>
        </div>
    )
}

export default UsersData;
