import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { handleKeyDown, observeImpassable } from "./movement";
import "../../components/TextBox/TextBox.css";
import API from "../../utils/API";
import Exposition from "../../components/Exposition";
import WizardExposition from "../../components/Exposition/wizardExposition";
import "./gamePlay.css";
import CanvasSnake from "../../components/CanvasSnake";
import ThiefExposition from "../../components/Exposition/thiefExposition";
import ThiefExposition2 from "../../components/Exposition/thiefExposition2";
import InventoryGame from "../../components/Inventory/inventoryGame";
import CanvasHangman from "../../components/CanvasHangman";

const handleMovement = (player) => {
  return player;
};
//variables related to the players game progress
let userName = "You";
let firstGuardTalk = "true";
let firstOrcTalk = "true";
let hasPermit = "false";
let firstJaceTalk = "true";
let firstThiefTalk = "true";
let varStoryString = "";
let varMoney = 0;
let varLives = 3;
let varLivesImg = "";
let varHeartClass = "";

function Player(props) {
  const { id } = useParams();

  //creates a state object for player
  const [gameState, setGameState] = useState({
    guardButtons: "hide",
    jaceButtons: "hide",
    snakeMinigame: "hide",
    thiefButtons: "hide",
    thiefButtons2: "hide",
    hangmanMinigame: "hide",
    storyString: "",
    stateMoney: "",
    stateLives: "",
    stateLivesImg: require("../../images/threeHearts.png"),
    stateHeartClass: "heart-three",
  });

  //applies event listener when compenent mounts
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      handleKeyDown(
        e,
        guardTalking,
        orcTalking,
        jaceTalking,
        thiefTalking,
        returnToWorldMap,
        enterShop,
        enterCastle
      );
    });
  }, []);

  //api call to retreive user data from the database
  useEffect(() => {
    const getUserData = async () => {
      const userData = await API.getUser(id);
      const user = await userData.json();

      const {
        name,
        place,
        apiFirstGuardTalk,
        apiFirstOrcTalk,
        permit,
        apiFirstJaceTalk,
        apiFirstThiefTalk,
        money,
        lives,
      } = user.sprite[0];

      userName = name;
      firstGuardTalk = apiFirstGuardTalk;
      firstOrcTalk = apiFirstOrcTalk;
      firstJaceTalk = apiFirstJaceTalk;
      firstThiefTalk = apiFirstThiefTalk;
      hasPermit = permit;
      varMoney = money;
      varLives = lives;
      heart();

      if (place === "castle") {
        if (firstGuardTalk === true) {
          varStoryString =
            userName +
            " follows the path to the castle. Up close it is even more marvelous. " +
            userName +
            " notices a guard in front of the castle, glittering in the sunlight in their armor. " +
            userName +
            " also thinks they hear a voice very faintly saying '...find me...I'll give you hearts...' ";
          setGameState({
            ...gameState,
            storyString: varStoryString,
            stateMoney: varMoney,
            stateLives: varLives,
            stateLivesImg: varLivesImg,
            stateHeartClass: varHeartClass,
          });
        }
        if (firstGuardTalk === false) {
          varStoryString = userName + " walks up to the castle once again. ";
          setGameState({
            ...gameState,
            storyString: varStoryString,
            stateMoney: varMoney,
            stateLives: varLives,
            stateLivesImg: varLivesImg,
            stateHeartClass: varHeartClass,
          });
        }
      }

      if (place === "forest") {
        if (firstThiefTalk === true) {
          varStoryString =
            userName +
            " enters the forest. There are trees on either side of them, and in the distance, " +
            userName +
            " can see a shop! But in the path, inbetween " +
            userName +
            " and the shop is a person... ";
          setGameState({
            ...gameState,
            storyString: varStoryString,
            stateMoney: varMoney,
            stateLives: varLives,
            stateLivesImg: varLivesImg,
            stateHeartClass: varHeartClass,
          });
        }
        if (firstThiefTalk === false) {
          varStoryString =
            userName +
            " enters the forest. " +
            userName +
            " notices Thief Anna watching them warily. ";
          setGameState({
            ...gameState,
            storyString: varStoryString,
            stateMoney: varMoney,
            stateLives: varLives,
            stateLivesImg: varLivesImg,
            stateHeartClass: varHeartClass,
          });
        }
      }

      if (place === "cliff") {
        if (firstJaceTalk === true) {
          varStoryString =
            userName +
            " emerges from the path and looks around. There is a cliff that looks out over mountains. At the edge of the cliff is a magical looking person. " +
            userName +
            " wonders if they should go up and talk to them... ";
          setGameState({
            ...gameState,
            storyString: varStoryString,
            stateMoney: varMoney,
            stateLives: varLives,
            stateLivesImg: varLivesImg,
            stateHeartClass: varHeartClass,
          });
        }
        if (firstJaceTalk === false) {
          varStoryString =
            userName +
            " emerges from the path and looks out at the mountains and Wizard Jace. ";
          setGameState({
            ...gameState,
            storyString: varStoryString,
            stateMoney: varMoney,
            stateLives: varLives,
            stateLivesImg: varLivesImg,
            stateHeartClass: varHeartClass,
          });
        }
      }
    };

    getUserData();

    // API.getUserSprite(id).then((user) => {
    //   const {
    //     name,
    //     place,
    //     apiFirstGuardTalk,
    //     apiFirstOrcTalk,
    //     permit,
    //     apiFirstJaceTalk,
    //     apiFirstThiefTalk,
    //     money,
    //     lives,
    //   } = user.data[0].sprite[0];

    //   userName = name;
    //   firstGuardTalk = apiFirstGuardTalk;
    //   firstOrcTalk = apiFirstOrcTalk;
    //   firstJaceTalk = apiFirstJaceTalk;
    //   firstThiefTalk = apiFirstThiefTalk;
    //   hasPermit = permit;
    //   varMoney = money;
    //   varLives = lives;
    //   heart();

    //   //following logic determines how NPC's will behave when interacted with based on location & game progress
    //   if (place === "castle") {
    //     if (firstGuardTalk === true) {
    //       varStoryString =
    //         userName +
    //         " follows the path to the castle. Up close it is even more marvelous. " +
    //         userName +
    //         " notices a guard in front of the castle, glittering in the sunlight in their armor. " +
    //         userName +
    //         " also thinks they hear a voice very faintly saying '...find me...I'll give you hearts...' ";
    //       setGameState({
    //         ...gameState,
    //         storyString: varStoryString,
    //         stateMoney: varMoney,
    //         stateLives: varLives,
    //         stateLivesImg: varLivesImg,
    //         stateHeartClass: varHeartClass,
    //       });
    //     }
    //     if (firstGuardTalk === false) {
    //       varStoryString = userName + " walks up to the castle once again. ";
    //       setGameState({
    //         ...gameState,
    //         storyString: varStoryString,
    //         stateMoney: varMoney,
    //         stateLives: varLives,
    //         stateLivesImg: varLivesImg,
    //         stateHeartClass: varHeartClass,
    //       });
    //     }
    //   }

    //   if (place === "forest") {
    //     if (firstThiefTalk === true) {
    //       varStoryString =
    //         userName +
    //         " enters the forest. There are trees on either side of them, and in the distance, " +
    //         userName +
    //         " can see a shop! But in the path, inbetween " +
    //         userName +
    //         " and the shop is a person... ";
    //       setGameState({
    //         ...gameState,
    //         storyString: varStoryString,
    //         stateMoney: varMoney,
    //         stateLives: varLives,
    //         stateLivesImg: varLivesImg,
    //         stateHeartClass: varHeartClass,
    //       });
    //     }
    //     if (firstThiefTalk === false) {
    //       varStoryString =
    //         userName +
    //         " enters the forest. " +
    //         userName +
    //         " notices Thief Anna watching them warily. ";
    //       setGameState({
    //         ...gameState,
    //         storyString: varStoryString,
    //         stateMoney: varMoney,
    //         stateLives: varLives,
    //         stateLivesImg: varLivesImg,
    //         stateHeartClass: varHeartClass,
    //       });
    //     }
    //   }

    //   if (place === "cliff") {
    //     if (firstJaceTalk === true) {
    //       varStoryString =
    //         userName +
    //         " emerges from the path and looks around. There is a cliff that looks out over mountains. At the edge of the cliff is a magical looking person. " +
    //         userName +
    //         " wonders if they should go up and talk to them... ";
    //       setGameState({
    //         ...gameState,
    //         storyString: varStoryString,
    //         stateMoney: varMoney,
    //         stateLives: varLives,
    //         stateLivesImg: varLivesImg,
    //         stateHeartClass: varHeartClass,
    //       });
    //     }
    //     if (firstJaceTalk === false) {
    //       varStoryString =
    //         userName +
    //         " emerges from the path and looks out at the mountains and Wizard Jace. ";
    //       setGameState({
    //         ...gameState,
    //         storyString: varStoryString,
    //         stateMoney: varMoney,
    //         stateLives: varLives,
    //         stateLivesImg: varLivesImg,
    //         stateHeartClass: varHeartClass,
    //       });
    //     }
    //   }
    // });
  }, []);

  //sets the image with correct amount of hearts to inventory bar
  function heart() {
    if (varLives === 3) {
      varLivesImg = require("../../images/threeHearts.png");
      varHeartClass = "heart-three";
    } else if (varLives === 2) {
      varLivesImg = require("../../images/twoHearts.png");
      varHeartClass = "heart-two";
    } else if (varLives === 1) {
      varLivesImg = require("../../images/oneHeart.png");
      varHeartClass = "heart-one";
    }
  }

  //the following functions handle the logic for NPC interactions based on game progress
  function guardTalking() {
    switch (firstGuardTalk) {
      case false:
        if (hasPermit === true) {
          varStoryString +=
            " " +
            userName +
            " decides to speak to Guard Tony. Guard Tony smiles and says 'It looks like you have a permit! Enjoy your visit.' ";
          setGameState({ ...gameState, storyString: varStoryString });
          updateStoryLog();
        }
        if (hasPermit === false) {
          varStoryString +=
            " " +
            userName +
            " decides to speak to Guard Tony. Guard Tony frowns and shakes his head. 'Still no permit?', he says. 'I would try the shopkeeper. He usually has some. His store is in the forest.' ";
          setGameState({ ...gameState, storyString: varStoryString });
          updateStoryLog();
        }
        return;
      case true:
        varStoryString +=
          " " +
          userName +
          " decides to talk to the guard. 'Hello.' says Guard Tony. 'Do you have a permit to enter Castle Richfield?' ";
        setGameState({
          ...gameState,
          guardButtons: "show",
          storyString: varStoryString,
        });
        updateStoryLog();
        return;
      default:
        break;
    }
  }

  function orcTalking() {
    if (firstOrcTalk === false) {
      varStoryString +=
        " " +
        userName +
        " decides to speak to Orc Vinne. 'ALREADY GAVE HEARTS, KICK ROCKS KID!' he says. ";
      setGameState({
        ...gameState,
        storyString: varStoryString,
        stateLivesImg: varLivesImg,
        stateMoney: varMoney,
        stateHeartClass: varHeartClass,
      });
      updateStoryLog();
      // return;
    }
    if (firstOrcTalk === true) {
      if (varLives === 3) {
        varStoryString +=
          " " +
          userName +
          " decides to speak to Orc Vinne. 'YOU ALREADY HAVE FULL HEALTH BUTTHEAD! GET OUT OF HERE!' he says. ";
        setGameState({ ...gameState, storyString: varStoryString });
        updateStoryLog();
      } else {
        varStoryString +=
          " " +
          userName +
          " decides to speak to Orc Vinnie. 'HI' says Orc Vinnie. 'IMMA GIVE YOU A HEART' ";
        //   setGameState({ ...gameState, storyString: varStoryString });
        API.UpdateSpriteFirstOrcTalk(false, id)
          .then(() => {
            console.log("updated OrcTalk");
            firstOrcTalk = false;
          })
          .then(() => {
            let newLives = varLives + 1;

            API.UpdateSpriteLives(newLives, id).then(() => {
              console.log("updated newLives", newLives);
              varLives = newLives;
              heart();
              setGameState({
                ...gameState,
                storyString: varStoryString,
                stateLives: newLives,
                stateLivesImg: varLivesImg,
                stateHeartClass: varHeartClass,
              });
              updateStoryLog();
            });
          });
      }
    }
  }

  function jaceTalking() {
    if (firstJaceTalk === false) {
      varStoryString +=
        " 'Hi " + userName + " did you want to play my math game?' ";
      setGameState({
        ...gameState,
        storyString: varStoryString,
        jaceButtons: "show",
      });
      return;
    }
    if (firstJaceTalk === true) {
      varStoryString +=
        " Wizard Jace says 'Hello " +
        userName +
        " a little birdy told me you were trying to help our kingdom! I can give you money if you play my magical math game!' ";
      setGameState({
        ...gameState,
        storyString: varStoryString,
        jaceButtons: "show",
      });
      API.UpdateSpriteFirstJaceTalk(false, id).then(() => {
        console.log("updated JaceTalk");
        firstJaceTalk = false;
      });
    }
  }

  function thiefTalking() {
    if (firstThiefTalk === true) {
      varStoryString += " Thief Anna grins and says 'GIMMIE YOUR MONEY!' ";
      setGameState({
        ...gameState,
        storyString: varStoryString,
        thiefButtons: "show",
      });
    }
    if (firstThiefTalk === false) {
      varStoryString += " Thief Anna says 'What do you want?' ";
      setGameState({
        ...gameState,
        storyString: varStoryString,
        thiefButtons2: "show",
        thiefButtons: "hide",
      });
    }
  }

  function handleBtnClick(event) {
    // Get the data-value of the clicked button
    const btnType = event.target.attributes.getNamedItem("data-value").value;

    if (btnType === "guardYes") {
      if (hasPermit === true) {
        varStoryString +=
          " " +
          userName +
          " decides to speak to Guard Tony. Guard Tony smiles and says 'It looks like you have a permit! Enjoy your visit' " +
          userName +
          " can choose to enter the castle. ";
        setGameState({
          ...gameState,
          guardButtons: "hide",
          storyString: varStoryString,
        });
        API.UpdateSpriteFirstGuardTalk(false, id).then(() => {
          console.log("updated GuardTalk");
          firstGuardTalk = false;
        });
      }
      if (hasPermit === false) {
        varStoryString +=
          " " +
          userName +
          " says 'Sure! Sure I have a permit!' and tries to smile as innocently as possible. 'LIES? LYING to ME?' Guard Tony says. He is clearly very upset. 'You clearly don't have a permit. Come back when you do!' ";
        setGameState({
          ...gameState,
          guardButtons: "hide",
          storyString: varStoryString,
        });
        API.UpdateSpriteFirstGuardTalk(false, id).then(() => {
          console.log("updated GuardTalk");
          firstGuardTalk = false;
        });

        updateStoryLog();
      }
    }
    if (btnType === "guardNo") {
      API.UpdateSpriteFirstGuardTalk(false, id).then(() => {
        console.log("updated GuardTalk");
        firstGuardTalk = false;
      });
      varStoryString +=
        " " +
        userName +
        " frowns and says 'no'. Guard Tony smiled helpfully 'I would try the shopkeeper. He usually has some. His store is in the forest' ";
      setGameState({
        ...gameState,
        guardButtons: "hide",
        storyString: varStoryString,
      });
      updateStoryLog();
    }
    if (btnType === "jaceYes") {
      varStoryString += " " + userName + " says 'Math? Money? You bet!' ";
      setGameState({
        ...gameState,
        snakeMinigame: "show",
        guardButtons: "hide",
        jaceButtons: "hide",
        storyString: varStoryString,
      });
    }
    if (btnType === "jaceNo") {
      varStoryString +=
        " " + userName + " says, 'Not now, thanks. Maybe later! ";
      setGameState({
        ...gameState,
        jaceButtons: "hide",
        storyString: varStoryString,
      });
      updateStoryLog();
    }
    if (btnType === "thiefYes") {
      varStoryString +=
        " " + userName + " says 'okay!' and hands over all their money.";
      // setGameState({...gameState, thiefButtons: "hide", storyString: varStoryString })
      API.UpdateSpriteFirstThiefTalk(false, id)
        .then(() => {
          console.log("updated thiefTalk");
          firstThiefTalk = false;
        })
        .then(() => {
          API.UpdateSpriteMoney(0, id).then(() => {
            console.log("updated money");
            setGameState({
              ...gameState,
              thiefButtons: "hide",
              storyString: varStoryString,
              stateMoney: 0,
            });
            varMoney = 0;
            updateStoryLog();
          });
        });
    }
    if (btnType === "thiefNo") {
      varStoryString +=
        " " +
        userName +
        " says 'no way!' The thief snickers and says 'Then you must beat me in a game of Hangman!' ";
      setGameState({
        ...gameState,
        thiefButtons: "hide",
        storyString: varStoryString,
        hangmanMinigame: "show",
      });
    }

    if (btnType === "thiefYes2") {
      varStoryString +=
        " " +
        userName +
        " says 'Gimmie your money!' Thief Anna looks shocked for a minute, then says, 'Bring it on!' ";
      setGameState({
        ...gameState,
        thiefButtons2: "hide",
        storyString: varStoryString,
        hangmanMinigame: "show",
      });
    }
    if (btnType === "thiefNo2") {
      varStoryString +=
        " " + userName + " decides to leave Thief Anna alone for now. ";
      setGameState({
        ...gameState,
        thiefButtons2: "hide",
        storyString: varStoryString,
      });
    }
  }

  //following three functions handle page changes
  function returnToWorldMap() {
    window.location.replace("/continue/" + id);
  }

  function enterShop() {
    window.location.replace("/store/" + id);
  }

  function enterCastle() {
    window.location.replace("/throne/" + id);
  }

  //done button for the wizard/snake
  function handleDoneButtonClick(event) {
    //this is points to convert to money

    const btnValue = parseInt(
      event.target.attributes.getNamedItem("data-value").value
    );
    let newMoney = btnValue + varMoney;
    varStoryString +=
      " " +
      "After finishing the Magic Math Game, Wizard Jace says... 'Congrats " +
      userName +
      "! You won " +
      btnValue +
      " gold! Come see me if you want to play again!' ";
    // setGameState({...gameState, storyString: varStoryString, snakeMinigame: "hide", guardButtons: "hide", jaceButtons: "hide"})
    //update api (btnValue, id)
    //update variable
    //Need to do all done here if/ for how much money for points, need to have points show up here

    API.UpdateSpriteMoney(newMoney, id).then(() => {
      console.log("updated NewMoney", newMoney);
      setGameState({
        ...gameState,
        storyString: varStoryString,
        snakeMinigame: "hide",
        guardButtons: "hide",
        jaceButtons: "hide",
        stateMoney: newMoney,
      });
      varMoney = newMoney;
      updateStoryLog();
    });
  }

  function handleHangButtonClick(event) {
    const btnWin = event.target.attributes.getNamedItem("data-value").value;
    if (btnWin === "yes") {
      if (firstThiefTalk === true) {
        varStoryString +=
          " Thief Anna says 'I can't believe you beat me... here's 10 gold, leave me alone! I won't block your way if you come this way again.' ";
        API.UpdateSpriteFirstThiefTalk(false, id)
          .then(() => {
            console.log("updated thiefTalk");
            firstThiefTalk = false;
          })
          .then(() => {
            let newMoney = varMoney + 10;

            API.UpdateSpriteMoney(newMoney, id).then(() => {
              console.log("updated NewMoney", newMoney);
              setGameState({
                ...gameState,
                storyString: varStoryString,
                hangmanMinigame: "hide",
                stateMoney: newMoney,
              });
              varMoney = newMoney;
              updateStoryLog();
            });
          });
      }
      if (firstThiefTalk === false) {
        varStoryString +=
          " Thief Anna says 'I can't believe you beat me... here's 10 gold, leave me alone!' ";
        // setGameState({...gameState, storyString: varStoryString, hangmanMinigame: "hide"})
        //gain 10 gold
        let newMoney = varMoney + 10;

        API.UpdateSpriteMoney(newMoney, id).then(() => {
          console.log("updated NewMoney", newMoney);
          setGameState({
            ...gameState,
            storyString: varStoryString,
            hangmanMinigame: "hide",
            stateMoney: newMoney,
          });
          varMoney = newMoney;
          updateStoryLog();
        });
      }
    }
    if (btnWin === "no") {
      API.UpdateSpriteFirstThiefTalk(false, id).then(() => {
        console.log("updated thiefTalk");
        firstThiefTalk = false;
      });
      varStoryString +=
        " Thief Anna laughs in " +
        userName +
        "'s face 'HA. You LOSE. Gimmie your money! ...But you know what? You put up a good fight. I won't take all of your money - just 10 gold.' " +
        userName +
        " tries to hide their anger and sadness while handing over ten gold.";
      // setGameState({...gameState, storyString: varStoryString, hangmanMinigame: "hide"})
      //lose 10 gold, lose one heart

      let newMoney = varMoney - 10;

      API.UpdateSpriteMoney(newMoney, id)
        .then(() => {
          console.log("updated NewMoney", newMoney);
          //   setGameState({
          //     ...gameState,
          //     storyString: varStoryString,
          //     hangmanMinigame: "hide",
          //     stateMoney: newMoney,
          //   });
          varMoney = newMoney;
        })
        .then(() => {
          let newLives = varLives - 1;

          API.UpdateSpriteLives(newLives, id).then(() => {
            console.log("updated newLives", newLives);
            varLives = newLives;
            if (varLives === 0) {
              window.location.replace("/youlose/" + id);
            } else {
              heart();
              setGameState({
                ...gameState,
                storyString: varStoryString,
                hangmanMinigame: "hide",
                stateMoney: newMoney,
                stateLives: newLives,
                stateLivesImg: varLivesImg,
                stateHeartClass: varHeartClass,
              });
              updateStoryLog();
            }
          });
        });
    }
  }

  function updateStoryLog() {
    API.getUserStory(id).then((user) => {
      const { text } = user.data[0].story[0];
      let newText = text + varStoryString;
      API.UpdateStory(newText, id).then(() => {
        console.log("story updated");
      });
    });
  }

  if (!props.avatar) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {/* <MusicBtn /> */}
      <div
        className="row"
        style={{
          position: "absolute",
          top: props.position[1],
          left: props.position[0],
          backgroundImage: `url('${require("../../assets/sprites/" +
            props.avatar)}')`,
          backgroundPosition: props.spriteLocation,
          width: "64px",
          height: "64px",
        }}
      />
      <div className="textBG">
        <div>{gameState.storyString}</div>
      </div>

      {/* Inventory Bar */}
      <InventoryGame
        playerMoney={gameState.stateMoney}
        stateLivesImg={gameState.stateLivesImg}
        stateHeartClass={gameState.stateHeartClass}
      />

      <div className="guardBtns">
        <Exposition
          handleBtnClick={handleBtnClick}
          hideState={gameState.guardButtons}
        />
      </div>

      <div className="jaceBtns">
        <WizardExposition
          handleBtnClick={handleBtnClick}
          hideState={gameState.jaceButtons}
        />
      </div>

      <div className="thiefBtns">
        <ThiefExposition
          handleBtnClick={handleBtnClick}
          hideState={gameState.thiefButtons}
        />
      </div>

      <div className="thiefBtns2">
        <ThiefExposition2
          handleBtnClick={handleBtnClick}
          hideState={gameState.thiefButtons2}
        />
      </div>

      <div className={gameState.snakeMinigame} id="snake">
        <CanvasSnake handleDoneButtonClick={handleDoneButtonClick} />
      </div>

      <div className={gameState.hangmanMinigame} id="hangman">
        <CanvasHangman handleHangButtonClick={handleHangButtonClick} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.player,
  };
}

export default connect(mapStateToProps)(handleMovement(Player));
