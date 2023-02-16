import React from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

const Home = () => {
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
            </Paper>
        </div>
    );
};

export default Home;