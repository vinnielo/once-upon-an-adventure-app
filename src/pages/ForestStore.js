import React, { useState ,useEffect } from "react";
import StoreTextBox from "../components/TextBox/StoreTextBox"
import { Container } from "../components/Grid"
import InventoryGame from "../components/Inventory/inventoryGame"
import World from '../features/world/index';
import { useParams } from "react-router-dom";
import API from "../utils/API";
import MenuBtns from "../components/MenuBtns/MenuBtns";
import ComingSoon from "../components/ComingSoon/ComingSoon";
import Store from "../components/Store/Store";
import MusicBtn from "../components/SoundBtns/MusicBtn";

function ForestGame() {

    const { id } = useParams();

    const [userAvatar, setUserAvatar] = useState(null)
    const [userAvatarName, setUserAvatarName] = useState(null)
    const [userMoney, setUserMoney] = useState(null)

    useEffect(() => {
        // API.getUserSprite(id).then(user => {
        //     const { sprite } = user.data[0].sprite[0]
       
        //         return setUserAvatar(sprite)
        // }).then(() => {API.getUserSprite(id).then(user => {
        //     const { name } = user.data[0].sprite[0]
       
        //     setUserAvatarName(name)
        // })
            
        // }).then(()=>{
        //     API.getUserSprite(id).then(user => {
        //         const {money} = user.data[0].sprite[0]
        //         return setUserMoney(money)
        //     })
        // })

        const getUserData = async ()=> {
            const userData = await API.getUser(id)
            const user = await userData.json()
            const { sprite, name, money } = user.sprite[0]
         
            setUserAvatarName(name)
            setUserMoney(money)
        }
  

        getUserData()
    }, []);


    return(
        <div>
            <MusicBtn />
                <h1 className="text-center">The Forest</h1>

                {/* Inventory Bar */}
                {/* <InventoryGame /> */}
                {/* <ComingSoon /> */}
                {/* <Store handleStoreBtn={handleStoreBtn}/> */}

                <div>
                    {/* Game Board */}
                        {/* <World avatar={userAvatar} avatarName={userAvatarName}/> */}
                    <div>
                        {/* Dynamically rendered game text appears in text-box */}
                        <StoreTextBox avatarName={userAvatarName}/>
                    </div>
                </div>
                <MenuBtns />
        </div>
    )
}

export default ForestGame;