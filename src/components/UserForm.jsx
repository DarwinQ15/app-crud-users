import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert2'
import '../userForm.css'

const UserForm = ({getUsers, usersSelect, deselectUsers}) => {

    const {register, handleSubmit, reset} = useForm();

    useEffect(()=>{
        if(usersSelect){
            reset(usersSelect)
        }
    },[usersSelect])

    const submit = (data) =>{
        if(usersSelect){
            //actualizando
            axios.put(`https://users-crud1.herokuapp.com/users/${usersSelect.id}/`, data)
            .then(()=> getUsers());
            alertput();
        }else{
            //create user
            axios.post('https://users-crud1.herokuapp.com/users/', data)
            .then(()=> getUsers())
            .catch((error)=> console.log(error.response));
            alertPost();
        }
        clear();
    }

    //Limpiar campos
    const clear =()=>{
        reset({
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            birthday: ''
        })
        deselectUsers();
    }

    const alertput = ()=>{
        swal.fire('User', 'Update succesfully', 'success')
    }
    const alertPost = ()=>{
        swal.fire('User', 'Created succesfully', 'success')
    }

    return (
        <form className='form' onSubmit={handleSubmit(submit)}>
            <h1>Users Form</h1>
            <div className='form-name'>
                <i class='bx bxs-user'></i>
                <div className='form-input-name'>
                    <label htmlFor="first_name"></label>
                    <input type="text" required id='first_name' placeholder='First Name' {...register('first_name')} />
                </div>
                <div className='form-input-name'>
                    <label htmlFor="last_name"></label>
                    <input type="text" required id='last_name' placeholder='Last Name' {...register('last_name')} />
                </div>
            </div>
            <div className='form-email'>
                <i class='bx bx-envelope'></i>
            <div className='form-input'>
                <label htmlFor="email"></label>
                <input type="text" required id='email' placeholder='Email' {...register('email')} />
            </div>
            </div>
            <div className='form-password'>
                <i class='bx bx-lock-alt'></i>
            <div className='form-input'>
                <label htmlFor="password"></label>
                <input type="password" required id='password' placeholder='Password' {...register('password')} />
            </div>
            </div>
            <div className='form-birthday'>
                <i class='bx bx-gift' ></i>
            <div className='form-happy'>
                <label htmlFor="birthday"></label>
                <input type="date" id='birthday' {...register('birthday')} />
            </div>
            </div>
            <div className='input-button'>
                <button>{usersSelect !== null ? 'update' : 'create new user'}</button>
                {usersSelect !== null &&(
                    <button onClick={clear} type='button'>Clear</button>
                )}
            </div>
        </form>
    );
};

export default UserForm;