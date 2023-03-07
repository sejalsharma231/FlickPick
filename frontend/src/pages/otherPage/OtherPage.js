import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
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
  Alert
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

import { getUsers, postUser } from "../../api/user"


const OtherPage = () => {

  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openSuccess, setSuccess] = useState(false);
  const [openError, setError] = useState(false);

  const onSuccess = () => {
    setSuccess(true);
  };
  const onError = () => {
    setError(true);
  };
  const handleCloseSB = () => {
    setSuccess(false);
    setError(false);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };


  function handleClick() {
    navigate("/");
  }

  const onSubmit = () => {
    getUsers()
      .then(({ data }) => {
        // accessing the document markdown
        setRows(data);
      })
      .catch((error) => {
        // implement error code
        console.log(error);
      })
  };

  useEffect(() => {
    onSubmit();
  }, []);


  return (
    <div>
      <Grid container direction="column" spacing={2}>
        <Grid item container spacing={2} justifyContent="space-between">
          <Grid item>
            <IconButton onClick={handleClick}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => setDialogOpen(true)}>Create</Button>
          </Grid>
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow >
                  <TableCell>ID</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.userID}
                    </TableCell>
                    <TableCell align="right">{row.firstName}</TableCell>
                    <TableCell align="right">{row.lastName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <CreateDialog
            open={dialogOpen}
            onClose={closeDialog}
            onSubmit={onSubmit}
            onSuccess={onSuccess}
            onError={onError}
          />
        </Grid>
      </Grid>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSB}>
        <Alert onClose={handleCloseSB} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseSB}>
        <Alert onClose={handleCloseSB} severity="error" sx={{ width: '100%' }}>
          Something went wrong!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default OtherPage;





  const CreateDialog = ({
    open,
    onClose,
    onSubmit,
    onSuccess,
    onError
  }) => {
  
  
    const [newUser, setNewUser] = useState({
      firstName: '', lastName: '', password: '',
    });
    const handleChange = (e) => {
      setNewUser({ ...newUser, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      postUser(newUser)
        .then((response) => {
          // handle success
          onSuccess();
        })
        .catch((error) => {
          // handle error
          onError();
          // implement error code
        console.log(error);
        });
      onSubmit();
    };
  
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <TextField id="firstName" label="First Name" variant="filled" defaultValue={newUser.firstName} onChange={handleChange} type="text" size="small" required />
              <TextField id="lastName" label="Last Name" variant="filled" defaultValue={newUser.lastName} onChange={handleChange} type="text" size="small" required />
              <TextField id="password" label="Password" variant="filled" defaultValue={newUser.password} onChange={handleChange} type="text" size="small" required />
              <TextField id="email" label="Email" variant="filled" type="email" size="small" required />
              <button type="submit">
                Submit
              </button>
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