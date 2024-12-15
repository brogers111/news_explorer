export const register = (email, password, username) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        token: "fake-jwt-token",
        user: { email, username },
      });
    }, 1000);
  });
};

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        token: "fake-jwt-token",
        user: { email, username: "John Doe", id: "12345" },
      });
    }, 1000);
  });
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        name: "John Doe",
        email: "john-doe@gmail.com",
        id: "12345",
      },
    });
  });
};
