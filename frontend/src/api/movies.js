// put all api calls regarding the movies page and its functionalties in here

import Axios from '../Axios';

export const getMovies = () => {
    return Axios().get('/movies');
};

export const searchMovies = (s) => {
    console.log(s)
    return Axios().get(`/movies/search/data?name=${s}`);
};
