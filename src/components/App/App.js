import React,{useEffect} from 'react';

import {useDispatch} from 'react-redux';

import GlobalStyle from './GlobalStyles';

import ArtistRoute from './ArtistRoute';

import {
  BrowserRouter as Router,
  Switch, Route, Redirect,
} from 'react-router-dom';

import {
   requestAccessToken,
   receiveAccessToken, 
   receiveAccessTokenError} from '../../actions';

const DEFAULT_ARTIST_ID = '4VMYDCV2IEDYJArk749S6m';

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestAccessToken());

    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveAccessToken(json.access_token));
      })
      .catch((err) => {
        dispatch(receiveAccessTokenError());
      });
  }, []);

  return (
    <>
      <GlobalStyle/>
      <Router>
        <Switch>
          <Route path='/artists/:id'>
            <ArtistRoute/>
          </Route>
          <Route exact path='/'>
            <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`}/>
          </Route>
        </Switch>
      </Router>
   </>
  );
};

export default App;
