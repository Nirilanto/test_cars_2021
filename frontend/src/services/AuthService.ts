export default {
  clearToken: () => localStorage.clear(),
  isAuthenticated: () => !!localStorage.getItem("access_token"),
  setAccessToken: (token: string) =>
    localStorage.setItem("access_token", token),
  getAccessToken: () => localStorage.getItem("access_token"),
};
