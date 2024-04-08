import React, { useState, useEffect } from "react";
// import { Container } from "../components/Grid"
import InventoryGame from "../components/Inventory/inventoryGame";
import CastleWorld from "../features/world/CastleWorld";
import CastleWorldGuardMoved from "../features/world/CastleWorldGuardMoved";
// import Player from '../features/player';
import { useParams } from "react-router-dom";
import API from "../utils/API";
import MenuBtns from "../components/MenuBtns/MenuBtns";

function CastleGame() {
  const { id } = useParams();

  const [userAvatar, setUserAvatar] = useState(null);
  const [userAvatarName, setUserAvatarName] = useState(null);
  const [guardTalk, setGuardTalk] = useState(null);

  useEffect(() => {
    
    const getUserData = async () => {
        const userData = await API.getUser(id);
        const user = await userData.json();
        const { sprite, name, permit } = user.sprite[0];
  
        setUserAvatar(sprite);
        setUserAvatarName(name);
        setGuardTalk(permit)
      };
  
      getUserData();
  }, []);

  function renderCastle() {
    switch (guardTalk) {
      case false:
        return <CastleWorld avatar={userAvatar} avatarName={userAvatarName} />;
      case true:
        return (
          <CastleWorldGuardMoved
            avatar={userAvatar}
            avatarName={userAvatarName}
          />
        );
    }
  }

  return (
    <div>
      <h1 className="text-center">The Castle</h1>

      <div>
        {/* Game Board */}
        {renderCastle()}
        <div>{/* Dynamically rendered game text appears in text-box */}</div>
      </div>
      <MenuBtns />
    </div>
  );
}

export default CastleGame;
