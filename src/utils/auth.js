export const register = (email, password, username) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: "fake-jwt-token",
        user: { email, username, password, id: "12345" },
      });
    }, 1000);
  });
};

export const login = (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: "fake-jwt-token",
        user: { email, username: "Brian Doe", password, id: "12345" },
      });
    }, 1000);
  });
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    if (token === "fake-jwt-token") {
      resolve({
        data: {
          email: "john-doe@gmail.com",
          username: "John Doe",
          id: "12345",
        },
      });
    } else {
      reject(new Error("Invalid token"));
    }
  });
};
