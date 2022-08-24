import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../Auth/Auth';

const Profile = () => {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await logout();
          navigate('/');
          console.log('You are logged out')
        } catch (e) {
          console.log(e.message);
        }
      };

    return ( 
        <button onClick={handleLogout}>
        Logout
      </button>
     );
}
 
export default Profile;