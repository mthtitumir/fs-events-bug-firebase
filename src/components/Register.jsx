import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from '../firebase/firebase.config';
import { Link } from 'react-router-dom';
import { send } from 'vite';

const auth = getAuth(app);
const Register = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit =(e) =>{
        // 1. prevent page refresh
        e.preventDefault();
        setSuccess('');
        setError('');
        // 2. collect form data 
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(e.target.email.value);
        // validate
        if(!/(?=.*[A-Z])/.test(password)){
            setError('Please add at least one uppercase')
            return;
        }
        // 3. create user in firebase
        // create user in firebase 
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('');
            e.target.reset();
            setSuccess('User has created successfully!')
            sendVerificationEmail(result.user)
        })
        .catch (error => {
            console.log(error.message);
            setError(error.message);
            setSuccess('');
            
        })
    }
const sendVerificationEmail = (user) =>{
    sendEmailVerification(user)
    .then(
        result => {
            console.log(result);
            alert('please varify  yor email address')
        }
    )
}

    const handleEmailChange = (e) =>{
        // console.log(e.target.value);
        setEmail(e.target.value);
    }
    const handlePasswordBlur = (e) =>{
        console.log(e.target.value);
    }
    return (
        <div className='w-50 mx-auto'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 rounded' onChange={handleEmailChange} type="email" name = "email" id ="email" placeholder='Your Email' required/>

                <br />
                <input className='w-50 mb-4 rounded' onBlur={handlePasswordBlur} type="password" name = "password" id ="password" placeholder='Your Password' required/>
                <br />
                <input className='w-50 mb-4 rounded btn btn-primary' type="submit" name="" id="" />
            </form>
            <p>Already Have An Account? Please <Link to='/login'>Log In</Link></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;