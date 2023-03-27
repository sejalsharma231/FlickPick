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

export const getUserWatchlist = ({ userID }) => {
  return Axios().get('/user/watchlist', {
    params: {
      userID
    }
  });
}
export const getExistsInUserWatchlist = (userID, mid) => {
  return Axios().get('/user/watchlist/check', {
    params: {
      userID,
      mid
    }
  });
}

export const addToUserWatchlist = (userID, mid) => {
  return Axios().post('/user/watchlist/add', { userID, mid });
}

export const removeFromUserWatchlist = (userID, mid) => {
  return Axios().post('/user/watchlist/remove', { userID, mid });
}

export const recommendLikeThis = (movieName) => {
  return Axios().get('/movies/recommend', {
    params: {
      movieName
    }
  });
}

