import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import {
  Paper,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { getMovies, searchMovies, sortMovies, filterMovies } from "../../api/movies"
import MUIDataTable from "mui-datatables";
import { MenuItem } from "@mui/material";

const Home = () => {
  const [rows, setRows] = useState([]);
  const [inputText, setInputText] = useState('');
  const [sort, setSortText] = useState("");
  const [checked, setChecked] = useState(true);
  var sortText = ""
  var Comedy = true
  var Drama = true
  var Action = true
  var Romance = true

  const toggleComedy = () => {
    Comedy = !Comedy
  }
  const toggleAction = () => {
    Action = !Action
  }
  const toggleDrama = () => {
    Drama = !Drama
  }
  const toggleRomance = () => {
    Romance = !Romance
  }

  const handleFilter = async () => {
    var filterList = []
    if (Comedy) {
      filterList.push("Comedy")
    }
    if (Drama) {
      filterList.push("Drama")
    }
    if (Romance) {
      filterList.push("Romance")
    }
    if (Action) {
      filterList.push("Action")
    }
    filterMovies(filterList, sortText, inputText).then(({ data }) => {
      setRows(data);
    })
      .catch((error) => {
        // implement error code
        console.log(error);
      })
  }

  const handleSearch = async () => {
    searchMovies(inputText)
      .then(({ data }) => {
        setRows(data);
      })
      .catch((error) => {
        // implement error code
        console.log(error);
      })
  }

  const handleSort = async () => {
    sortMovies(sortText, inputText)
      .then(({ data }) => {
        setRows(data);
      })
      .catch((error) => {
        // implement error code
        console.log(error);
      })
  }

  const CustomToolbar = ({ displayData }) => {
    document.body.style.color = 'black';
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <TextField
          label="Search"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          size="small"
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>

        <FormControl
          size="small"
          style={{ marginLeft: "20px", minWidth:"100px" }}
          variant="outlined"
           
        >
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            label="Sort By"
            onChange={({ target }) => {
              console.log(target.value);
              setSortText(target.value);
              sortText = target.value;
              handleSort();
            }
            }
          >
            <MenuItem value={"Name"}>Name</MenuItem>
            <MenuItem value={"Year"}>Year</MenuItem>
            <MenuItem value={"Length"}>Length</MenuItem>
          </Select>
        </FormControl>


        {/* <FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              defaultChecked
              value="end"
              control={
                <Checkbox
                  defaultChecked={checked}
                  onChange={() => {
                    toggleComedy();
                    handleFilter();
                  }}
                />}
              label="Comedy"
              labelPlacement="end"

            />
            <FormControlLabel
              defaultChecked
              value="end"
              control={
                <Checkbox
                  defaultChecked={checked}
                />}
              label="Drama"
              labelPlacement="end"
              onChange={() => {
                toggleDrama();
                handleFilter();
              }}
            />
            <FormControlLabel
              defaultChecked
              value="end"
              control={
                <Checkbox
                  defaultChecked={checked}
                />}
              label="Action"
              labelPlacement="end"
              onChange={() => {
                toggleAction();
                handleFilter();
              }}
            />
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  defaultChecked={checked}
                />}
              label="Romance"
              labelPlacement="end"
              onChange={() => {
                toggleRomance();
                handleFilter();
              }}
            />
          </FormGroup>
        </FormControl> */}

      </div>
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
    },
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
        // implement error code
        console.log(error);
      })
  }, []);


  return (
    <div>
      <Paper>
        {/* <Box p={4}>
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
        </Box> */}
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

