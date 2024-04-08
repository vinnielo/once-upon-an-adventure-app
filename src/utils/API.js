import axios from "axios";
// import Story from "../../../models/storyModel";

export default {
  // Get all users
  getUser: function (id) {
    // return axios.get("https://once-upon-an-adventure-api.onrender.com/api/signup", userData );
    return fetch(`/api/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(userData),
    });
  },

  // Saves a User to the database
  saveUser: function (userData) {
    // return axios.post("https://once-upon-an-adventure-api.onrender.com/api/user", userData);
    return fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  },

  findUser: function (userData) {
    // return axios.post("https://once-upon-an-adventure-api.onrender.com/api/user/login", userData);
    return fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  },

  // findSprite: function(userData) {
  //   return axios.post("/api/sprite", userData);
  // },

  getSprite: function (spriteData) {
    return axios.get(
      "https://once-upon-an-adventure-api.onrender.com/api/sprite",
      spriteData
    );
  },

  getUserSprite: function (id) {
    return axios.get(
      `https://once-upon-an-adventure-api.onrender.com/api/user/avatar/${id}`
    );
  },

  getUserStory: function (id) {
    return axios.get(
      `https://once-upon-an-adventure-api.onrender.com/api/user/avatar/story/${id}`
    );
  },

  getUserInventory: function (id) {
    return axios.get(
      `https://once-upon-an-adventure-api.onrender.com/api/user/inventory/${id}`
    );
  },

  UpdateSpriteLives: function (spriteData, id) {
    return axios.put(
      "https://once-upon-an-adventure-api.onrender.com/api/sprite/lives/" +
        id +
        "/" +
        spriteData
    );
  },

  UpdateSpriteMoney: function (spriteData, id) {
    return axios.put(
      "https://once-upon-an-adventure-api.onrender.com/api/sprite/money/" +
        id +
        "/" +
        spriteData
    );
  },
  UpdateSpriteHomeFirst: function (spriteData, id) {
    return axios.put(
      "https://once-upon-an-adventure-api.onrender.com/api/sprite/homefirst/" +
        id,
      spriteData
    );
  },

  UpdateSpriteFirstGuardTalk: function (spriteData, id) {
    return axios.put(
      "https://once-upon-an-adventure-api.onrender.com/api/sprite/guardTalk/" +
        id,
      spriteData
    );
  },

  UpdateSpriteFirstOrcTalk: function (spriteData, id) {
    return axios.put(
      "https://once-upon-an-adventure-api.onrender.com/api/sprite/orcTalk/" +
        id,
      spriteData
    );
  },

  UpdateSpriteFirstJaceTalk: function (spriteData, id) {
    return axios.put(
      "https://once-upon-an-adventure-api.onrender.com/api/sprite/jaceTalk/" +
        id,
      spriteData
    );
  },

  UpdateSpriteFirstThiefTalk: function (spriteData, id) {
    return axios.put(
      "https://once-upon-an-adventure-api.onrender.com/api/sprite/thiefTalk/" +
        id,
      spriteData
    );
  },

  UpdateSpritePlace: function (spriteData, id) {
    return axios.put(
      "https://once-upon-an-adventure-api.onrender.com/api/sprite/place/" +
        id +
        "/" +
        spriteData
    );
  },

  UpdateSpritePermit: function (spriteData, id) {
    return axios.put(
      "https://once-upon-an-adventure-api.onrender.com/api/sprite/permit/" + id,
      spriteData
    );
  },

  UpdateStory: function (storyData, id) {
    return axios.put(
      "https://once-upon-an-adventure-api.onrender.com/api/story/update/" +
        id +
        "/" +
        storyData
    );
  },

  saveSprite: function (spriteData, id) {
    // return axios.post("/api/sprite/" + id, spriteData);
    return fetch(`/api/sprite/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spriteData),
    });
  },

  createStory: function (storyData, id) {
    return axios.post("/api/story/" + id, storyData);
  },

  getInventory: function (spriteData) {
    return axios.get("/api/inventory", spriteData);
  },
  saveInventory: function (spriteData, id) {
    return axios.post(
      "https://once-upon-an-adventure-api.onrender.com/api/inventory" + id,
      spriteData
    );
  },
};
