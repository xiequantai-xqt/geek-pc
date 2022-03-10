const TOKEN = "geek_pc_token";
export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}
export function removeToken() {
  localStorage.removeItem(TOKEN);
}
export function getToken() {
  return localStorage.getItem(TOKEN);
}
