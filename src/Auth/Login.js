
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from './Auth';
import loginCSS from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {signIn, googleSignIn, user, facebookSignIn} = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
        await googleSignIn()
    } catch(error) {
        console.log(error)
    }
  }

  const handleFacebookSignIn = async () => {
    try {
        await facebookSignIn()
    } catch(error) {
        console.log(error)
    }
  }

  useEffect(() => {
    if (user !=null) {
        navigate('/')
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };

  return (
    <div className={loginCSS.container}>
    <div className={loginCSS['grid']}>
        <div className={loginCSS['img-container']}>
          <img src="https://img.freepik.com/premium-vector/young-couple-playing-beach-volleyball-sea-shore-throw-ball-each-other-happy-family-wife-husband-leisure_87771-14670.jpg?w=2000"/>
      </div>
      <div className={loginCSS["top-container"]}>
        <div>
        <label>Email Address</label>
        <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder="Enter your email"/>
        </div>
        <div>
        <label>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder="Enter your password"/>
        </div>
        <button className='primary-button' onClick={handleSubmit}>Sign in with email</button>
      </div>
      <div className={loginCSS["divider-container"]}>
        <div className={loginCSS['separator']}>OR</div>
      </div>
      <div className={loginCSS["bottom-container"]}>
      <button onClick={handleGoogleSignIn} className='social-button'>
          <svg width="30" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335"/>
                  <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853"/>
                  <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2"/>
                  <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05"/>
              </svg>
            Sign in with Google
            </button>
          <button onClick={handleFacebookSignIn} className='social-button'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="dodgerblue" viewBox="0 0 16 16"> 
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
            </svg>Sign in with Facebook
          </button>
      </div>
    </div>
    </div>
  );
};

export default Login;



{/* <div className="container">
      <img src="https://img.freepik.com/premium-vector/young-couple-playing-beach-volleyball-sea-shore-throw-ball-each-other-happy-family-wife-husband-leisure_87771-14670.jpg?w=2000" width="200" height="200"/>
        <div className='input-group v-center'>
      <label>Email Address</label>
      <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder="Enter your email"/>
      <label>Password</label>
      <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder="Enter your password"/>
      <button className='sign-in' onClick={handleSubmit}>Sign in</button>
        </div>
        <div className='bottom-buttons'>
  
          <button onClick={handleGoogleSignIn} className='google-button'>
          <svg width="30" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335"/>
                  <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853"/>
                  <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2"/>
                  <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05"/>
              </svg>
            Sign in with Google
            </button>
          <button onClick={handleFacebookSignIn} className='facebook-button'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="dodgerblue" viewBox="0 0 16 16"> 
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
            </svg>Sign in with Facebook
          </button>
        </div>
      </div> */}