import React,{useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import{fetchArtistProfile} from '../../helpers/api-helpers';
import styled from 'styled-components';

import {
    requestArtistInfo,
    receiveArtistInfo,
    receiveArtistInfoError, 
    } from '../../actions';

    function abbreviateNumber(value) {
        var newValue = value;
        if (value >= 1000) {
            var suffixes = ["", "k", "m", "b","t"];
            var suffixNum = Math.floor( (""+value).length/3 );
            var shortValue = '';
            for (var precision = 2; precision >= 1; precision--) {
                shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
                var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
                if (dotLessShortValue.length <= 2) { break; }
            }
            if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
            newValue = shortValue+suffixes[suffixNum];
        }
        return newValue;
    }

const ArtistRoute = () =>{
    const {id} = useParams()
    const accessToken = useSelector((state) => state.auth.token);
    const currentArtist = useSelector((state) => state.artists.currentArtist);
    const [artistInfo, setArtistInfo] = useState(false)
    const dispatch = useDispatch()

    useEffect( () =>{
        // const callAPI = async () =>{
        //     const data = await fetchArtistProfile(accessToken, id);
        //     return JSON.stringify( data )
        // }
        if(!accessToken){
            return;
        }
        dispatch(requestArtistInfo())
        fetchArtistProfile(accessToken, id)
        .then(data => {
           dispatch(receiveArtistInfo(data))
            setArtistInfo(true)
        })
        .catch(err => dispatch( receiveArtistInfoError() ) )
    },[accessToken]);
    return(
        <>
        {artistInfo ?
         (
        <Wrapper>
             <Avatar src={currentArtist.profile.images[0].url}/>
             <Name>{currentArtist.profile.name}</Name>
             <Followers>
                 <Num>{abbreviateNumber(currentArtist.profile.followers.total)}</Num>
                <span style={{color:'whitesmoke'}}>Followers</span>
             </Followers>
             <Tags>
             <span style={{color:'whitesmoke', fontSize:'60px'}}>Tags</span>
             <Genres>
                <GenreLabel>{currentArtist.profile.genres[0]}</GenreLabel>
                <GenreLabel>{currentArtist.profile.genres[1]}</GenreLabel>
             </Genres>
             </Tags>
        </Wrapper>

         ) : `loading...`}
        </>
    )
}

const Tags = styled.div`
    margin-top: 60px;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    align-items:center;
`;

const GenreLabel = styled.div`
    border-radius: 10px;
    background: lightgray;
    padding: 15px;
    font-size: 30px;
`;

const Genres = styled.div`
    display: flex;
    justify-content:space-around;
    align-items: center;
`;

const Wrapper = styled.div`
    display:flex;
    justify-content: start;
    align-items: center;
    background-color: black;
    height: 100vh;
    flex-direction:column;
`;

const Name = styled.p`
    font-size:100px;
    color: whitesmoke;
    margin-top: 0px;
    padding-top: 0px;
    margin-bottom: 0px;
    padding-bottom: 0px;
`;

const Followers = styled.span`
    font-size:40px;
    display:flex;
    margin-top: 0px;
    padding-top: 0px;
`;
const Num = styled.span`
    color: fuchsia;
    font-weight: 900;
    margin-right: 15px;
`;

const Avatar = styled.img`
  vertical-align: middle;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin-bottom: 0px;
  padding-bottom: 0px;

`;

export default ArtistRoute;