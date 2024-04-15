import React, { useState, useEffect } from "react";
import "./ThroneRoom.css"
import API from "../../utils/API";
import { useParams } from "react-router-dom";



const styles = {
    throneImg: {
        height: "360px"

    }
}



function ThroneRoom(props) {

    const { id } = useParams();

    const [userImage, setUserImage] = useState("placeholder1.gif")




    useEffect(() => {

        const getUserData = async ()=> {
            const userData = await API.getUser(id)
            const user = await userData.json()
            console.log(user);
         
            // setUserImage(user.sprite[0])
            
        }
  

        getUserData()
    }, []);

    return(
        <div className="thronePosition">
          
            <img src={require("../../images/Throne-Room.png")} alt="Throne Room" style={styles.throneImg}/>

            <div className="charPosition">
                {/* Chacter Sprite here */}
                {/* Currently the img that shows up is hard coded to option 1. need to make it dynamic */}

                <img className="avatar-back-image" src={require("../../images/2-" + userImage)} />
            </div>
        </div>
    )
}

export default ThroneRoom;