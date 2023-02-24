// put all api calls regarding the user page and its functionalties in here

import Axios from '../Axios';

export const postUser = (newUser) => {
  console.log(newUser)
    return Axios().post('/user', newUser);
  };


export const getUsers = () => {
  return Axios().get('/user');
};

export const validateUser = (credentials) => {
  //console.log("user: " + newUser)
  return Axios().post('/user/validate', credentials);
}

export const getUserWatchlist = (userid)=>{
  return Axios().get('/user/watchlist', {
    params: {
      userID: userid
    }});
}

export const addToUserWatchlist = (userid,type,movieID)=>{
  return Axios().post('/user/watchlist', {
    params: {
      userID: userid,
      type: type,
      id : movieID
    }});
}

