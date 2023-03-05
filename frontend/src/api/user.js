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
export const getExistsInUserWatchlist = (userID,type,id)=>{
  return Axios().get('/user/watchlist/check', {
    params: {
      userID: userID,
      type: type,
      id: id
    }});
}

export const addToUserWatchlist = (userid,type,id)=>{
  return Axios().post('/user/watchlist/add', {userID : userid,type:type,id:id});
}

export const removeFromUserWatchlist = (userid,type,id)=>{
  return Axios().post('/user/watchlist/remove', {userID : userid,type:type,id:id});
}

