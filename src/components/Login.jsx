import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../firebase/firebase.config';
import { Link } from 'react-router-dom';
import Register from './Register';

const auth = getAuth(app);

const Login = () => {
const [error, setError] = useState('');
const [success, setSuccess] = useState('');

    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        // validation
        setError('');
        setSuccess('');
        if(!/(?=.*[A-Z])/.test(password)){
            setError('Please add at least two uppercase.');
            return;
        }
        
        signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const loggedUser = result.user;
            setSuccess('user login successful')
            setError('');
        })
        .catch(error=>{
            setError(error.message)
        })
    }
    return (
        <div className='w-25 mx-auto'>
            <h2>Please LogIn</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name='email' className="form-control" id="email" placeholder="Enter email" required/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' className="form-control" id="password" placeholder="Password" required/>
                </div>
                <div className="form-group mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="remember-me" />
                    <label className="form-check-label" htmlFor="remember-me">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p>New to this website? Please <Link to="/register">Register</Link></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;