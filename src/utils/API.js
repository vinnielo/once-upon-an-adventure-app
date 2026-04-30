import axios from "axios";
// import Story from "../../../models/storyModel";
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://once-upon-an-adventure-api.onrender.com"
    : "";

export default {
  // Get all users
  getUser: function (id) {
    // return axios.get("https://once-upon-an-adventure-api.onrender.com/api/signup", userData );
    return fetch(`${API_BASE_URL}/api/user/${id}`, {
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
    return fetch(`${API_BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  },

  findUser: function (userData) {
    // return axios.post("https://once-upon-an-adventure-api.onrender.com/api/user/login", userData);
    return fetch(`${API_BASE_URL}/api/user/login`, {
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
      `${API_BASE_URL}/api/sprite`,
      spriteData
    );
  },

  getUserSprite: function (id) {
    return axios.get(
      `${API_BASE_URL}/api/user/avatar/${id}`
    );
  },

  getUserStory: function (id) {
    return axios.get(
      `${API_BASE_URL}/api/user/avatar/story/${id}`
    );
  },

  getUserInventory: function (id) {
    return axios.get(
      `${API_BASE_URL}/api/user/inventory/${id}`
    );
  },

  UpdateSpriteLives: function (spriteData, id) {
    return axios.put(
      `${API_BASE_URL}/api/sprite/lives/` +
      id +
      "/" +
      spriteData
    );
  },

  UpdateSpriteMoney: function (spriteData, id) {
    return fetch(`${API_BASE_URL}/api/sprite/money/${id}/${spriteData}`, {
      method: 'PUT',
    })
  },
  UpdateSpriteHomeFirst: function (spriteData, id) {
    return axios.put(
      `${API_BASE_URL}/api/sprite/homefirst/` +
      id,
      spriteData
    );
    // return fetch(`/api/sprite/homefirst/${id}`,{
    //   method: 'PUT',
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(spriteData)
    // })
  },

  UpdateSpriteFirstGuardTalk: function (spriteData, id) {
    return axios.put(
      `${API_BASE_URL}/api/sprite/guardTalk/` +
      id,
      spriteData
    );
  },

  UpdateSpriteFirstOrcTalk: function (spriteData, id) {
    return axios.put(
      `${API_BASE_URL}/api/sprite/orcTalk/` +
      id,
      spriteData
    );
  },

  UpdateSpriteFirstJaceTalk: function (spriteData, id) {
    return axios.put(
      `${API_BASE_URL}/api/sprite/jaceTalk/` +
      id,
      spriteData
    );
  },

  UpdateSpriteFirstThiefTalk: function (spriteData, id) {
    console.log(spriteData);
    return axios.put(
      `${API_BASE_URL}/api/sprite/thiefTalk/` +
      id,
      spriteData
    );
    // return fetch(`/api/sprite/thiefTalk/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(spriteData),
    // })
  },

  UpdateSpritePlace: function (spriteData, id) {
    return axios.put(
      `${API_BASE_URL}/api/sprite/place/` +
      id +
      "/" +
      spriteData
    );
  },

  UpdateSpritePermit: function (spriteData, id) {
    return axios.put(
      `${API_BASE_URL}/api/sprite/permit/` + id,
      spriteData
    );
  },

  UpdateStory: function (storyData, id) {
    return axios.put(
      `${API_BASE_URL}/api/story/update/` +
      id +
      "/" +
      storyData
    );
  },

  saveSprite: function (spriteData, id) {
    // return axios.post("/api/sprite/" + id, spriteData);
    return fetch(`${API_BASE_URL}/api/sprite/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spriteData),
    });
  },

  createStory: function (storyData, id) {
    return axios.post(`${API_BASE_URL}/api/story/` + id, storyData);
  },

  getInventory: function (spriteData) {
    return axios.get(`${API_BASE_URL}/api/inventory`, spriteData);
  },
  saveInventory: function (spriteData, id) {
    return axios.post(
      `${API_BASE_URL}/api/inventory` + id,
      spriteData
    );
  },
};
