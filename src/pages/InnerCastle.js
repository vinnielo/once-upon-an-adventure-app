import React, { useState ,useEffect } from "react";
import CastleTextBox from "../components/TextBox/CastleTextBox"
import InventoryGame from "../components/Inventory/inventoryGame"
import { useParams } from "react-router-dom";
import API from "../utils/API";
import MenuBtns from "../components/MenuBtns/MenuBtns";
import ThroneRoom from "../components/ThroneRoom/ThroneRoom";
import MusicBtn from "../components/SoundBtns/MusicBtn";
import YouWin from "../components/ComingSoon/YouWin";

function InnerCastle() {

    const { id } = useParams();

    const [userAvatar, setUserAvatar] = useState(null)
    const [userAvatarName, setUserAvatarName] = useState(null)
    const [userMoney, setUserMoney] = useState(null)

    useEffect(() => {
      

        const getUserData = async () => {
            const userData = await API.getUser(id);
            const user = await userData.json();
            const { sprite, name, money } = user.sprite[0];
      
            setUserAvatar(sprite);
            setUserAvatarName(name);
            setUserMoney(money)
          };
      
          getUserData();
    }, []);

    return(
        <div>
            <MusicBtn />
                <h1 className="text-center">The Throne Room</h1>

                <ThroneRoom />

                <div>
                    <div>
                        {/* Dynamically rendered game text appears in text-box */}
                        <CastleTextBox avatarName={userAvatarName}/>
                    </div>
                </div>
                <MenuBtns />
        </div>
    )
}

export default InnerCastle;