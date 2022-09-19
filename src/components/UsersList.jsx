import axios from 'axios';
import React from 'react';
import swal from 'sweetalert2'
import '../userList.css'

const UsersList = ({users, getUsers, selectUsers}) => {
    const deleteUser = (id)=>{
        axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
        .then(()=> getUsers())
        alertDelete()
    }

    const alertDelete = ()=>{
        swal.fire('User', 'Removed succesfully', 'error')
    }

    return (
        <div>
            <ul className='container-users'>
                {users.map((user) =>(
                    <li key={user.id} className='users-item'>
                        <div className='users-card'>
                            <div className='user-info'>
                                <b className='user-name'>{user.first_name + ' ' + user.last_name}</b>
                            </div>
                            <hr />
                            <div className='user-info'>
                                <b>Emali:</b>
                                <p className='p-email'>{user.email}</p>
                            </div>
                            <div className='user-info'>
                            <i class='bx bxs-gift' ></i> <b>Birthday: </b>
                            <p>{user.birthday}</p>
                            </div>
                            <div className='btn-card'>
                                <button className='btn-edit' onClick={()=>selectUsers(user)}><i class='bx bx-edit-alt'></i></button>
                                <button className='btn-deleted' onClick={()=> deleteUser(user.id)}><i class='bx bx-trash'></i></button>
                            </div>
                        </div>
                    </li>
                    ))
                }
                </ul>
            <div className='footer'>
                <h2>Made with love in Academlo</h2>
                <h3>Web Developer: Darwin Quintero</h3>
            </div>
        </div>
    );
};

export default UsersList;