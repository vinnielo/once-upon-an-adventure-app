import React, { useState, useEffect } from "react";
import Player from "../player";
import Map from "../map";
import API from "../../utils/API";
import { useParams } from "react-router-dom";
import { Forest } from "../../data/maps/1";
import store from "../../config/store";
import MusicBtn from "../../components/SoundBtns/MusicBtn";

//creates a game map for the initial forest map before the thief moves
function ForestWorld(props) {
  let tiles = Forest;

  const { id } = useParams();
  store.dispatch({
    type: "ADD_TILES",
    payload: {
      tiles,
    },
  });
  const [userAvatar, setUserAvatar] = useState(null);
  useEffect(() => {
    API.UpdateSpritePlace("forest", id).then(() => {});
    // API.getUserSprite(id).then(user => {
    //     const { sprite } = user.data[0].sprite[0]
    //     return setUserAvatar(sprite)
    // })

    // const getData = async () => {
    //   const userData = await API.getUser(id);
    //   const user = await userData.json();

    //   setUserAvatar(user.sprite[0]);
    // };
    
    // getData();
}, []);

console.log(props);
  return (
    <div
      id="world-container"
      style={{
        position: "relative",
        width: "968px",
        top: "35%",
        // marginTop: '50px',
        marginLeft: "3px",
        border: "4px solid black",
        borderRadius: "5px",
      }}
    >
      <MusicBtn />
      <Map />
      <Player avatar={props.avatar} avatarName={props.avatarName} />
    </div>
  );
}

export default ForestWorld;
