import { useState } from 'react';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';

import './index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const onChangeHandler = event => {
    const { id, value } = event.target;
    if (id === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const onSuccessfulLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 1 });
    navigate('/'); // Use navigate instead of history.replace
  };

  const onFailedLogin = errorMessage => {
    setErrorMsg(errorMessage);
  };

  const onSubmitLogin = async event => {
    event.preventDefault();
    const userDetails = { username, password };
    const api = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(api, options);
    const data = await response.json();
    if (response.ok) {
      onSuccessfulLogin(data.jwt_token);
    } else {
      onFailedLogin(data.error_msg);
    }
  };

  if (Cookies.get('jwt_token')) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-bg">
      <form onSubmit={onSubmitLogin} className="login-form">
        <h1 className="login-heading">Login</h1>
        <label htmlFor="username">USERNAME</label>
        <input
          id="username"
          type="text"
          onChange={onChangeHandler}
          value={username}
        />
        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type="password"
          onChange={onChangeHandler}
          value={password}
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {errorMsg !== '' && <p className="text-danger">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default Login;
