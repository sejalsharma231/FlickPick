import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Button
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
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
        //boolean = false
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
                //accessing the document markdown
                // data.forEach((row) => {
                //     console.log(row);
                // });
                // console.log(data);
                setRows(data);
                //console.log(rows)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    // const rows = [
    //     ["1", "Snow", "Jon", "35"]
    // ];

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
                    {/* <DataGrid>
                        columns = {columns}
                        rows = {rows}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    </DataGrid> */}
                    <MUIDataTable
                        title={"Employee List"}
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