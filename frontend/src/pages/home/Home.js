import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { validateUser, addToUserWatchlist, removeFromUserWatchlist, getExistsInUserWatchlist, getUserWatchlist } from "../../api/user";
import { get, update } from "lodash";
import { useAuthUser } from "react-auth-kit";
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
  const  auth  = useAuthUser();
  const [rows, setRows] = useState([]);
  const handleSearch = async () => {
    searchMovies(inputText)
      .then(({ data }) => {
        setRows(data);
        console.log(rows)
      })
      .catch((error) => {
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
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "Released_Year",
      label: "Year",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "Runtime",
      label: "Length",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "Genre",
      label: "Genre",
    },
    {
      name: "Overview",
      label: "Summary",
    },
    {
      name: "IMDB_Rating",
      label: "IMDB Rating",
    },
    {
      name: "id",
      label: "id",
      options: {
        display: false,
      }
    },
    {
      name: "Poster_Link",
      label: "Link",
      options: {
        display: false,
      }
    },
    {
      name: "add_to_watchlist",
      label: "Watchlist",
      options: {
        filter: false,
        sort: false,
        empty: true,
        display: auth() ? true : false,
        customBodyRender: (item, { currentTableData, rowIndex }) => {
          return (
            <WLButton currentTableData={currentTableData} rowIndex={rowIndex} ></WLButton>
          )
        },
      }
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

const WLButton = ({ currentTableData, rowIndex }) => {
  const auth = useAuthUser();

  const [WLButtonText, setWLButtonText] = useState("Add to Watchlist")
  //const [WLButtonText, setWLButtonText] = useState(false);
  useEffect(() => {
    if(auth()){
    getExistsInUserWatchlist(auth().userID, get(currentTableData[rowIndex], 'data')[6])
      .then(({ data }) => {
        if (data.length == 1) {
          setWLButtonText("Remove from Watchlist");
        }
        else {
          setWLButtonText("Add to Watchlist");
        }

      }).catch((error) => {
        console.log(error);
      })
    }
  }
  )

  //console.log(getExists(1,"watchlist",get(currentTableData[rowIndex], 'data')[6]));
  const updateWLButtonText = (text) => setWLButtonText(text)

  //check if the movie already exists in the watchlist, then change functionality to delete in the beginning

  //handle changes based on button click
  const handleAddToWatchlist = (data) =>{
    if (WLButtonText == "Add to Watchlist") {
      addToUserWatchlist(auth().userID, data[6]) //make user id dynamic
      updateWLButtonText("Remove from Watchlist")

    } else if (WLButtonText == "Remove from Watchlist") {
      removeFromUserWatchlist(auth().userID, data[6])
      updateWLButtonText("Add to Watchlist")
    }
  }

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleAddToWatchlist(get(currentTableData[rowIndex], 'data'))}
    >
      {WLButtonText}
    </Button>
  )
}


