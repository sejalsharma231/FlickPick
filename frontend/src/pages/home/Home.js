import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
import { getMovies, searchMovies } from "../../api/movies"
import MUIDataTable from "mui-datatables";


const Home = () => {
  const [rows, setRows] = useState([]);


  const handleSearch = async () => {
    console.log("Clicked " + inputText)
    searchMovies(inputText)
      .then(({ data }) => {
        setRows(data);
        console.log(rows)
      })
      .catch((error) => {
        console.log("didn't work")
        console.log(error);
      })
  }

  const [inputText, setInputText] = useState('');
  const CustomToolbar = ({ displayData }) => {
    return (
      <Grid item>
        <TextField
          label="Search"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
      </Grid>
    );
  }

  const columns = [
    {
      name: "Series_Title",
      label: "Name",
    },
    {
      name: "Released_Year",
      label: "Year",
    },
    {
      name: "Runtime",
      label: "Length",
    },
    {
      name: "Genre",
      label: "Genre",
    }
  ];

  const options = {
    selectableRowsHideCheckboxes: true,
    selectToolbarPlacement: 'none',
    filter: false,
    search: false,
    download: false,
    print: false,
    viewColumns: 'false',
    customToolbar: CustomToolbar
  };

  useEffect(() => {
    getMovies()
      .then(({ data }) => {
        setRows(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);


  return (
    <div>
      <Paper>
        <Box p={4}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography component="h1" variant="h4"><b>Home</b></Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Welcome to the home page. Take a look around!
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                <Link to="/otherPage"
                  component={RouterLink}
                >
                  Add Users
                </Link>
              </Typography>

            </Grid>
          </Grid>
        </Box>
        <div style={{ height: 400, width: '100%' }}>
          <MUIDataTable
            title={"Movie List"}
            data={rows}
            columns={columns}
            options={options}
          />
        </div>
      </Paper>
    </div>
  );
};

export default Home;

