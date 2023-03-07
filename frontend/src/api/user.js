// put all api calls regarding the user page and its functionalties in here

import Axios from '../Axios';

export const postUser = (newUser) => {
    return Axios().post('/user', newUser);
  };


export const getUsers = () => {
  return Axios().get('/user');
};

export const validateUser = (credentials) => {
  return Axios().post('/user/validate', credentials);
}

  export const getUserWatchlist = (userid)=>{
    return Axios().get('/user/watchlist', {
      params: {
        userID: userid
      }});
  }
