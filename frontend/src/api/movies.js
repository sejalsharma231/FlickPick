// put all api calls regarding the movies page and its functionalties in here

import Axios from '../Axios';

export const getMovies = () => {
    return Axios().get('/movies');
  };