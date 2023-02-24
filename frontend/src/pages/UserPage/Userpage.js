import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { getUserWatchlist } from '../../api/user';


const User = () => {
    const CustomToolbar = ({ displayData }) => {
        return (
            <Grid item>
                <Typography variant="body2">
                    Welcome to the User page
                </Typography>
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
        getUserWatchlist(1)
            .then(({ data }) => {
                setRows(data);
                console.log(data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <div>
            <Grid item>
                <Typography variant="body2">
                    <Link to="/"
                        component={RouterLink}
                    >
                        Logout
                    </Link>
                </Typography>

            </Grid>
            <Paper>
                <Box p={4}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <Typography component="h1" variant="h4"><b>User</b></Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                Welcome to the User page
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <div style={{ height: 400, width: '100%' }}>
                    <MUIDataTable
                        title={"Watch List"} // only print if in the watchlist
                        data={rows}
                        columns={columns}
                        options={options}
                    />
                </div>
            </Paper>
        </div>
    );
};

export default User;