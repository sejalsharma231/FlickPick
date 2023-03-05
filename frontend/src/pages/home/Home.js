import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { validateUser, addToUserWatchlist, removeFromUserWatchlist, getExistsInUserWatchlist, getUserWatchlist } from "../../api/user";
import { get, update } from "lodash";
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openError, setError] = useState(false);
  
  
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
        label: "Add to Watchlist",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (item, {currentTableData, rowIndex}) => {
            return (
              <WLButton currentTableData = {currentTableData} rowIndex = {rowIndex} ></WLButton>
              )
            },
          }
        }
      ];
      
      function getExists (userID, type, id) {
        getExistsInUserWatchlist(userID,"watchlist",id)
        .then(({ data }) => {
          if(data.length == 1){
            console.log("remove");
            return "Remove from Watchlist"
          }
          else{
            console.log("add");
            return "Add to Watchlist";
          }
          
        }).catch((error)=>{
          console.log(error);
        })
      }
      
      const WLButton = ({currentTableData, rowIndex}) => {
        const [WLButtonText, setWLButtonText] = useState("Add to Watchlist")
        //const [WLButtonText, setWLButtonText] = useState(false);
        useEffect(()=>{
          getExistsInUserWatchlist(1,"watchlist",get(currentTableData[rowIndex], 'data')[6])
          .then(({ data }) => {
            if(data.length == 1){
              console.log("remove");
              setWLButtonText("Remove from Watchlist")
            }
            else{
              console.log("add");
              setWLButtonText("Add to Watchlist");
            }
            
          }).catch((error)=>{
            console.log(error);
          })
        }
        )

        //console.log(getExists(1,"watchlist",get(currentTableData[rowIndex], 'data')[6]));
        const updateWLButtonText = (text) => setWLButtonText(text)
        
        //check if the movie already exists in the watchlist, then change functionality to delete in the beginning
        
        // getExistsInUserWatchlist("1","watchlist",get(currentTableData[rowIndex], 'data')[6])
        // .then(({ data }) => {
        //   if(data.length == 1){
        //   updateWLButtonText("Remove from Watchlist")
        //   }
        // })
        
        //handle changes based on button click
        function handleAddToWatchlist(data) {
          if (WLButtonText == "Add to Watchlist") {
            addToUserWatchlist("1","watchlist",data[6]) //make user id dynamic
            updateWLButtonText("Remove from Watchlist")
            
          } else if (WLButtonText == "Remove from Watchlist") {
            removeFromUserWatchlist("1","watchlist",data[6])
            updateWLButtonText("Add to Watchlist")
          }
        }
        
        return(
          <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddToWatchlist(get(currentTableData[rowIndex], 'data'))}
          >
          {WLButtonText}
          </Button>
          )
        }
        
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
          {/* <DataGrid>
            columns = {columns}
            rows = {rows}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          </DataGrid> */}
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
        
        const CreateDialog = ({ open, onClose, onError }) => {
          const navigate = useNavigate();
          
          const [credentials, setCredentials] = useState({
            email: '',
            password: '',
          });
          
          const handleChange = (e) => {
            setCredentials({ ...credentials, [e.target.id]: e.target.value });
          };
          
          const handleSubmit = (e) => {
            e.preventDefault();
            validateUser(credentials)
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
            id="email"
            label="Email"
            variant="filled"
            defaultValue={credentials.email}
            onChange={handleChange}
            type="text"
            size="small"
            required
            />
            <TextField
            id="password"
            label="Password"
            variant="filled"
            defaultValue={credentials.password}
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
          