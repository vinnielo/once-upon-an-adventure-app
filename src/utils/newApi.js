const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://once-upon-an-adventure-api.onrender.com"
    : "";

export const getUserSprite = (id) => {
  return fetch(`${API_BASE_URL}/api/user/avatar/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

