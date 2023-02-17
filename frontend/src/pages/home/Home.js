import React, { useState, useEffect } from "react";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import { validateUser } from "../../api/user";
import {
  Box,
  Typography,
  Link,
  Paper,
  Button,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
  TextField,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const Home = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openSuccess, setSuccess] = useState(false);
  const [openError, setError] = useState(false);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <Button onClick={() => setDialogOpen(true)}>Login</Button>
      </div>
      <CreateDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onError={() => setError(true)}
      />
      <Snackbar
        open={openError}
        autoHideDuration={6000}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Something went wrong!
        </Alert>
      </Snackbar>
      <Paper>
        <Box p={4}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography component="h1" variant="h4">
                <b>Home</b>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Welcome to the home page. Take a look around!
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                <Link to="/otherPage" component={RouterLink}>
                  Add Users
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default Home;

const CreateDialog = ({ open, onClose, onError }) => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    password: '',
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateUser(newUser.firstName, newUser.lastName, newUser.password)
      .then((response) => {
        navigate("/otherPage");
      })
      .catch((error) => {
        // handle error
        onError();
      });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              id="firstName"
              label="First Name"
              variant="filled"
              defaultValue={newUser.firstName}
              onChange={handleChange}
              type="text"
              size="small"
              required
            />
            <TextField
              id="lastName"
              label="Last Name"
              variant="filled"
              defaultValue={newUser.lastName}
              onChange={handleChange}
              type="text"
              size="small"
              required
            />
            <TextField
              id="password"
              label="Password"
              variant="filled"
              defaultValue={newUser.password}
              onChange={handleChange}
              type="text"
              size="small"
              required
            />
            <button type="submit" >Submit</button>
          </FormControl>
        </form>
      </DialogContent>
      <div>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
    </Dialog>
  );
};
