// import React from 'react';
// import { GoogleLogin } from 'react-google-login';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@mui/material';

// const clientId = '847287208694-djmhp63di4tjd8tt50vdgs9o5v3o1ntm.apps.googleusercontent.com';

// const GoogleLoginButton = () => {
//   const navigate = useNavigate();

//   const responseGoogle = async (response) => {
//     console.log('Google login response:', response);
//     const token = response.tokenId;
//     const profile = response.profileObj; // Get user profile info

//     try {
//       const res = await axios.post('http://127.0.0.1:8000/api/auth/google/', { 
//         token, 
//         name: profile.name, 
//         email: profile.email 
        
//       });
//       console.log('Backend response:', res.data);
//       const { accessToken, refreshToken } = res.data;

//       localStorage.setItem('access_token', accessToken);
//       localStorage.setItem('refresh_token', refreshToken);
//       localStorage.setItem('user_name', profile.name); // Save user name

//       if (res.status === 200) {
//         navigate('/landing');
//       } else {
//         navigate('/unauthorized');
//       }
//     } catch (error) {
//       console.error('Backend error:', error);
//       navigate('/unauthorized');
//     }
//   };

//   const onFailure = (response) => {
//     console.log('Google login failed:', response);
//     navigate('/unauthorized');
//   };

//   return (
//     <GoogleLogin
//       clientId={clientId}
//       buttonText="Sign in with Google"
//       onSuccess={responseGoogle}
//       onFailure={onFailure}
//       cookiePolicy={'single_host_origin'}
//       render={(renderProps) => (
//         <Button
//           className='ChangeHover'
//           onClick={renderProps.onClick}
//           fullWidth
//           variant="outlined"
//           style={{ marginTop: '1rem', borderColor: '#DA5527', color: '#DA5527', borderRadius: '1.5rem', padding: '10px' }}
//         >
//           <img
//             src={`${process.env.PUBLIC_URL}/google.svg`}
//             alt="google"
//             style={{ width: '24px', height: '24px', marginRight: '10px' }}
//           />
//           Sign in with Google
//         </Button>
//       )}
//     />
//   );
// };

// export default GoogleLoginButton;


import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Cookies from 'js-cookie';

const clientId = '847287208694-djmhp63di4tjd8tt50vdgs9o5v3o1ntm.apps.googleusercontent.com';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    console.log('Google login response:', response);
    const token = response.tokenId;
    const profile = response.profileObj;

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/google/', { 
        token, 
        name: profile.name, 
        email: profile.email 
      });
      console.log('Backend response:', res.data);
      const { accessToken, refreshToken } = res.data;

      Cookies.set('access_token', accessToken);
      Cookies.set('refresh_token', refreshToken);
      Cookies.set('user_name', profile.name);

      if (res.status === 200) {
        navigate('/landing');
      } else {
        navigate('/unauthorized');
      }


      
    } catch (error) {
      console.error('Backend error:', error);
      navigate('/unauthorized');
    }

    if (response.status === 401) {
      alert('Unauthorized access. Please log in.');
    }
    
  };

  const onFailure = (response) => {
    console.log('Google login failed:', response);
    navigate('/unauthorized');
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      render={(renderProps) => (
        <Button
          className='ChangeHover'
          onClick={renderProps.onClick}
          fullWidth
          variant="outlined"
          style={{ marginTop: '1rem', borderColor: '#DA5527', color: '#DA5527', borderRadius: '1.5rem', padding: '10px 20px' }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/google.svg`}
            alt="google"
            style={{ width: '24px', height: '24px', marginRight: '10px' }}
          />
          Sign in with Google
        </Button>
      )}
    />
  );
};

export default GoogleLoginButton;