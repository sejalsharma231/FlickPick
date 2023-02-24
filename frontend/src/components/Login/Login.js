import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { validateUser } from "../../api/user";


export default function Login({setToken}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    validateUser({email,password})
      .then((response) => {
      })
      .catch((error) => {
      });
  };

  return (
    <div sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1>Please Log In</h1>
      <form>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}