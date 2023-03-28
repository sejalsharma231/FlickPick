import React, { useState } from "react";
import { validateUser, postUser } from "../../api/user";
import { useSignIn } from "react-auth-kit";
import {
  Tabs,
  Tab,
  Box,
  FormControl,
  TextField,
  Button,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  VisibilityOff,
  Visibility,
} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";


export default function Login() {


  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>


      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }} pt={6}>
        {(value === 0) ? (
          <LoginComponent />
        ) : (
          <RegisterComponent />
        )}
      </Box>


    </div>
  )
}
const LoginComponent = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };
  const signIn = useSignIn();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [signupError, setSignupError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignupError(null);
    validateUser(credentials)
      .then((response) => {
        signIn({
          token: response.data.token,
          expiresIn: 10,
          tokenType: "Bearer",
          authState: { userID: response.data.userID }

        });
        navigate("/");

      })
      .catch((error) => {
        setSignupError("Error! Invalid credentials")

      });
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'

    }}>
      <h1>Please Log In</h1>
      {signupError && (
        <Typography color='error'>
          {signupError}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            id="email"
            label="Email"
            variant="filled"
            defaultValue={credentials.email}
            onChange={handleChange}
            type="text"
            size="small"
            required
          />
          <FormControl variant="filled">
            <InputLabel htmlFor="password">Password *</InputLabel>
            <FilledInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              defaultValue={credentials.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button type="submit" variant="contained">Submit</Button>
        </FormControl>
      </form>
    </div>
  )

}
const RegisterComponent = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [showPassword, setShowPassword] = React.useState(false);
  const [signupError, setSignupError] = useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [newUser, setNewUser] = useState({
    firstName: '', lastName: '', password: '', email: '',
  });
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignupError(null);
    postUser(newUser)
      .then((response) => {
        signIn({
          token: response.data.token,
          expiresIn: 10,
          tokenType: "Bearer",
          authState: { userID: response.data.userID }

        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error)
        setSignupError("Error! Email in use");
      });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1>Sign Up</h1>
      {signupError && (
        <Typography color='error'>
          {signupError}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl>
          <TextField id="firstName" label="First Name" variant="filled" defaultValue={newUser.firstName} onChange={handleChange} type="text" size="small" required />
          <TextField id="lastName" label="Last Name" variant="filled" defaultValue={newUser.lastName} onChange={handleChange} type="text" size="small" required />
          <TextField id="email" label="Email" variant="filled" defaultValue={newUser.email} onChange={handleChange} type="email" size="small" required />
          <FormControl variant="filled">
            <InputLabel htmlFor="password">Password *</InputLabel>
            <FilledInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              defaultValue={newUser.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </FormControl>
      </form>
    </div>
  );

}
