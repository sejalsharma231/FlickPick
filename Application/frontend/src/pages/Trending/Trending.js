import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    ButtonBase,
    Grid,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { SocketContext } from '../../context/SocketContext';
import { getTrendingMovies } from '../../api/movies';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const Trending = () => {
    const { socket } = useContext(SocketContext);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getTrendingMovies()
            .then(({ data }) => {
                setMovies(data);
            })
            .catch((error) => {
                // implement error code
                console.log(error);
            })
    }, []);

    useEffect(() => {
        socket.on('updated', (data) => {
            setMovies(data);
        })
        return () => {
            socket.off('updated');
        };
    }, [socket]);


    return (
        <div>
            <Grid pt={2} container spacing={2} >
                {movies.map((movie, i) => {
                    return (
                        <Grid item xs={12} md={6} lg={4} key={movie.Movie_ID} p={1} >
                            <Grid container >
                                <Grid item xs={4}>
                                    <ButtonBase sx={{ width: 128, height: 128 }}>
                                        <Img alt="complex" src={movie.Poster_Link} />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={8} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1" component="div">
                                                {i + 1}. {movie.Series_Title}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                {movie.Overview}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {movie.Genres}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <div style={{ display: 'flex' }}>
                                            <WhatshotIcon color='secondary' />
                                            <Typography variant="subtitle1" component="div">
                                                {movie['count(*)']}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
};

export default Trending;