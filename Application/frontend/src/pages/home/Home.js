import React, { useState, useEffect, useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { getExistsInUserWatchlist } from "../../api/user";
import { get } from "lodash";
import { useAuthUser } from "react-auth-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Box,
} from "@mui/material";
import { getMovies, searchMovies, sortMovies, filterMovies } from "../../api/movies"
import MUIDataTable from "mui-datatables";
import { MenuItem } from "@mui/material";

import { SocketContext } from '../../context/SocketContext';

const Home = () => {
  const { socket } = useContext(SocketContext);

  const auth = useAuthUser();
  const [rows, setRows] = useState([]);
  const [inputText, setInputText] = useState("");
  const [sort, setSortText] = useState("");
  var sortText = ""
  const [filterItems, setFilterItems] = useState({ Comedy: true, Action: true, Drama: true, Romance: true })
  useEffect(() => {
    handleFilter()
  }, [filterItems]);

  const handleFilter = () => {
    var filterList = []
    if (filterItems.Comedy) {
      filterList.push("Comedy")
    }
    if (filterItems.Drama) {
      filterList.push("Drama")
    }
    if (filterItems.Romance) {
      filterList.push("Romance")
    }
    if (filterItems.Action) {
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
          style={{ marginLeft: "20px", minWidth: "100px" }}
          variant="outlined"

        >
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            label="Sort By"
            onChange={({ target }) => {
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


        <FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  defaultChecked={true}
                  name="Comedy"
                  onChange={(e) => {
                    setFilterItems({ ...filterItems, [e.target.name]: e.target.checked });
                  }}
                />}
              label="Comedy"
              labelPlacement="end"
            />
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  defaultChecked={true}
                  name="Drama"
                  onChange={(e) => {
                    setFilterItems({ ...filterItems, [e.target.name]: e.target.checked });
                  }}
                />}
              label="Drama"
              labelPlacement="end"

            />
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  defaultChecked={true}
                  name="Action"
                  onChange={(e) => {
                    setFilterItems({ ...filterItems, [e.target.name]: e.target.checked });
                  }}
                />}
              label="Action"
              labelPlacement="end"
            />
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  defaultChecked={true}
                  name="Romance"
                  onChange={(e) => {
                    setFilterItems({ ...filterItems, [e.target.name]: e.target.checked })
                  }}
                />}
              label="Romance"
              labelPlacement="end"
            />
          </FormGroup>
        </FormControl>

      </div>
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
      name: "Genres",
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
      name: "Movie_ID",
      label: "Movie_ID",
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
            <WLButton currentTableData={currentTableData} rowIndex={rowIndex} socket={socket} ></WLButton>
          )
        },
      }
    },
    {
      name: "Recommend",
      label: "Recommend",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (item, { currentTableData, rowIndex }) => {
          return (
            <WLButton2 currentTableData={currentTableData} rowIndex={rowIndex} ></WLButton2>
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
        // implement error code
        console.log(error);
      })
  }, []);


  return (
    <div>
      <Box p={2}>
        <div style={{ height: 400, width: '100%' }}>
          <MUIDataTable
            title={"Movie List"}
            data={rows}
            columns={columns}
            options={options}
          />
        </div>
      </Box>
    </div>
  );
};

export default Home;

const WLButton = ({ currentTableData, rowIndex, socket }) => {
  const auth = useAuthUser();

  const [WLButtonText, setWLButtonText] = useState("Add to Watchlist")
  //const [WLButtonText, setWLButtonText] = useState(false);
  useEffect(() => {
    if (auth()) {
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

  const updateWLButtonText = (text) => setWLButtonText(text)

  //check if the movie already exists in the watchlist, then change functionality to delete in the beginning

  //handle changes based on button click
  const handleAddToWatchlist = (data) => {
    if (WLButtonText == "Add to Watchlist") {
      // addToUserWatchlist(auth().userID, data[6]) //make user id dynamic
      socket.emit('updateWatchlist', ({
        action: "add",
        data: {
          userID: auth().userID,
          mid: data[6]
        }
      }));
      updateWLButtonText("Remove from Watchlist")

    } else if (WLButtonText == "Remove from Watchlist") {
      // removeFromUserWatchlist(auth().userID, data[6])
      socket.emit('updateWatchlist', ({
        action: "remove",
        data: {
          userID: auth().userID,
          mid: data[6]
        }
      }));
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

const WLButton2 = ({ currentTableData, rowIndex }) => {
  const auth = useAuthUser();
  const navigate = useNavigate();
  //handle changes based on button click
  const handleRecommend = (data) => {
    if (data[0]) {
      navigate("/recommend", {
        state: {
          movieName: data[0]
        }
      });
    }

  }

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleRecommend(get(currentTableData[rowIndex], 'data'))}
    >
      Recommend
    </Button>
  )
}


