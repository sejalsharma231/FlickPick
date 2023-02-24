// put all api calls regarding the user page and its functionalties in here

import Axios from '../Axios';

export const postUser = (newUser) => {
  console.log(newUser)
    return Axios().post('/user', newUser);
  };


export const getUsers = () => {
  return Axios().get('/user');
};

export const validateUser = (fn, ln, p) => {
  //console.log("user: " + newUser)
  return Axios().get('/user/validate', { params: {firstName : fn, lastName : ln, password : p}})
}

  export const getUserWatchlist = (userid)=>{
    return Axios().get('/user/watchlist', {
      params: {
        userID: userid
      }});
  }
