import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Typography
} from '@mui/material';
import MUIDataTable from "mui-datatables";
import { getUserWatchlist } from '../../api/user';
import { useAuthUser } from "react-auth-kit";

const User = () => {
    const auth = useAuthUser();
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
            name: "Runtime",
            label: "Length",
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
            name: "Postr_Link",
            label: "Link",
            options: {
                display: false,
            }
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
        getUserWatchlist(auth().userID)
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
                <Grid container direction="column" spacing={1} pb={2}>
                    <Grid item>
                        <Typography component="h1" variant="h4"><b>Welcome to your page</b></Typography>
                    </Grid>
                </Grid>

                <div style={{ height: 400, width: '100%' }}>
                    <MUIDataTable
                        title={"Watch List"} // only print if in the watchlist
                        data={rows}
                        columns={columns}
                        options={options}
                    />
                </div>
            </Box>
        </div>
    );
};

export default User;