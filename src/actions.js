export const requestAccessToken = () => ({
    type: "REQUEST_ACCESS_TOKEN",
  });
  
  export const receiveAccessToken = (token) => ({
    type: "RECEIVE_ACCESS_TOKEN",
    token,
  });
  
  export const receiveAccessTokenError = () => ({
    type: "RECEIVE_ACCESS_TOKEN_ERROR",
  });

  export const requestArtistInfo = () => ({
    type: "REQUEST_ARTIST_INFO",
  });
  
  export const receiveArtistInfo = (data) => ({
    type: "RECEIVE_ARTIST_INFO",
    data,
  });
  
  export const receiveArtistInfoError = () => ({
    type: "RECEIVE_ARTIST_INFO_ERROR",
  });