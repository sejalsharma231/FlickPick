import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    CircularProgress
} from '@mui/material';
import { useLocation} from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import { recommendLikeThis } from '../../api/user';
import { useAuthUser } from "react-auth-kit";

const Recommender = () => {
    const auth = useAuthUser();
    const location = useLocation();

    const [loading, isloading] = useState(true);

    // get movieName
    const movieName = location.state.movieName;


    const CustomToolbar = () => {
        return (
            <Grid item>
                {/* <Typography variant="body2">
                    Welcome to the User page
                </Typography> */}
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
    ];

    const [rows, setRows] = useState([]);
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
        recommendLikeThis(movieName)
            .then(({ data }) => {
                setRows(data);
                isloading(false);
            })
            .catch((error) => {
                // implement error code
                console.log(error);
            })
    }, []);

    return (
        <div>
                    {loading ? (
                        <Box p={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                      </Box>

                    ) : (
                        <Paper>

                        <Box p={4}>

                        <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <Typography component="h1" variant="h4"><b>Movies Similar to {movieName}</b></Typography>
                                </Grid>
                        <Grid item pb ={2}>
                            <Typography variant="body1">
                                Welcome to the Recommender section. Here is a list of movies recommnded using a combinaion of genres, directors, actors and release date. A similariity score determines which movies will be displayed here.
            
                            </Typography>
                        </Grid>
                    </Grid>
                
                <div style={{ height: 400, width: '100%' }}>
                    <MUIDataTable
                        title = "Movies List"
                        data={rows}
                        columns={columns}
                        options={options}
                    />
                </div>
                </Box>
                </Paper>

                    )}
            
        </div>
    );
};

export default Recommender;